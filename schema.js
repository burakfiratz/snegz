const {GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLFloat} = require("graphql");

const connection = require('./db/dao');

let userType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: {type: GraphQLInt},
        username: {type: GraphQLString},
        email: {type: GraphQLString}
    }
});

let productType = new GraphQLObjectType({
    name: 'Product',
    fields: {
        id: {type: GraphQLInt},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        price: {type: GraphQLFloat},
        stock: {type: GraphQLInt},
        created_at: {type: GraphQLString},
        modified_at: {type: GraphQLString},
        deleted_at: {type: GraphQLString},
    }
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
            resolve: async (_) => {
                //TODO: sqlite db query
            }
        },
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
                await connection.query('INSERT INTO users (username, email) VALUES (?,?)', [args.username, args.email]);
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
                await connection.query('INSERT INTO products (user_id, name, description, price, stock) VALUES (?,?,?,?,?)',
                    [args.user_id, args.name, args.description, args.price, args.stock]);
            }
        }
    })
})


module.exports = new GraphQLSchema({query: queryType, mutation: mutationType});