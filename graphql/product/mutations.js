const {GraphQLInt, GraphQLString, GraphQLFloat} = require("graphql");
const Product = require("../../controllers/product");
const ProductModel = new (require("../../models/product"));
const productType = require("./typedef");

const productMutations = {
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
            return await ProductModel.setProduct(args)
                .then((res) => {
                    return new Product(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    },
}

module.exports = productMutations;