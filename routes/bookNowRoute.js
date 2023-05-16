const express = require("express");
const { bookNowController } = require("../controllers/bookNowController");

const router = express.Router();


router.route("/").post(bookNowController)

module.exports = router;
