class Product {
    constructor(product) {
        this.id = product.id;
        this.userId = product.user_id;
        this.name = product.name;
        this.description = product.description;
        this.price = product.price;
        this.stock = product.stock;
        this.createdAt = product.created_at;
        this.modifiedAt = product.modified_at;
        this.deletedAt = product.deleted_at;
    }
}

module.exports = Product;