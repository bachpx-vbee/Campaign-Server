const authService = require("../services/auth");

const register = async (req, res) => {
  const data = req.body;
  const user = await authService.register(data);
  return res.send({ status: 1, result: user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const { accessToken, refreshToken } = await authService.login(
    email,
    password
  );
  return res.send({ status: 1, result: { accessToken, refreshToken } });
};

const verifyAccessToken = async (req, res) => {
  const { accessToken } = req;
  const user = await authService.verifyAccessToken(accessToken);
  res.send({ status: 1, result: { user } });
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;
  const accessToken = await authService.refreshToken(refreshToken);
  return res.send({ status: 1, result: { accessToken } });
};

module.exports = { register, login, verifyAccessToken, refreshToken };
