const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
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
    let keywords = "";
    if (req.query.keyword) {
        keywords = req.query.keyword;

        const regex = new RegExp(keywords, "i");//regex tìm kiếm ko phần biệt hoa thường và theo chữ cái
        find.title = regex;
    }
    const products = await Product.find(find);
    // console.log(products);
    res.render('admin/pages/product/index', {
        pageTitle: "Trang sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keywords: keywords
    });
};