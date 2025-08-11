import fs from 'fs';
import path from 'path';

const ENV_FILENAME = '.env';
const ENV_PATH = path.resolve(process.cwd(), ENV_FILENAME);
const TARGET_KEY = 'DATABASE_URL';
const TARGET_VALUE = 'postgresql://CRAudioVizAIAIAIai:oce%40N2518@localhost:5432/CRAudioVizAIAIAI';

function readEnvFile(filePath: string): string[] {
    if (!fs.existsSync(filePath)) {
        console.warn(`ÃƒÂ¢Ã…Â¡Ã‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â ${ENV_FILENAME} not found. Creating a new one.`);
        return [];
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return content.split(/\r?\n/);
}

function updateEnvLines(lines: string[], key: string, value: string): string[] {
    let found = false;
    const updated = lines.map(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith(`${key}=`)) {
            found = true;
            return `${key}=${value}`;
        }
        return line;
    });
    if (!found) {
        updated.push(`${key}=${value}`);
    }
    return updated;
}

function writeEnvFile(filePath: string, lines: string[]) {
    fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
    console.log(`ÃƒÂ¢Ã…â€œÃ¢â‚¬Â¦ ${TARGET_KEY} updated in ${ENV_FILENAME}`);
}

function updateEnvVariable() {
    const lines = readEnvFile(ENV_PATH);
    const updatedLines = updateEnvLines(lines, TARGET_KEY, TARGET_VALUE);
    writeEnvFile(ENV_PATH, updatedLines);
}

updateEnvVariable();