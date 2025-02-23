import Logger from 'simple-logmate';

const loggerConfig = {
    level: 'debug' as const,
    format: '[{timestamp}] [{level}] {message}',
    filePath: 'logs/app.log',
    maxFileSize: 1024 * 1024,
    transports: ['console', 'file'] as ('console' | 'file')[],
    httpRequest: true
};

const logger = new Logger(loggerConfig);

export default logger;