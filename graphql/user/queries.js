const {GraphQLInt} = require("graphql");
const connection = require("./../../db/dao");
const User = require("./../../entity/user");
const userType = require('./typedef');

const userQueries = {
    getUser: {
        type: userType,
        args: {
            id: {type: GraphQLInt}
        },
        resolve: async (_, args) => {
            return await connection.get('SELECT * FROM users WHERE id=?', [args.id]).then(async result => {
                return new User(result);
            });
        }
    },
};

module.exports = userQueries;