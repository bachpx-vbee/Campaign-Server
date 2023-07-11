const permissionService = require("../services/permission");

const createPermission = async (req, res) => {
  const data = req.body;
  const permission = await permissionService.createPermission(data);
  return res.send({ status: 1, result: { permission } });
};

module.exports = {
  createPermission,
};
