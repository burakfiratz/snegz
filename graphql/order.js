const {GraphQLInt, GraphQLFloat, GraphQLList, GraphQLNonNull} = require("graphql");
const {OrderTypeDef} = require('../typedefs');
const OrderModel = new (require('../models/order'));
const Order = require('../controllers/order');

const orderQueries = {
    order: {
        description: "Get order entities by order id",
        type: OrderTypeDef,
        args: {
            orderId: {type: new GraphQLNonNull(GraphQLInt)}
        },
        resolve: async (_, args) => {
            return await OrderModel.getOrderById(args.orderId)
                .then((res) => {
                    return new Order(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    },
    orders: {
        description: "Get all orders entities",
        type: new GraphQLList(OrderTypeDef),
        //TODO: add sorting, filtering, paging

        /*        args: {
                    id: {type: GraphQLInt}
                },*/
        resolve: async (_) => {
            return await OrderModel.getOrders()
                .then((res) => {
                    return res;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
};


const orderMutations = {
    setOrder: {
        description: "Create a new order to user",
        type: OrderTypeDef,
        args: {
            userId: {type: new GraphQLNonNull(GraphQLInt)},
            amount: {type: new GraphQLNonNull(GraphQLFloat)}
        },
        resolve: async (_, args) => {
            return await OrderModel.setOrder(args)
                .then((res) => {
                    return new Order(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
}

module.exports = {
    orderQueries,
    orderMutations
};