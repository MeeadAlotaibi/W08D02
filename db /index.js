const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.DB_URI, options).then(() => {
  console.log("DB can be used now");
});
//////////////

const mongoose = require("mongoose");
require("dotenv").config();
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.DB, options).then(() => {
  console.log("DB ready to use");
});


////// Done 