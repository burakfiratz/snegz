const {GraphQLString} = require("graphql");
const connection = require("./../../db/dao");
const User = require("../../controllers/user");
const UserModel = new (require("../../models/user"));
const userType = require('./typedef');

const userMutations = {
    setUser: {
        type: userType,
        args: {
            username: {type: GraphQLString},
            email: {type: GraphQLString}
        },
        resolve: async (_, args) => {
            return await UserModel.setUser(args)
                .then((res) => {
                    return new User(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
}

module.exports = userMutations;