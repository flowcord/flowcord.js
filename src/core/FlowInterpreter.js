class FlowInterpreter{
    constructor(client) {
        this.client = client;
        this.functions = new Map();
    }

    async execute(code, context) {
        if (!code || typeof code !== 'string') return;

        const lines = code.split('\n').filter(line => line.trim());
        
        for (const line of lines) {
            await this._parseLine(line, context);
        }
    }

    async _parseLine(line, context) {
        if (!line.startsWith('$')) return;

        const [funcName, ...args] = line.slice(1).split(/[\[\];]/).filter(Boolean);
        
        const func = this.client.functions.get(funcName);
        if (!func) {
            console.warn(`⚠ Função "$${funcName}" não encontrada!`);
            return;
        }

        try {
            await func.execute(context, ...args);
        } catch (error) {
            console.error(`❌ Erro ao executar "$${funcName}":`, error);
        }
    }

    registerFunction(name, executor) {
        this.functions.set(name, { execute: executor });
    }
}

module.exports = FlowInterpreter;