import express from "express"
import dotenv from "dotenv"
import { connectToMongoDB } from "./database/connect.js";
import userRoute from "./routes/user.routes.js";
import itemRoute from "./routes/item.routes.js";
import cartRoute from "./routes/cart.routes.js";
import cors from "cors"
import cookieParser from "cookie-parser";


dotenv.config()
const app = express();
app.use(cors({
    origin: "*",
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());
connectToMongoDB();

app.use("/api/user", userRoute);
app.use("/api/items", itemRoute);
app.use("/api/cart", cartRoute);

app.listen(3000, () => {
    console.log("App is listening at 3000");
})