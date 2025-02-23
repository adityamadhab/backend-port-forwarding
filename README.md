# Dynamic Port Forwarding System

A robust and intelligent port forwarding system built with Node.js, Express, and TypeScript. This system automatically manages port allocation, providing seamless port forwarding when the desired port is unavailable.

## 🚀 Features

- **Automatic Port Forwarding**: Intelligently forwards to the next available port if the desired port is in use
- **Port Management**: Efficient tracking and management of active ports
- **Real-time Port Status**: REST API endpoint to check currently active ports
- **Graceful Shutdown**: Proper resource cleanup and port release on application shutdown
- **Comprehensive Logging**: Detailed logging system with file and console output
- **Type Safety**: Built with TypeScript for enhanced reliability and developer experience

## 📋 Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn
- TypeScript

## 🛠 Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd backend-port-forwarding
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MAX_PORT_ATTEMPTS=100
   HOST=localhost
   APP_ENV=development
   ```

## 🚦 Usage

### Development Mode

```bash
# Run in development mode with hot-reload
npm run dev
```

### Production Mode

```bash
# 1. Build the project
npm run build

# 2. Start the production server
npm start
```

The server will automatically:

- Try to start on the configured port (default: 3000)
- If busy, find the next available port
- Log the port forwarding information

### Available Scripts

| Command         | Description                                                     |
| --------------- | --------------------------------------------------------------- |
| `npm run dev`   | Starts the development server with hot-reload using ts-node-dev |
| `npm run build` | Compiles TypeScript code to JavaScript in the `dist` folder     |
| `npm start`     | Runs the compiled JavaScript code from the `dist` folder        |

### Check Active Ports

```bash
GET http://localhost:<port>/ports
```

## 📁 Project Structure

```
src/
├── config/
│   └── ServerConfig.ts     # Server configuration
├── logger/
│   └── log.ts             # Logging configuration
├── services/
│   └── PortManager.ts     # Port management service
├── utils/
│   └── portUtils.ts       # Port utility functions
└── index.ts               # Application entry point
```

## 🔍 API Endpoints

### Get Active Ports

- **URL**: `/ports`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "activePorts": [3000, 3001]
  }
  ```

## 📝 Configuration

The system can be configured through environment variables:

| Variable          | Description                    | Default     |
| ----------------- | ------------------------------ | ----------- |
| PORT              | Default starting port          | 3000        |
| MAX_PORT_ATTEMPTS | Maximum number of ports to try | 100         |
| HOST              | Server host                    | localhost   |
| APP_ENV           | Application environment        | development |

## 🔒 Error Handling

- Automatically detects and avoids occupied ports
- Graceful error handling for port allocation failures
- Comprehensive logging of errors and warnings

## 🛑 Graceful Shutdown

The system handles graceful shutdown on:

- SIGTERM signal
- SIGINT signal (Ctrl+C)

During shutdown:

- Active ports are properly released
- Server connections are closed
- Resources are cleaned up

## 📊 Logging

Logs are written to:

- Console output
- File: `logs/app.log`

Log format: `[timestamp] [level] message`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👥 Authors

- Aditya Madhab - [LinkedIn](https://www.linkedin.com/in/adityamadhab)
