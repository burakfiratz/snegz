const {GraphQLEnumType, GraphQLInputObjectType, GraphQLNonNull} = require("graphql");
const {directionEnumType} = require('./common');
const productSortFieldEnum = new GraphQLEnumType({
    name: "ProductSortFieldEnum",
    values: {
        PRICE: {value: 'price'},
        CREATED_AT: {value: 'created_at'},
        STOCK: {value: 'stock'},
    }
});

let productSortInputType = new GraphQLInputObjectType({
    name: "ProductSort",
    fields: () => ({
        field: {
            type: new GraphQLNonNull(productSortFieldEnum),
        },
        direction: {
            type: new GraphQLNonNull(directionEnumType)
        }
    })
});

module.exports = {
    productSortInputType
};