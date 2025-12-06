import Item from "../models/items.model.js";

export const addItem = async ({ name, price, description, image }) => {
    try {
        const item = new Item({ name, price, description, image });
        await item.save();
    } catch (error) {
        console.log("Error in saving the item, ", error.message);
    }
}

export const getItems = async (req, res) => {
    try {
        const items = await Item.find({});

        if (!items) {
            return res.status(400).json({ error: "Error in getting items" });
        }

        res.status(201).json({
            items,
            message: "Items fetched"
        })
    } catch (error) {
        console.log("Error in get items controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}