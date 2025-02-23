declare module 'simple-logmate' {
    interface LoggerConfig {
        level: 'debug' | 'info' | 'warn' | 'error';
        format: string;
        filePath?: string;
        maxFileSize?: number;
        transports: ('console' | 'file')[];
    }

    class Logger {
        constructor(config: LoggerConfig);
        debug(message: string | object, ...args: any[]): void;
        info(message: string | object, ...args: any[]): void;
        warn(message: string | object, ...args: any[]): void;
        error(message: string | object, ...args: any[]): void;
    }

    export default Logger;
}