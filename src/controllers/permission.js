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

const getAllPermission = async (req, res) => {
  const { offset, limit } = req.body;
  const permissions = await permissionService.getAllPermission({
    offset,
    limit,
  });
  return res.send({ status: 1, result: { permissions } });
};

module.exports = {
  createPermission,
  deletePermission,
  getAllPermission,
};
