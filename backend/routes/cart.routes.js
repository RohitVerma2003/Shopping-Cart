import express from 'express'
import { addToCart, getCart, removeFromCart } from '../controllers/cart.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.post("/add/:id", protectRoute, addToCart);
router.post("/remove/:id", protectRoute, removeFromCart);
router.get("/", protectRoute, getCart);

export default router