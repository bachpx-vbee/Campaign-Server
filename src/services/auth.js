const jwt = require("jsonwebtoken");

const CustomError = require("../errors/CustomError");
const errorCodes = require("../errors/code");

const userDao = require("../daos/user");

const { generateRandomString } = require("../utils/random");
const {
  generateSalt,
  encryptPassword,
  comparePassword,
} = require("../utils/security");

const {
  JWT_SECRET_KEY,
  JWT_EXPIRES_TIME,
  JWT_REFRESH_EXPIRES_TIME,
} = require("../configs");

const generateAccessToken = async (userId) => {
  const accessToken = await jwt.sign({ userId }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_TIME,
  });
  return accessToken;
};

const generateRefreshToken = async (userId) => {
  const refreshToken = await jwt.sign({ userId }, JWT_SECRET_KEY, {
    expiresIn: JWT_REFRESH_EXPIRES_TIME,
  });
  return refreshToken;
};

const login = async (email, password) => {
  const user = await userDao.findUser({ email });
  if (!user) throw new CustomError(errorCodes.USER_NOT_FOUND);

  const isCorrectPassword = await comparePassword(password, user.password);
  if (!isCorrectPassword) throw new CustomError(errorCodes.WRONG_PASSWORD);

  const userId = user._id;
  const accessToken = await generateAccessToken(userId);
  const refreshToken = await generateRefreshToken(userId);
  return { accessToken, refreshToken };
};

const verifyAccessToken = async (accessToken) => {
  const data = await jwt.verify(accessToken, JWT_SECRET_KEY);
  const { userId } = data;
  const user = await userDao.findUser(userId);
  return user;
};

const refreshToken = async (refreshToken) => {
  const decoded = await jwt.verify(refreshToken, JWT_SECRET_KEY);
  const userId = decoded.userId;
  const newAccessToken = await generateAccessToken(userId);
  return newAccessToken;
};

const register = async ({ email, firstName, lastName, password }) => {
  let user = await userDao.findUser({ email });
  if (user) throw new CustomError(errorCodes.USER_EXISTS);

  const salt = generateSalt();
  password = password || generateRandomString(16);
  password = await encryptPassword(password, salt);

  user = await userDao.createUser({ email, firstName, lastName, password });
  return user;
};

module.exports = { login, register, verifyAccessToken, refreshToken };
