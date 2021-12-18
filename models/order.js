const connection = require("./../db/dao");

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
            let limit = 10, offset = 0;
            if (args.page) {
                limit = (args.page.limit > 10) ? 10 : ((args.page.limit < 0) ? 1 : args.page.limit || 10);
                offset = (args.page.offset > 10) ? 10 : ((args.page.offset < 0) ? 0 : args.page.offset || 0);
            }
            let field = 'created_at', direction = 'DESC';
            if (args.sort) {
                field = args.sort.field;
                direction = args.sort.direction;
            }
            let orderByStatement = ` ORDER BY ${field} ${direction} `;

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