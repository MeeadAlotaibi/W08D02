const express = require("express");
const userRouter = express.Router();

const { register, login } = require("../controllers/user");

userRouter.post("/resgister", register);
userRouter.get("/users", login);


module.exports = userRouter;
