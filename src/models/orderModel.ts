import mongoose, { mongo } from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
        orderItems: [
            {
                name: String,
                qty: Number,
                price: Number,
                product: {
                    type: mongoose.Schema.Types.ObjectId, 
                    ref: 'Product',
                },
            },
        ],
        shippingAddress: {
            name: String,
            address: String,
            city: String,
            postalCode: String,
            country: String,
        },
        totalPrice: Number,
        isPaid: { type: Boolean, default: false},
        paidAt: Date, 
        paymentResult: {
            id: String,
            status: String,
            update_time: String,
            email_address: String,
        }
    },
    { timestamps: true }
);

export default mongoose.model('Order', orderSchema);