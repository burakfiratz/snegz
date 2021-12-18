const {GraphQLEnumType, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull} = require("graphql");
const {directionEnumType, paginationInputType} = require('./common');
const orderSortFieldEnum = new GraphQLEnumType({
    name: "OrderSortFieldEnum",
    values: {
        AMOUNT: {value: 'amount'},
        CREATED_AT: {value: 'created_at'},
    }
});

/*
let orderPaginationInputType = new GraphQLInputObjectType({
    name: "OrderPagination",
    fields: () => ({
        limit: {
            type: GraphQLInt,
            defaultValue: 10
        },
        offset: {
            type: GraphQLInt,
            defaultValue: 0
        }
    })
});
*/

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
    paginationInputType,
    orderSortInputType
};