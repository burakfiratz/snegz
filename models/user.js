const connection = require("./../db/dao");
const CollateDef = require("./collatedef");

class UserModel {
    getUserById(id) {
        return new Promise((resolve, reject) => {
            return connection.get('SELECT * FROM users WHERE id=?', [id])
                .then(async result => {
                    if (typeof result === "undefined") {
                        reject("No records found no:3");
                    }
                    resolve(result);
                }).catch(async err => {
                    reject(err.message);
                });
        });
    }

    getUsers(args) {
        let [limit, offset, orderByStatement] = new CollateDef().getProperties(args);
        return new Promise((resolve, reject) => {
            return connection.all(`SELECT *
                                   FROM users ${orderByStatement}
                                   LIMIT ? OFFSET ?`, [limit, offset])
                .then(async result => {
                    if (typeof result === "undefined") {
                        reject("No records found no:7");
                    }
                    resolve(result);
                }).catch(async err => {
                    reject(err.message);
                });
        });
    }

    setUser(args) {
        return new Promise((resolve, reject) => {
            return connection.run('INSERT INTO users (username, email) VALUES (?,?)', [args.username, args.email])
                .then(async result => {
                    return await connection.get('SELECT * FROM users WHERE id=?', [result.lastID]).then(result => {
                        resolve(result);
                    })
                }).catch(async err => {
                    reject(err.message);
                });
        });
    }


}

module.exports = UserModel;