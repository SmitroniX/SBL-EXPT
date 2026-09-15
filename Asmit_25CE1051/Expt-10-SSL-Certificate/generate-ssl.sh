#!/usr/bin/env bash
# Script to generate a 2048-bit RSA Self-Signed SSL/TLS Certificate with SAN extensions
# Student: Asmit Jogdand (25CE1051) | RAIT Computer Engineering

set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
cd "$DIR"

echo "=== Generating HealthPulse SSL/TLS Certificates via OpenSSL ==="

# Create OpenSSL SAN configuration file
cat > san.cnf <<EOF
[req]
default_bits = 2048
prompt = no
default_md = sha256
distinguished_name = dn
x509_extensions = v3_req

[dn]
C = IN
ST = Maharashtra
L = Navi Mumbai
O = HealthPulse Super-Specialty Clinic
OU = Computer Engineering Dept, RAIT
CN = localhost

[v3_req]
subjectAltName = @alt_names
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment

[alt_names]
DNS.1 = localhost
DNS.2 = healthpulse-care.local
IP.1 = 127.0.0.1
EOF

# Generate Private Key and Self-Signed Certificate valid for 365 days
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout server-key.pem \
  -out server-cert.pem \
  -config san.cnf

echo "[SUCCESS] Generated SSL Private Key: server-key.pem"
echo "[SUCCESS] Generated SSL Certificate: server-cert.pem"

# Output Certificate Details for Verification
echo "--- Certificate Fingerprint & Details ---"
openssl x509 -in server-cert.pem -noout -subject -issuer -dates -fingerprint
