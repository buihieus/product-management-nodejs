const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
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

    //Pagination
    const countProducts = await Product.countDocuments(find);
    let objectPagination = paginationHelper({
        currentPage: 1,
        limitItems: 4
    },
    req.query,
    countProducts);
    // if (req.query.page) {
    //     objectPagination.currentPage = parseInt(req.query.page);
    // }
    // objectPagination.skip = (objectPagination.currentPage -1)*objectPagination.limitItems;
    // const countProducts = await Product.countDocuments(find);
    // const totalPages = Math.ceil(countProducts/objectPagination.limitItems);
    // objectPagination.totalPages = totalPages;
    //End pagination
    const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip);
    // console.log(products);
    res.render('admin/pages/product/index', {
        pageTitle: "Trang sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keywords: search.keywords,
        pagination: objectPagination
    });
};