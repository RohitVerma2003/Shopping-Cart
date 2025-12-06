import express from "express"
import dotenv from "dotenv"
import { connectToMongoDB } from "./database/connect.js";
import userRoute from "./routes/user.routes.js";
import itemRoute from "./routes/item.routes.js";
import cartRoute from "./routes/cart.routes.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import path from 'path'


dotenv.config()
const app = express();

const __dirname = path.resolve()

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

app.use(express.static(path.join(__dirname , "frontend" , "dist")))
app.get("/*" , (req , res)=>{
    res.sendFile(path.join(__dirname , "frontend" , "dist" , "index.html"))
})

app.listen(3000, () => {
    console.log("App is listening at 3000");
})