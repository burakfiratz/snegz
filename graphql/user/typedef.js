const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList} = require("graphql");
const ProductModel = new (require("../../models/product"));
const {ProductTypeDef} = require('./../product/typedef')

const UserTypeDef = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLInt},
        username: {type: GraphQLString},
        email: {type: GraphQLString},
        products: {
            type: new GraphQLList(ProductTypeDef),
            resolve: async (parent) => {
                return ProductModel.getUserProducts(parent.id);
            }
        },
    })
});

module.exports = UserTypeDef;