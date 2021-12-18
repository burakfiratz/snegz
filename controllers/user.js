class User {
    constructor(user) {
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.createdAt = user.created_at;
    }
}

module.exports = User;