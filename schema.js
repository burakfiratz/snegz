const {GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString} = require("graphql");

const connection = require('./db/dao');

let userType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: {type: GraphQLInt},
        username: {type: GraphQLString},
        email: {type: GraphQLString}
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
    fields: {

        setUser: {
            type: userType,
            args: {
                username: {type: GraphQLString},
                email: {type: GraphQLString}
            },
            resolve: async (_, args) => {
                await connection.query('INSERT INTO users (username, email) VALUES (?,?);', [args.username, args.email]);

            }
        },
    }
})


module.exports = new GraphQLSchema({query: queryType, mutation: mutationType});