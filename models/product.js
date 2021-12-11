const connection = require("./../db/dao");


class ProductModel {
    getProductById(id) {
        return new Promise((resolve, reject) => {
            return connection.get('SELECT * FROM products WHERE id=?', [id]).then(async result => {
                if (typeof result === "undefined") {
                    reject("No records found");
                }
                resolve(result);
            }).catch(async err => {
                reject(err.message);
            });
        });

    }
}

module.exports = ProductModel;