const Product = require("../../models/product.model")

// [GET] /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({ position : "asc"});
    res.render('client/pages/product/index', {
        pageTitle: "Trang sản phẩm",
        products: products
    });
}