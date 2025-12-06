import mongoose from "mongoose";
import { addItem } from "./item.controller.js"
import { configDotenv } from "dotenv";
configDotenv();

const data = [
    { name: "Shirt", description: "Blue shirt for mens", price: 1599, image: "https://images.unsplash.com/photo-1740711152088-88a009e877bb" },
    { name: "T-Shirt", description: "White pavilion shirt for mens", price: 1299, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab" },
    { name: "Shoes", description: "Pro brown Shoes", price: 2599, image: "https://plus.unsplash.com/premium_photo-1670983855655-36ed5f4c2fb1" },
    { name: "Pant", description: "Black Jeans", price: 1899, image: "https://images.unsplash.com/photo-1718252540617-6ecda2b56b57" },
    { name: "Hat", description: "Mens cowboy hat", price: 1599, image: "https://images.unsplash.com/photo-1619734086067-24bf8889ea7d" },
]

const addItems = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

        for (const item of data) {
            await addItem(item);
            console.log("Item added:", item.name);
        }

        mongoose.connection.close();
    } catch (error) {
        console.log("Error:", error.message);
    }
};

addItems();