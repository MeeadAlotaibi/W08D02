const express = require("express");
const dotenv =require("dotenv");
const cors = require("cors");
require("./db");
dotenv.config()
const app = express();
app.use(express.json());
app.use(cors());

//////////
const roleRouter = require("./routers/routes/role");
app.use(roleRouter);
///////////
const userRouter = require("./routers/routes/user");
app.use(userRouter);
///////////
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON ${PORT}`);
});

//////////////////