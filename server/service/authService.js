const { UserModel, TokenModel } = require("../models");
const userService = require("./userService");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const register = async (payload) => {
  // basic validations
  if (!payload || !payload.username) throw "Username is required";
  if (!payload || !payload.email) throw "Email is required";
  if (!payload || !payload.password) throw "Password is required";

  // email validation
  if (!isEmail(payload.email)) throw "Valid email is required";

  const { username, email, password } = payload;

  // check user by email
  let user = await userService.getUserByEmail(email);

  if (user) throw "Email already exists";

  //   insert user
  user = new UserModel({
    username,
    email,
    password: await hashPassword(password),
  });

  //   save user
  await user.save();

  return { id: user._id, email };
};

const login = async (payload) => {
  if (!payload || !payload.email) throw "Email is required";
  if (!payload || !payload.password) throw "Password is required";

  // email validation
  if (!isEmail(payload.email)) throw "Valid email is required";

  const { email, password } = payload;

  // check user by email
  let user = await userService.getUserByEmail(email, true);

  if (!user) throw "Invalid email";

  //   compare password
  if (!(await comparePassword(password, user.password)))
    throw "Invalid email/password";

  // generate token
  const token = await generateToken({ userId: user._id });

  //   insert in tokens collection
  const tokenObj = new TokenModel({
    user: user._id,
    token,
  });

  await tokenObj.save();

  return { email, userId: user._id, token };
};

const isEmail = (email) => {
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return pattern.test(email);
};

const hashPassword = async (password) => {
  // Hash the password
  const saltRounds = 10;

  return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, dbPassword) => {
  return await bcrypt.compare(password, dbPassword);
};

const generateToken = async (payload) => {
  return await JWT.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1d" });
};

// verify token
const verifyToken = async (payload) => {
  return await JWT.verify(payload.token, process.env.TOKEN_SECRET);
};

// get user token by user & token
const getUserTokenByUserIdAndToken = async (userId, token) => {
  return await TokenModel.findOne({ user: userId, token });
};

const logout = async (payload) => {
  // taking value
  const { userId, token } = payload;

  //   remove token from db
  return TokenModel.deleteOne({ user: userId, token });
};

module.exports = {
  register,
  isEmail,
  hashPassword,
  comparePassword,
  login,
  generateToken,
  verifyToken,
  getUserTokenByUserIdAndToken,
  logout,
};
