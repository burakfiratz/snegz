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
            args = JSON.parse(JSON.stringify(args));
            let whereStatements = [],
                whereStatement = ``;
            console.log(args);
            if (args.filter) {
                //AND or OR
                let operator = Object.keys(args.filter)[0];
                if (args.filter[operator]) {
                    console.log("args.filter.AND");
                    console.log(Object.keys(args.filter[operator][0]).length);
                    for (let filterName of Object.keys(args.filter[operator][0])) {
                        console.log(filterName + " -> " + args.filter[operator][0][filterName])
                        console.log(args.filter[operator][0][filterName][0])
                        if (args.filter[operator][0][filterName][0].EQ) {
                            whereStatements.push(` ${filterName} = '${args.filter[operator][0][filterName][0].EQ}' `);
                        }
                        if (args.filter[operator][0][filterName][0].GT) {
                            whereStatements.push(` '${args.filter[operator][0][filterName][0].GT}' >= ${filterName} `);
                        }
                        if (args.filter[operator][0][filterName][0].LT) {
                            whereStatements.push(` ${filterName} <= '${args.filter[operator][0][filterName][0].LT}' `);
                        }
                    }
                    whereStatement = whereStatements.join(` ${operator} `);
                }
            }
            console.log(whereStatement);
            if (whereStatement !== ``)
                whereStatement = ` WHERE ` + whereStatement;
            let [limit, offset, orderByStatement] = new CollateDef().getProperties(args);
            return connection.all(`SELECT *
                                   FROM orders ${whereStatement} ${orderByStatement}
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