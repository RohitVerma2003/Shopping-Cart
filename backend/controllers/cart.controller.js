import Cart from "../models/cart.model.js";
import Item from "../models/items.model.js";

export const addToCart = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;

        let shoppingCart = await Cart.findOne({ userId: user?._id });

        if (!shoppingCart) {
            shoppingCart = await Cart.create({ userId: user._id });
        }

        const item = await Item.findById(id);;

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        const present = shoppingCart.items.find((i) => i.equals(item?._id))

        if (present) {
            return res.status(400).json({ message: "Item already present in the cart" });
        }

        shoppingCart.items.push(item._id);
        await shoppingCart.save();

        res.status(201).json({
            message: "Item saved"
        })
    } catch (error) {
        console.log("Error in add to cart controller, ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;

        const shoppingCart = await Cart.findOne({ userId: user?._id });

        if (!shoppingCart) {
            return res.status(404).json({ message: "Shopping Cart not found" });
        }

        const newCart = shoppingCart.items.filter(item => item._id.toString() !== id);
        shoppingCart.items = newCart;
        await shoppingCart.save();

        res.status(201).json({
            message: "Item removed"
        })
    } catch (error) {
        console.log("Error in remove from cart controller, ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getCart = async (req, res) => {
    try {
        const user = req.user;

        let shoppingCart = await Cart.findOne({ userId: user?._id });

        if (!shoppingCart) {
            shoppingCart = await Cart.create({ userId: user._id });
        }

        await shoppingCart.populate("items");

        res.status(201).json({
            message: "Cart fetched",
            cart: shoppingCart
        })
    } catch (error) {
        console.log("Error in get cart controller, ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }

}