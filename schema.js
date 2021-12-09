const {GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLFloat} = require("graphql");

const connection = require('./db/dao');

const Product = require("./entity/product");

const {userQueries, userMutations} = require('./graphql/user');

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
        },
        ...userQueries
    }
});

var mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
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
        ...userMutations
    })
})


module.exports = new GraphQLSchema({query: queryType, mutation: mutationType});