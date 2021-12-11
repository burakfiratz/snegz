const {GraphQLInt, GraphQLString, GraphQLFloat} = require("graphql");
const connection = require("./../../db/dao");
const Product = require("../../controllers/product");
const productType = require("./typedef");

const productMutations = {
    setProduct: {
        type: productType,
        args: {
            user_id: {type: GraphQLInt},
            name: {type: GraphQLString},
            description: {type: GraphQLString},
            price: {type: GraphQLFloat},
            stock: {type: GraphQLInt}
        },
        resolve: async (_, args) => {
            return await connection.run('INSERT INTO products (user_id, name, description, price, stock) VALUES (?,?,?,?,?)',
                [args.user_id, args.name, args.description, args.price, args.stock]).then(async result => {
                console.log(result.lastID);
                return await connection.get('SELECT * FROM products WHERE id=?', [result.lastID]).then(result => {
                    return new Product(result)
                });
            });
        }
    },
}

module.exports = productMutations;