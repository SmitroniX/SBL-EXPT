/**
 * Experiment 05: Connecting React.js Project with MongoDB
 * Student: Somnath Jha (25CE1050) | RAIT Computer Engineering
 * Domain: TechVault Hardware Inventory & Orders Manager
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/techvault_db';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-Memory Fallback
let isMongoConnected = false;
let mockOrders = [
    {
        _id: 'tv_ord_01',
        customerName: 'Somnath Jha',
        productTitle: 'Titan-X 49" UltraWide Curved OLED',
        category: 'Displays',
        unitPrice: 115000,
        quantity: 1,
        shippingCity: 'Navi Mumbai',
        dispatchStatus: 'In-Transit',
        createdAt: new Date()
    },
    {
        _id: 'tv_ord_02',
        customerName: 'Aryan Verma',
        productTitle: 'NVIDIA RTX 4090 24GB AI Station',
        category: 'AI Accelerators',
        unitPrice: 172000,
        quantity: 2,
        shippingCity: 'Bangalore',
        dispatchStatus: 'Processing',
        createdAt: new Date()
    }
];

// Mongoose Schema
const orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true, trim: true },
    productTitle: { type: String, required: true },
    category: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
    shippingCity: { type: String, required: true },
    dispatchStatus: { type: String, default: 'Confirmed' },
    createdAt: { type: Date, default: Date.now }
});

let OrderModel = null;

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 2500
}).then(() => {
    isMongoConnected = true;
    OrderModel = mongoose.model('TechOrder', orderSchema);
    console.log(`[TechVault] Successfully connected to MongoDB at ${MONGODB_URI}`);
}).catch((err) => {
    isMongoConnected = false;
    console.warn(`[TechVault] Notice: MongoDB offline (${err.message}). Defaulting smoothly to In-Memory store for evaluation.`);
});

// REST API Endpoints

// 1. Health Status
app.get('/api/status', (req, res) => {
    res.json({
        service: 'TechVault Hardware Orders Database Gateway',
        student: 'Somnath Jha (25CE1050)',
        mongoConnected: isMongoConnected,
        storageEngine: isMongoConnected ? 'MongoDB (Mongoose ODM)' : 'In-Memory Resilient Store (MongoDB Schema Ready)',
        connectionString: isMongoConnected ? MONGODB_URI : 'Local Evaluation Fallback',
        timestamp: new Date().toISOString()
    });
});

// 2. GET all orders
app.get('/api/orders', async (req, res) => {
    try {
        if (isMongoConnected && OrderModel) {
            const data = await OrderModel.find().sort({ createdAt: -1 });
            return res.json({ success: true, count: data.length, data });
        } else {
            return res.json({ success: true, count: mockOrders.length, data: mockOrders });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 3. POST create new order
app.post('/api/orders', async (req, res) => {
    const { customerName, productTitle, category, unitPrice, quantity, shippingCity } = req.body;

    if (!customerName || !productTitle || !category || !unitPrice || !shippingCity) {
        return res.status(400).json({ success: false, error: 'All hardware order fields are required' });
    }

    try {
        if (isMongoConnected && OrderModel) {
            const newOrder = new OrderModel({
                customerName,
                productTitle,
                category,
                unitPrice: Number(unitPrice),
                quantity: Number(quantity) || 1,
                shippingCity,
                dispatchStatus: 'Confirmed'
            });
            const saved = await newOrder.save();
            return res.status(201).json({ success: true, message: 'Hardware Order saved in MongoDB', data: saved });
        } else {
            const newOrder = {
                _id: 'ord_' + Date.now(),
                customerName,
                productTitle,
                category,
                unitPrice: Number(unitPrice),
                quantity: Number(quantity) || 1,
                shippingCity,
                dispatchStatus: 'Confirmed',
                createdAt: new Date()
            };
            mockOrders.unshift(newOrder);
            return res.status(201).json({ success: true, message: 'Hardware Order saved in In-Memory store', data: newOrder });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 4. DELETE order
app.delete('/api/orders/:id', async (req, res) => {
    const { id } = req.params;

    try {
        if (isMongoConnected && OrderModel) {
            const deleted = await OrderModel.findByIdAndDelete(id);
            if (!deleted) return res.status(404).json({ success: false, message: 'Record not found' });
            return res.json({ success: true, message: 'Order removed from MongoDB', data: deleted });
        } else {
            const index = mockOrders.findIndex(o => o._id === id);
            if (index === -1) return res.status(404).json({ success: false, message: 'Record not found' });
            const removed = mockOrders.splice(index, 1);
            return res.json({ success: true, message: 'Order removed from store', data: removed[0] });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`[TechVault] Server running on http://localhost:${PORT}`);
});
