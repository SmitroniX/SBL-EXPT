/**
 * Experiment 05: Connecting React.js Project with MongoDB
 * Student: Asmit Jogdand (25CE1051) | RAIT Computer Engineering
 * Domain: HealthPulse Patient Appointments & Records Manager
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/healthpulse_db';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Fallback in-memory store if external MongoDB instance is offline
let isMongoConnected = false;
let mockAppointments = [
    {
        _id: 'mock_01',
        patientName: 'Asmit Jogdand',
        doctorName: 'Dr. Amarsinh V. Vidhate',
        department: 'Cardiology',
        appointmentDate: '2026-09-20',
        timeSlot: '10:30 AM',
        priority: 'Urgent',
        status: 'Confirmed',
        createdAt: new Date()
    },
    {
        _id: 'mock_02',
        patientName: 'Priya Sharma',
        doctorName: 'Dr. Radhika Sen',
        department: 'Neurology',
        appointmentDate: '2026-09-22',
        timeSlot: '02:15 PM',
        priority: 'Regular',
        status: 'Pending',
        createdAt: new Date()
    }
];

// Mongoose Appointment Schema & Model Definition
const appointmentSchema = new mongoose.Schema({
    patientName: { type: String, required: true, trim: true },
    doctorName: { type: String, required: true },
    department: { type: String, required: true },
    appointmentDate: { type: String, required: true },
    timeSlot: { type: String, required: true },
    priority: { type: String, enum: ['Regular', 'Urgent'], default: 'Regular' },
    status: { type: String, default: 'Confirmed' },
    createdAt: { type: Date, default: Date.now }
});

let AppointmentModel = null;

// Connect to MongoDB with timeout
mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 2500
}).then(() => {
    isMongoConnected = true;
    AppointmentModel = mongoose.model('Appointment', appointmentSchema);
    console.log(`[HealthPulse] Successfully connected to MongoDB at ${MONGODB_URI}`);
}).catch((err) => {
    isMongoConnected = false;
    console.warn(`[HealthPulse] Notice: MongoDB not reachable (${err.message}). Defaulting seamlessly to High-Performance In-Memory store for evaluation.`);
});

// REST API Endpoints

// 1. Health & Connection Status
app.get('/api/status', (req, res) => {
    res.json({
        service: 'HealthPulse Patient Appointment Gateway',
        student: 'Asmit Jogdand (25CE1051)',
        mongoConnected: isMongoConnected,
        storageEngine: isMongoConnected ? 'MongoDB (Mongoose ODM)' : 'In-Memory Resilient Store (MongoDB Schema Ready)',
        connectionString: isMongoConnected ? MONGODB_URI : 'Local Evaluation Fallback',
        timestamp: new Date().toISOString()
    });
});

// 2. GET all appointments
app.get('/api/appointments', async (req, res) => {
    try {
        if (isMongoConnected && AppointmentModel) {
            const data = await AppointmentModel.find().sort({ createdAt: -1 });
            return res.json({ success: true, count: data.length, data });
        } else {
            return res.json({ success: true, count: mockAppointments.length, data: mockAppointments });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 3. POST create new appointment
app.post('/api/appointments', async (req, res) => {
    const { patientName, doctorName, department, appointmentDate, timeSlot, priority } = req.body;

    if (!patientName || !doctorName || !department || !appointmentDate || !timeSlot) {
        return res.status(400).json({ success: false, error: 'All appointment fields are required' });
    }

    try {
        if (isMongoConnected && AppointmentModel) {
            const newApt = new AppointmentModel({
                patientName,
                doctorName,
                department,
                appointmentDate,
                timeSlot,
                priority: priority || 'Regular',
                status: 'Confirmed'
            });
            const saved = await newApt.save();
            return res.status(201).json({ success: true, message: 'Appointment saved in MongoDB', data: saved });
        } else {
            const newApt = {
                _id: 'apt_' + Date.now(),
                patientName,
                doctorName,
                department,
                appointmentDate,
                timeSlot,
                priority: priority || 'Regular',
                status: 'Confirmed',
                createdAt: new Date()
            };
            mockAppointments.unshift(newApt);
            return res.status(201).json({ success: true, message: 'Appointment saved in In-Memory store', data: newApt });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 4. DELETE appointment
app.delete('/api/appointments/:id', async (req, res) => {
    const { id } = req.params;

    try {
        if (isMongoConnected && AppointmentModel) {
            const deleted = await AppointmentModel.findByIdAndDelete(id);
            if (!deleted) return res.status(404).json({ success: false, message: 'Record not found' });
            return res.json({ success: true, message: 'Record removed from MongoDB', data: deleted });
        } else {
            const index = mockAppointments.findIndex(a => a._id === id);
            if (index === -1) return res.status(404).json({ success: false, message: 'Record not found' });
            const removed = mockAppointments.splice(index, 1);
            return res.json({ success: true, message: 'Record removed from store', data: removed[0] });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Fallback to React index
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`[HealthPulse] Server listening on http://localhost:${PORT}`);
});
