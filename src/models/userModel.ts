import mongoose, { Types } from 'mongoose';
import jwt from 'jsonwebtoken';

interface CartItem {
    product: Types.ObjectId;
    title: string;
    qty: number;
    price: number;
    image: string;
}

interface ShippingAddress {
        name: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
}

export interface IUser extends mongoose.Document {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    generateJWT: () => string;
    isAdmin: boolean;
    cart: CartItem[];
    shippingAddress: ShippingAddress;
}

const userSchema = new mongoose.Schema<IUser>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
    cart: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
            title: String,
            qty: Number,
            price: Number,
            image: String,
        },
    ],
    shippingAddress: {
        name: String,
        address: String,
        city: String,
        postalCode: String,
        country: String,
    },
}, { timestamps: true});

userSchema.methods.generateJWT = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET!, {
        expiresIn: '30d',
    });
};

const User = mongoose.model<IUser>('User', userSchema);

export default User;