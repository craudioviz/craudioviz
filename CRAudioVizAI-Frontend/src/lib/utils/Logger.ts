type LogLevel = "info" | "warn" | "error" | "debug";

interface LogEntry {
    level: LogLevel;
    message: string;
    timestamp: string;
}

const logStore: LogEntry[] = [];

export function logMessage(level: LogLevel, message: string) {
    const timestamp = new Date().toISOString();
    const entry: LogEntry = { level, message, timestamp };
    logStore.push(entry);

    const prefix = {
        info: "ℹ️",
        warn: "⚠️",
        error: "❌",
        debug: "🐞",
    }[level];

    console.log(`${prefix} [${timestamp}] ${message}`);
}

export function getLogs(): LogEntry[] {
    return [...logStore];
}

export function clearLogs() {
    logStore.length = 0;
}