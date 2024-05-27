const productRoutes = require("./product.route");
const homeRoutes = require("./home.route");

//sử dụng trong file index.js
module.exports = (app) => {
  app.use('/', homeRoutes);

  app.use('/product', productRoutes);
}