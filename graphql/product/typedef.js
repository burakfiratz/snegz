const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLFloat} = require("graphql");

module.exports = new GraphQLObjectType({
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