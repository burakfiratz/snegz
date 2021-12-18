const {GraphQLEnumType, GraphQLInputObjectType, GraphQLNonNull} = require("graphql");
const {directionEnumType} = require('./common');
const orderSortFieldEnum = new GraphQLEnumType({
    name: "OrderSortFieldEnum",
    values: {
        AMOUNT: {value: 'amount'},
        CREATED_AT: {value: 'created_at'},
    }
});

let orderSortInputType = new GraphQLInputObjectType({
    name: "OrderSort",
    fields: () => ({
        field: {
            type: new GraphQLNonNull(orderSortFieldEnum),
        },
        direction: {
            type: new GraphQLNonNull(directionEnumType)
        }
    })
});

module.exports = {
    orderSortInputType
};