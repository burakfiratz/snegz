const connection = require('./sqlite');

class Database {
    constructor(connection) {
        this.connection = connection;
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.run(sql, args, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    connectionClose() {
        return new Promise((resolve, reject) => {
            this.connection.close(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }
}

module.exports = new Database(connection);