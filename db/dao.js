const connection = require('./sqlite');

class Database {
    constructor(connection) {
        this.connection = connection;
    }

    run(sql, args) {
        //THIS FUNCTION FOR INSERT, UPDATE, DELETE
        //lastID for successful insert process
        //changes for successful update, delete processes
        return new Promise((resolve, reject) => {
            let statement = this.connection.prepare(sql, args).run((err) => {
                if (err) return reject(err);
                resolve({"changes": statement.changes, "lastID": statement.lastID});
            });
        });
    }

    get(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.get(sql, args, (err, row) => {
                //If the result set is empty, the second parameter is undefined
                if (err) {
                    //SQL-like errors
                    return reject(new Error("Unexpected error triggered : Development"));
                }
                resolve(row);
            })
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