const express = require("express");
const userRouter = express.Router();

const { resgister, getUsers } = require("../controllers/user");

userRouter.post("/resgister", resgister);
userRouter.get("/users", getUsers);

module.exports = userRouter;
