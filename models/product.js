const connection = require("./../db/dao");


class ProductModel {
    getProductById(id) {
        return new Promise((resolve, reject) => {
            return connection.get('SELECT * FROM products WHERE id=?', [id])
                .then(async result => {
                    if (typeof result === "undefined") {
                        reject("No records found no: 1");
                    }
                    resolve(result);
                })
                .catch(async err => {
                    reject(err.message);
                });
        });
    }

    getProducts(args) {
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

        return new Promise((resolve, reject) => {
            return connection.all(`SELECT *
                                   FROM products ${orderByStatement}
                                   LIMIT ? OFFSET ?`, [limit, offset])
                .then(async result => {
                    if (typeof result === "undefined") {
                        reject("No records found no: 6");
                    }
                    resolve(result);
                })
                .catch(async err => {
                    reject(err.message);
                });
        });
    }

    setProduct(args) {
        return new Promise((resolve, reject) => {
            return connection.run('INSERT INTO products (user_id, name, description, price, stock) VALUES (?,?,?,?,?)',
                [args.userId, args.name, args.description, args.price, args.stock])
                .then(async result => {
                    return await connection.get('SELECT * FROM products WHERE id=?', [result.lastID]).then(async result => {
                        resolve(result);
                    });
                })
                .catch(async err => {
                    reject(err.message);
                });
        });
    }

    getUserProducts(userId) {
        return new Promise((resolve, reject) => {
            return connection.all('SELECT * FROM products WHERE user_id=?', [userId])
                .then(async result => {
                    if (typeof result === "undefined") {
                        reject("No records found no: 2");
                    }
                    resolve(result);
                })
                .catch(async err => {
                    reject(err.message);
                });
        });
    }
}

module.exports = ProductModel;