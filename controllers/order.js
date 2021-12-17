class Order {
    constructor(order) {
        this.id = order.id;
        this.userId = order.user_id;
        this.amount = order.amount;
        this.trackingNumber = order.tracking_number;
        this.createdAt = order.created_at;
    }
}

module.exports = Order;