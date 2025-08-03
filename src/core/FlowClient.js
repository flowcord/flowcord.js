const { Client } = require('discord.js');
const CommandManager = require('./CommandManager');
const EventManager = require('./EventManager');
const DatabaseManager = require('./DatabaseManager');
const FlowInterpreter = require('./FlowInterpreter');

class FlowClient {
    constructor(options = {}) {
        this.token = options.token;
        this.prefix = options.prefix || '!';
        
        this.commands = new CommandManager(this);
        this.events = new EventManager(this);
        this.database = new DatabaseManager(this, options.database || {});
        this.interpreter = new FlowInterpreter(this);
        
        this.client = new Client({
            intents: options.intents || ['Guilds', 'GuildMessages', 'MessageContent']
        });
        
        this._setupClientEvents();
    }

    _setupClientEvents() {
        this.client.on('ready', () => {
            console.log(`✅ ${this.client.user.tag} still on-line!`);
        });

        this.events.registerDefaultEvents();
    }

    command(options) {
        return this.commands.register(options);
    }

    loadCommands(path) {
        return this.commands.loadFromDirectory(path);
    }

    login(token = this.token) {
        return this.client.login(token);
    }
}

module.exports = FlowClient;