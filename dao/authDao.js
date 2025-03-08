class AuthDao {
    constructor() {
        const sql = require('sqlite3')
        const database = new sql.Database('./data/users.db', (err) => {
            if(err) {
                console.error('An error occurred while connecting to the database', err);
            } else {
                console.log('Successfully connected to the database');
            }
        });

        this.database = database;
        this.init();
    }

    init() {
        this.database.run(
            `CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            )`,
            (err) => {
                if (err) {
                    console.error('Error creating users table:', err.message);
                }
            }
        );
    }

    async createUser(username, password) {
        return new Promise((resolve, reject) => {
            const query = this.database.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
            query.run(username, password, (err) => {
                if(err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    async getUser(username) {
        return new Promise((resolve, reject) => {
            const query = this.database.prepare('SELECT * FROM users WHERE username = ?');
            query.get(username, (err, row) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

}

module.exports = AuthDao;