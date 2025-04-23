const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  try {
    const newProd = new Product({ ...req.body, addedBy: req.user.id });
    await newProd.save();
    res.status(200).json({ msg: "Product added successfully!", newProd });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getProducts = async (req, res) => {
  try {
    const listProd = await Product.find();
    res.status(200).json({ msg: "List of products", listProd });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getOneProd = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id)
    const prodToGet = await Product.findById(id);
    //verification à faire à chaque controleur pour gérer les erreurs (hanldling Errors)
    if (!prodToGet) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(200).json({ msg: "The product is", prodToGet });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getMyProd = async (req, res) => {
  try {
    const myProdList = await Product.find({ addedBy: req.user._id });
    res.status(200).json({ msg: "List of My product", myProdList });
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.editProd = async (req, res) => {
  try {
    const { id } = req.params;
    const productChange = req.body;
    const productEdited = await Product.findByIdAndUpdate(id, productChange, {
      new: true,
    });
    res.status(200).json({ msg: "Updated successfully", productEdited });
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.deleteProd = async (req, res) => {
  try {
    const { id } = req.params;
    const productToDel = await Product.findByIdAndDelete(id);
    res.status(200).json({ msg: "Deleted successfully", productToDel });
  } catch (error) {
    res.status(400).json(error);
  }
};