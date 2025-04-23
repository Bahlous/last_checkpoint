const User = require("../models/User");
const Product = require("../models/Product"); // ✅ import Product model

exports.getAllUsers = async (req, res) => {
  try {
    const listUsers = await User.find();
    res.status(200).json({ success: { msg: "List of Users is:" }, listUsers });
  } catch (error) {
    res.status(400).json({ errors: { msg: "Can't get Users" } });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // 🧹 Delete all products created by this user
    await Product.deleteMany({ addedBy: id });

    // 🧼 Then delete the user
    const UserToDelete = await User.findByIdAndDelete(id);

    res.status(200).json({
      success: { msg: "User and their products deleted successfully" },
      UserToDelete,
    });
  } catch (error) {
    console.error("Error deleting user/products:", error);
    res.status(400).json({ errors: { msg: "Can't delete user or their products" } });
  }
};
