const express = require('express');
const { getAllUsers, deleteUser } = require("../controllers/user.controllers");
const isAdmin = require('../middleware/isAdmin');

const router = express.Router();

router.get("/allUsers", isAdmin, getAllUsers);
router.delete("/:id", isAdmin, deleteUser);

module.exports = router;
