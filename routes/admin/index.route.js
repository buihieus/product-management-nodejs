const dashBoardRoutes = require("./dashboard.route")
const productRoutes = require("./product.route")
const systemConfig = require("../../config/system")
module.exports = (app) => {
  const patchAdmin = systemConfig.prefixAdmin;
  app.use(patchAdmin + '/dashboard', dashBoardRoutes);
  app.use(patchAdmin + '/products', productRoutes);
}