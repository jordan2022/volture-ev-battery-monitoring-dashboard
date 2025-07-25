# 🚗 Volture EV Battery Health Monitoring Dashboard

A comprehensive, real-time web application for monitoring electric vehicle battery health via Raspberry Pi integration.

## 🎯 Features

### **Real-time Monitoring**
- **Live Battery Data**: Voltage, Current, Temperature, SOC, SOH, Fault Flags
- **WebSocket Integration**: Real-time updates every 2 seconds
- **HTTP Polling Fallback**: Reliable data fetching
- **Raspberry Pi Connectivity**: Direct integration with Pi hardware

### **Dashboard Pages**
1. **Overview** - Quick battery health summary
2. **Raspberry Pi** - Real-time Pi data monitoring
3. **Real-time** - Live charts and data streams
4. **History** - Charge/discharge cycle analysis
5. **Health Report** - Monthly battery performance
6. **Alerts** - Fault detection and notifications
7. **GPS Tracking** - Vehicle location and routes
8. **Charging** - Station locator with availability
9. **Bluetooth** - Device connectivity management
10. **Settings** - User preferences and configuration

### **Technical Features**
- **WebSocket Support**: Real-time data streaming
- **HTTP API**: RESTful endpoints for data access
- **Alert System**: Threshold-based notifications
- **Dark/Light Mode**: Seamless theme switching
- **Responsive Design**: Mobile-first approach
- **Chart Visualization**: Interactive Recharts integration

## 🚀 Quick Start

### **1. Start the Raspberry Pi Server**

#### **Option A: Python Server (Recommended)**
```bash
# Install Python dependencies
pip install -r requirements.txt

# Start the server
python server.py
```

#### **Option B: Node.js Server**
```bash
# Install Node.js dependencies
npm install

# Start the development server
npm run dev
```

### **2. Access the Dashboard**
- **Web App**: http://localhost:8000
- **API**: http://localhost:5000/api/battery
- **WebSocket**: ws://localhost:5000

## 📊 API Endpoints

### **HTTP API**
- `GET /api/battery` - Current battery data
- `GET /api/battery/history?hours=1` - Historical data
- `GET /api/health` - Server health check

### **WebSocket Events**
- `battery_update` - Real-time battery data
- `status` - Connection status updates

## 🔧 Raspberry Pi Setup

### **Hardware Requirements**
- Raspberry Pi 4 (recommended) or Pi 3
- Bluetooth module (built-in or USB)
- Wi-Fi connection
- Battery monitoring sensors (optional)

### **Software Setup**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Python and pip
sudo apt install python3 python3-pip -y

# Install dependencies
pip3 install -r requirements.txt

# Run server
python3 server.py
```

### **Network Configuration**
```bash
# Find Raspberry Pi IP
hostname -I

# Allow port 5000 through firewall
sudo ufw allow 5000
```

## 📱 Usage Guide

### **Connecting to Raspberry Pi**
1. Ensure your Raspberry Pi is on the same network
2. Start the server.py on your Pi
3. Open the dashboard at http://localhost:8000
4. Navigate to "Raspberry Pi" page for real-time monitoring

### **Data Sources**
- **Mock Data**: For testing without hardware
- **Raspberry Pi**: Real hardware integration
- **WebSocket**: Live data streaming
- **HTTP Polling**: Fallback method

### **Alert Configuration**
- Voltage: 42V - 54V
- Current: -20A - 20A
- Temperature: 0°C - 45°C
- SOC: 20% - 100%
- SOH: 80% - 100%

## 🛠️ Development

### **Project Structure**
```
volture-dashboard/
├── components/          # React components
├── pages/              # Next.js pages
├── services/           # API services
├── styles/             # CSS styles
├── server.py           # Raspberry Pi server
├── requirements.txt    # Python dependencies
└── README.md          # This file
```

### **Environment Variables**
```bash
# Optional configuration
export RASPBERRY_PI_IP=192.168.1.100
export WEBSOCKET_PORT=5000
export POLLING_INTERVAL=2000
```

## 🔌 Hardware Integration

### **Raspberry Pi GPIO Setup**
```python
# Example sensor connections
# Voltage sensor: GPIO 4
# Current sensor: GPIO 17
# Temperature sensor: GPIO 27
# Communication: UART/Bluetooth
```

### **Sensor Libraries**
```python
# For actual hardware integration
import RPi.GPIO as GPIO
import smbus  # I2C
import serial  # UART
```

## 📈 Performance

- **WebSocket**: ~2 second updates
- **HTTP Polling**: ~2 second updates
- **Memory Usage**: <50MB on Raspberry Pi
- **CPU Usage**: <5% on Raspberry Pi 4

## 🐛 Troubleshooting

### **Connection Issues**
1. Check if server.py is running
2. Verify network connectivity
3. Check firewall settings
4. Ensure ports are open

### **Data Not Updating**
1. Refresh the dashboard
2. Check WebSocket connection
3. Verify Raspberry Pi status
4. Check browser console for errors

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Verify Raspberry Pi setup
3. Check browser developer tools
4. Ensure all dependencies are installed

## 📝 License

This project is open source and available under the MIT License.
