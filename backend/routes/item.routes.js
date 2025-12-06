import express from "express"
import { getItems } from "../controllers/item.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getItems);

export default router