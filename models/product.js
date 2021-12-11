const connection = require("./../db/dao");


class ProductModel {
    getProductById(id) {
        return new Promise((resolve, reject) => {
            return connection.get('SELECT * FROM products WHERE id=?', [id])
                .then(async result => {
                    if (typeof result === "undefined") {
                        reject("No records found");
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
                [args.user_id, args.name, args.description, args.price, args.stock])
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
}

module.exports = ProductModel;