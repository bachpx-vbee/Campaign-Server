const permissionService = require("../services/permission");

const createPermission = async (req, res) => {
  const data = req.body;
  const permission = await permissionService.createPermission(data);
  return res.send({ status: 1, result: { permission } });
};

const deletePermission = async (req, res) => {
  const { permissionId } = req.params;
  await permissionService.deletePermission(permissionId);
  return res.send({ status: 1 });
};

module.exports = {
  createPermission,
  deletePermission,
};
