import mongoose from "mongoose"
import User from "./user.model.js";
import Item from "./items.model.js";

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    items:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: Item,
        default: [],
        required:true
    }]
})

const Cart = mongoose.model('Cart' , cartSchema);
export default Cart;