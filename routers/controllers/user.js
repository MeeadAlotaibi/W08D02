const userModel = require("../../db/models/user");
const salt = Number(process.env.SALT);

///////////////////////////////////////////////////

const register = async (req, res) => {
  const { email, password, role } = req.body;

  const savedEmail = email.toLowerCase(); // لااازم الايميلات تكون سمول لتر
  const savedPassword = await bcrypt.hash(password, salt); // يشفر كلمرة المرور قبل يخزنها   و تحتاج وقت عشان كذا حطينا لها اسينك و اويت

  const newUser = new userModel({
    email: savedEmail,
    password: savedPassword, //يخزن كلمه المرور اللي شفرناها بدل اللي دخلناها
    role,
  });
  newUser
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};
///////////////////////////////////////////////////

const login = (req, res) => {
  userModel
    .findOne({ email })
    .then((result) => {
      if (result) {
        if (result.email == email) {
          if (result.password == password) {
            res.status(200).json(result);
          } else {
            res.status(401).json(" email or password");
          }
        } else {
          res.status(401).json(" email or password");
        }
      } else {
        res.status(401).json("email no esist ");
      }
    })
    .catch((err) => {
      res.status(400).json(" err ");
    });
};


module.exports = {
  register,
  login,
};