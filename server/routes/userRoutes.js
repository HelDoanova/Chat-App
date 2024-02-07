const express = require("express");
const {
  loginController,
  registerController,
  allUsersController
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/register", registerController);
router.post("/login", loginController);
router.get("/", protect, allUsersController);


module.exports = router;