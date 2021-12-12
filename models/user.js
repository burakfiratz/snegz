const connection = require("./../db/dao");

class UserModel {
    getUserById(id) {
        return new Promise((resolve, reject) => {
            return connection.get('SELECT * FROM users WHERE id=?', [id])
                .then(async result => {
                    if (typeof result === "undefined") {
                        reject("No records found");
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