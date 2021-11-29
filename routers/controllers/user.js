const userModel = require("../../db/models/user");
const SALT = Number(process.env.SALT);
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

/////////////////// Sing Up /////////////////////////

const register = async (req, res) => {
  const { email, password, role } = req.body;
  const savedEmail = email.toLowerCase(); // لااازم الايميلات تكون سمول لتر
  const savedPassword = await bcrypt.hash(password, SALT); // يشفر كلمرة المرور قبل يخزنها   و تحتاج وقت عشان كذا حطينا لها اسينك و اويت

  const newUser = new userModel({
    email: savedEmail,
    password: savedPassword, //يخزن كلمه المرور اللي شفرناها بدل اللي دخلناها
    role,
  });
  newUser
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
////////////////////  Log in   ///////////////////////

const login = (req, res) => {
  const { email, password } = req.body;
  userModel
    .findOne({ email }) //ليش استخدمت ون فايند ؟؟؟ عشان يجيب لي اوبجكت بس ،، لكن لو استخدمت فايند راح يجيب لي ارراي اوف اوبجكت ،، وانا اريد واحد فقط 
    .then((result) => {
      if (result) {
        if (email === result.email) { // يطابق الايميل اللي دخل بالايميل الموجد 
          if (password === result.password) {// يطابق الايميل اللي دخل بالايميل الموجد
            res.status(201).json(result);
          } else {
            res.status(404).json("valid password or email ");/// اذا البسوورد خطا 
          }
        } else {
          res.status(404).json("valid password or email ");// اذا الايميل خطا --- نسويه تمويه عشان الهكر مايعرف وين الخطا بالضبط 
        }
      } else {
        res.status(404).json("Not found"); // اذا مافيه ريسولد اساساً 
      }
    })
    .catch((err) => {
      res.status(400).json(err)
    });
};


module.exports = {
  register,
  login
};

///Done

