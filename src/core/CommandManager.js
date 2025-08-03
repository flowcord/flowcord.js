const fs = require('fs');
const path = require('path');

class CommandManager {
    constructor(client) {
        this.client = client;
        this.store = new Map();
    }

    register({ name, code, ...options }) {
        this.store.set(name, { code, ...options });
        return this;
    }

    loadFromDirectory(dirPath) {
        const loadFiles = (directory) => {
            const files = fs.readdirSync(directory);
            
            for (const file of files) {
                const fullPath = path.join(directory, file);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory()) {
                    loadFiles(fullPath);
                } else if (file.endsWith('.js')) {
                    const command = require(fullPath);
                    this.register(command);
                }
            }
        };
        
        loadFiles(dirPath);
        return this;
    }
}

module.exports = CommandManager;