const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLFloat} = require("graphql");

module.exports.ProductTypeDef = new GraphQLObjectType({
    name: 'Product',
    description: 'Product typedef',
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