class DatabaseManager {
    constructor(client, options) {
        this.client = client;
        this.type = options.type || 'flowcord.db';
        this.db = options.db || null;
        this.tables = options.tables || ['main'];
        this.securityKey = options.securityKey || '';
        
        this._initializeDatabase();
    }

    _initializeDatabase() {
        if (this.type === 'flowcord.db') {
            this.connection = new this.db({
                tables: this.tables,
                securityKey: this.securityKey
            });
        }
    }

    set(key, value) {
        return this.connection.set('main', key, value);
    }

    get(key) {
        return this.connection.get('main', key);
    }
}

module.exports = DatabaseManager;