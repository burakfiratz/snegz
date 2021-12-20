const connection = require("./../db/dao");
const CollateDef = require("./collatedef");

class OrderModel {
    getOrderById(id) {
        return new Promise((resolve, reject) => {
            return connection.get('SELECT * FROM orders WHERE id=?', [id])
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

    getOrders(args) {
        return new Promise((resolve, reject) => {
            console.log(args);
            console.log(args.filter.amount);
            console.log(args.filter.created_at);
            let [limit, offset, orderByStatement] = new CollateDef().getProperties(args);
            return connection.all(`SELECT *
                                   FROM orders ${orderByStatement}
                                   LIMIT ? OFFSET ?`, [limit, offset])
                .then(async result => {
                    if (typeof result === "undefined") {
                        reject("No records found no:4");
                    }
                    resolve(result);
                }).catch(async err => {
                    reject(err.message);
                });
        });
    }

    setOrder(args) {
        return new Promise((resolve, reject) => {
            return connection.run('INSERT INTO orders (user_id, amount) VALUES (?,?)', [args.userId, args.amount])
                .then(async result => {
                    return await connection.get('SELECT * FROM orders WHERE id=?', [result.lastID]).then(result => {
                        resolve(result);
                    })
                }).catch(async err => {
                    reject(err.message);
                });
        });
    }


    getUserOrders(userId) {
        return new Promise((resolve, reject) => {
            return connection.all('SELECT * FROM orders WHERE user_id=?', [userId])
                .then(async rows => {
                    if (typeof rows === "undefined") {
                        reject("No records found no:5");
                    }
                    resolve(rows);
                }).catch(async err => {
                    reject(err.message);
                });
        });
    }
}

module.exports = OrderModel;