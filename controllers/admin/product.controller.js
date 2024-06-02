const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
// [GET] /admin/products
module.exports.index = async (req, res) => {
    console.log(req.query);
    const filterStatus = filterStatusHelper(req.query);
    console.log(filterStatus);
    let find = {
        deleted: false
    };
    //Tìm kiếm theo status
    if (req.query.status)  {
        find.status = req.query.status;
    }
    //Tìm kiếm theo tên
    const search = searchHelper(req.query);
    if (search.regex) {
        find.title = search.regex;
    }
    const products = await Product.find(find);
    // console.log(products);
    res.render('admin/pages/product/index', {
        pageTitle: "Trang sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keywords: search.keywords
    });
};