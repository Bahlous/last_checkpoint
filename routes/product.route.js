const express = require("express");
const {
  addProduct,
  getProducts,
  getOneProd,
  getMyProd,
  editProd,
  deleteProd,
} = require("../controllers/product.controllers");
const router = express.Router();
const isAuth = require("../middleware/isAuth");
// test route product
// router.get('/test', (req, res) => {
//     res.send('test of product route')
// })

router.post("/addProd", isAuth, addProduct);
router.get("/allProd", getProducts);
router.get("/myProd", isAuth, getMyProd);
router.get("/:id", getOneProd);
router.put("/:id", isAuth, editProd);
router.delete("/:id", isAuth, deleteProd);

module.exports = router;