import express from "express";
import authUser from "../middlewares/authUser.js";
import { removeFromCart, updateCart } from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/update", authUser, updateCart);
cartRouter.delete("/remove/:id", authUser, removeFromCart);

export default cartRouter;
