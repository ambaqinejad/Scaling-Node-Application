const express = require("express");
const userController = require("../controllers/user");
const cacheMidleware = require('../helpers/cacheMidleware')

const router = express.Router();

router.get("/getAllUsers", cacheMidleware.memCacheMiddleware(300), userController.getAllUsers);
router.post("/addUser", userController.addUser);

module.exports = router;
