const {GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLFloat} = require("graphql");

const connection = require('./db/dao');

const User = require("./entity/user");
const Product = require("./entity/product");

let userType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLInt},
        username: {type: GraphQLString},
        email: {type: GraphQLString}
    })
});

let productType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: {type: GraphQLInt},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        price: {type: GraphQLFloat},
        stock: {type: GraphQLInt},
        created_at: {type: GraphQLString},
        modified_at: {type: GraphQLString},
        deleted_at: {type: GraphQLString},
    })
});


var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        hello: {
            type: GraphQLString,
            resolve: () => {
                return "Hello World!";
            }
        },
        getUser: {
            type: userType,
            args: {
                id: {type: GraphQLInt}
            },
            resolve: async (_, args) => {
                return await connection.get('SELECT * FROM users WHERE id=?', [args.id]).then(async result => {
                    return new User(result);
                });
            }
        },
        getProduct: {
            type: productType,
            args: {
                id: {type: GraphQLInt}
            },
            resolve: async (_, args) => {
                return await connection.get('SELECT * FROM products WHERE id=?', [args.id]).then(async result => {
                    return new Product(result)
                });
            }
        }
    }
});

var mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        setUser: {
            type: userType,
            args: {
                username: {type: GraphQLString},
                email: {type: GraphQLString}
            },
            resolve: async (_, args) => {
                return await connection.run('INSERT INTO users (username, email) VALUES (?,?)', [args.username, args.email]).then(async result => {
                    console.log(result.lastID);
                    return await connection.get('SELECT * FROM users WHERE id=?', [result.lastID]).then(result => {
                        console.log(result);
                        console.log(new User(result));
                        return new User(result);
                    });
                });
            }
        },
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
        }
    })
})


module.exports = new GraphQLSchema({query: queryType, mutation: mutationType});