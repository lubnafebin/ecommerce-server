import User from "../models/User.js";

//update user cart
export const updateCart = async (req, res) => {
  try {
    const { userId, cartItems } = req.body;
    await User.findByIdAndUpdate(userId, { cartItems });
    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.body.userId;
    const productId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if product exists in the cart
    if (user.cartItems && user.cartItems[productId]) {
      // Remove the product key from the cartItems object
      delete user.cartItems[productId];

      await user.save();

      return res.status(200).json({
        success: true,
        message: "Item removed from cart",
        cartItems: user.cartItems,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({
      success: false,
      message: "Failed to remove item from cart",
    });
  }
};
