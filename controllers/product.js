class Product {
    constructor(product) {
        this.id = product.id;
        this.user_id = product.user_id;
        this.name = product.name;
        this.description = product.description;
        this.price = product.price;
        this.stock = product.stock;
        this.created_at = product.created_at;
        this.modified_at = product.modified_at;
        this.deleted_at = product.deleted_at;
    }
}

module.exports = Product;