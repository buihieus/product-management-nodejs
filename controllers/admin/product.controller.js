const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
// [GET] /admin/products
module.exports.index = async (req, res) => {
    //req.query dùng để lấy các tham số trên URL sau dấu ?
    // console.log(req.query);
    const filterStatus = filterStatusHelper(req.query);
    // console.log(filterStatus);
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

//[PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    //req.params dùng để lấy các routes động trên url (sau dấu :)
    const id = req.params.id;
    const status = req.params.status;

    await Product.updateOne({ _id: id }, { status: status })
    res.redirect("back");
};

//[PATCH] /admin/products/change-multi
module.exports.changeMultiStatus = async (req, res) => {
    //req.body Dùng để lấy dữ liệu được gửi trong thân của một yêu cầu HTTP POST, PUT, hoặc PATCH.
    const type = req.body.type;
    const ids = req.body.ids.split(", ");

    switch (type) {
        case "active":
            await Product.updateMany({_id: {$in: ids}}, {status: "active"});
            break;
        case "inactive":
            await Product.updateMany({_id: {$in: ids}}, {status: "inactive"});
            break;
        default:
            break;
    }
    res.redirect("back");
};  

//[DELETE] /admin/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;

    await Product.deleteOne({_id: id});

    res.redirect("back");
}