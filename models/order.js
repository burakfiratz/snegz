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

    getOrders(){
        return new Promise((resolve, reject) => {
            return connection.all('SELECT * FROM orders')
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
            return connection.run('INSERT INTO orders (user_id, amount) VALUES (?,?)', [args.user_id, args.amount])
                .then(async result => {
                    return await connection.get('SELECT * FROM orders WHERE id=?', [result.lastID]).then(result => {
                        resolve(result);
                    })
                }).catch(async err => {
                    reject(err.message);
                });
        });
    }



    getUserOrders(user_id){
        return new Promise((resolve, reject) => {
            return connection.all('SELECT * FROM orders WHERE user_id=?', [user_id])
                .then(async result => {
                    if (typeof result === "undefined") {
                        reject("No records found no:5");
                    }
                    resolve(result);
                }).catch(async err => {
                    reject(err.message);
                });
        });
    }
}

module.exports = OrderModel;