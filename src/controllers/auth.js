const authService = require("../services/auth");

const register = async (req, res) => {
  const data = req.body;
  const user = await authService.register(data);
  return res.send({ status: 1, result: user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const accessToken = await authService.login(email, password);
  return res.send({ status: 1, result: { accessToken } });
};

const verifyAccessToken = async (req, res) => {
  const { accessToken } = req;
  const { user } = await authService.verifyAccessToken(accessToken);
  console.log("user", user);
  res.send({ status: 1, result: { user } });
};

module.exports = { register, login, verifyAccessToken };
