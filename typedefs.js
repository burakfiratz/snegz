const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLFloat, GraphQLList} = require("graphql");
const ProductModel = new (require("./models/product"));
const UserModel = new (require("./models/user"));
const OrderModel = new (require("./models/order"));

const ProductTypeDef = new GraphQLObjectType({
    name: 'Product',
    description: 'Product typedef',
    fields: () => ({
        id: {type: GraphQLInt},
        user_id: {type: GraphQLString},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        price: {type: GraphQLFloat},
        stock: {type: GraphQLInt},
        created_at: {type: GraphQLString},
        modified_at: {type: GraphQLString},
        deleted_at: {type: GraphQLString},
        user: {
            type: UserTypeDef,
            resolve: async (parent) => {
                return await UserModel.getUserById(parent.user_id)
            }
        }
    })
});


const UserTypeDef = new GraphQLObjectType({
    name: 'User',
    description: 'User typedef',
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
        orders: {
            type: new GraphQLList(OrderTypeDef),
            resolve: async (parent) => {
                return await OrderModel.getUserOrders(parent.id)
                    .then(res => {
                        return res;
                    }).catch((err) => {
                        console.log(err);
                    });
            }
        }
    })
});

const OrderTypeDef = new GraphQLObjectType({
    name: 'Order',
    description: 'Order typedef',
    fields: () => ({
        id: {type: GraphQLInt},
        user_id: {type: GraphQLInt},
        amount: {type: GraphQLFloat},
        created_at: {type: GraphQLString},
        tracking_number: {type: GraphQLInt},
    })
});

module.exports = {
    ProductTypeDef,
    UserTypeDef,
    OrderTypeDef
};
