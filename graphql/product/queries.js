const {GraphQLInt} = require("graphql");
const Product = require("../../controllers/product");
const ProductModel = new (require("../../models/product"));
const {ProductTypeDef} = require('./typedef');

const productQueries = {
    getProduct: {
        description: "Get product entities by product id",
        type: ProductTypeDef,
        args: {
            id: {type: GraphQLInt}
        },
        resolve: async (_, args) => {
            return await ProductModel.getProductById(args.id)
                .then((res) => {
                    return new Product(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    },
}

module.exports = productQueries;