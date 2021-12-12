const {GraphQLInt} = require("graphql");
const User = require("../../controllers/user");
const UserModel = new (require("../../models/user"));
const userType = require('./typedef');

const userQueries = {
    getUser: {
        type: userType,
        args: {
            id: {type: GraphQLInt}
        },
        resolve: async (_, args) => {
            return await UserModel.getUserById(args.id)
                .then((res) => {
                    return new User(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    },
};

module.exports = userQueries;