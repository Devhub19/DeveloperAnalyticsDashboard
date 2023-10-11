const express = require("express");

const {
  register,
  countUniqueUsers,
  analyticsData,
  getAllUsers,
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/allusers", getAllUsers);

router.get("/", analyticsData);

router.post("/helloworld", register, countUniqueUsers);

exports.routes = router;
