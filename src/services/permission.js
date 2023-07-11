const permissionDao = require("../daos/permission");
const CustomError = require("../errors/CustomError");
const errorCodes = require("../errors/code");

const createPermission = async (data) => {
  const permissionExists = await permissionDao.getPermission({
    $or: [{ name: data.name }, { url: data.url }],
  });

  if (permissionExists) {
    throw new CustomError(errorCodes.PERMISSION_EXISTS);
  }
  const permission = await permissionDao.createPermission(data);
  return permission;
};

const deletePermission = async (permissionId) => {
  await permissionDao.deletePermission(permissionId);
};

module.exports = {
  createPermission,
  deletePermission,
};
