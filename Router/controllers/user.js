const userModel = require("../../db/models/user");
const salt = Number(process.env.SALT);

///////////////////////////////////////////////////

const resgister = async (req, res) => {
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

const getUsers = (req, res) => {
  userModel
    .find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};


module.exports = { resgister, getUsers };
