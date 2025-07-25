#!/usr/bin/env python3
"""
Raspberry Pi Battery Monitor Server
Provides real-time EV battery data via WebSocket and HTTP API
"""

import asyncio
import json
import random
import time
from datetime import datetime
from flask import Flask, jsonify, request
from flask_socketio import SocketIO, emit
import threading

app = Flask(__name__)
app.config['SECRET_KEY'] = 'volture-secret-key'
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='threading')

# Global battery data storage
battery_data = {
    'voltage': 48.5,
    'current': 0.0,
    'temperature': 25.0,
    'soc': 75.0,
    'soh': 95.0,
    'fault_flags': [],
    'timestamp': datetime.now().isoformat()
}

# Thresholds for alerts
THRESHOLDS = {
    'voltage': {'min': 42.0, 'max': 54.0},
    'current': {'min': -20.0, 'max': 20.0},
    'temperature': {'min': 0.0, 'max': 45.0},
    'soc': {'min': 20.0, 'max': 100.0},
    'soh': {'min': 80.0, 'max': 100.0}
}

# Fault flag definitions
FAULT_FLAGS = {
    0x01: "Overvoltage",
    0x02: "Undervoltage",
    0x04: "Overcurrent",
    0x08: "Overtemperature",
    0x10: "Undertemperature",
    0x20: "SOC Low",
    0x40: "SOH Low",
    0x80: "Communication Error"
}

def generate_realistic_data():
    """Generate realistic battery data with some variation"""
    global battery_data
    
    # Simulate gradual changes
    battery_data['voltage'] = max(42.0, min(54.0, battery_data['voltage'] + random.uniform(-0.2, 0.2)))
    battery_data['current'] = max(-20.0, min(20.0, battery_data['current'] + random.uniform(-1.0, 1.0)))
    battery_data['temperature'] = max(15.0, min(45.0, battery_data['temperature'] + random.uniform(-0.5, 0.5)))
    battery_data['soc'] = max(0.0, min(100.0, battery_data['soc'] + random.uniform(-0.5, 0.5)))
    battery_data['soh'] = max(70.0, min(100.0, battery_data['soh'] + random.uniform(-0.1, 0.1)))
    
    # Generate random fault flags
    battery_data['fault_flags'] = []
    if random.random() < 0.05:  # 5% chance of fault
        fault_code = random.choice(list(FAULT_FLAGS.keys()))
        battery_data['fault_flags'].append({
            'code': fault_code,
            'description': FAULT_FLAGS[fault_code],
            'timestamp': datetime.now().isoformat()
        })
    
    battery_data['timestamp'] = datetime.now().isoformat()
    return battery_data

def check_alerts(data):
    """Check if any thresholds are breached and return alerts"""
    alerts = []
    
    for param, thresholds in THRESHOLDS.items():
        value = data[param]
        if value < thresholds['min']:
            alerts.append({
                'type': 'warning',
                'parameter': param,
                'value': value,
                'threshold': thresholds['min'],
                'message': f"{param.upper()} below minimum threshold",
                'timestamp': datetime.now().isoformat()
            })
        elif value > thresholds['max']:
            alerts.append({
                'type': 'warning',
                'parameter': param,
                'value': value,
                'threshold': thresholds['max'],
                'message': f"{param.upper()} above maximum threshold",
                'timestamp': datetime.now().isoformat()
            })
    
    return alerts

@app.route('/api/battery', methods=['GET'])
def get_battery_data():
    """HTTP endpoint to get current battery data"""
    data = generate_realistic_data()
    alerts = check_alerts(data)
    
    return jsonify({
        'data': data,
        'alerts': alerts,
        'thresholds': THRESHOLDS,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/battery/history', methods=['GET'])
def get_battery_history():
    """Get historical battery data"""
    hours = int(request.args.get('hours', 1))
    data_points = []
    
    for i in range(hours * 60):  # One data point per minute
        timestamp = datetime.now().timestamp() - (i * 60)
        data_points.append({
            'time': datetime.fromtimestamp(timestamp).isoformat(),
            'voltage': 48.5 + random.uniform(-2, 2),
            'current': random.uniform(-10, 10),
            'temperature': 25 + random.uniform(-5, 5),
            'soc': 75 + random.uniform(-10, 10),
            'soh': 95 + random.uniform(-2, 2)
        })
    
    return jsonify({'data': data_points})

@socketio.on('connect')
def handle_connect():
    """Handle WebSocket connection"""
    print('Client connected')
    emit('status', {'message': 'Connected to Raspberry Pi Battery Monitor'})

@socketio.on('disconnect')
def handle_disconnect():
    """Handle WebSocket disconnection"""
    print('Client disconnected')

@socketio.on('subscribe_battery')
def handle_subscribe_battery():
    """Subscribe to battery data updates"""
    def send_updates():
        while True:
            data = generate_realistic_data()
            alerts = check_alerts(data)
            socketio.emit('battery_update', {
                'data': data,
                'alerts': alerts
            })
            time.sleep(2)  # Send updates every 2 seconds
    
    # Start background thread for updates
    thread = threading.Thread(target=send_updates)
    thread.daemon = True
    thread.start()

@app.route('/api/health')
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'version': '1.0.0'
    })

if __name__ == '__main__':
    print("Starting Raspberry Pi Battery Monitor Server...")
    print("HTTP API available at: http://localhost:5000/api/battery")
    print("WebSocket available at: ws://localhost:5000")
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
