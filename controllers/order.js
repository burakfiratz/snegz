class Order {
    constructor(order) {
        this.id = order.id;
        this.user_id = order.user_id;
        this.amount = order.amount;
        this.tracking_number = order.tracking_number;
        this.created_at = order.created_at;
    }
}

module.exports = Order;