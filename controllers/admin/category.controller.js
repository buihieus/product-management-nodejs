const Category = require("../../models/category.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system");
const createTreeHelper = require("../../helpers/createTree");
// [GET] /admin/category
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  //Tìm kiếm theo status
  if (req.query.status) {
    find.status = req.query.status;
  }
  const filterStatus = filterStatusHelper(req.query);
  //Tìm kiếm theo tên
  const search = searchHelper(req.query);
  if (search.regex) {
    find.title = search.regex;
  }
  // //Pagination
  // const countCategory = await Category.countDocuments(find);
  // let objectPagination = paginationHelper(
  //   {
  //     currentPage: 1,
  //     limitItems: 4,
  //   },
  //   req.query,
  //   countCategory
  // );
  // //End Pagination

  // //Sort
  // let sort = {};
  // if (req.query.sortKey && req.query.sortValue) {
  //   sort[req.query.sortKey] = req.query.sortValue;
  // } else {
  //   sort.position = "asc";
  // }
  // //End sort
  const records = await Category.find(find)
    // .sort(sort)
    // .limit(objectPagination.limitItems)
    // .skip(objectPagination.skip);
  const newRecords = createTreeHelper.tree(records);
  res.render("admin/pages/category/index", {
    pageTitle: "Danh mục sản phẩm",
    records: newRecords,
    filterStatus: filterStatus,
    keywords: search.keywords,
    // pagination: objectPagination
  });
};

// [GET] /admin/categoy/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  }
  // Lấy danh mục cha và con tương ứng
  function createTree(arr, parent_id="") {
    const tree = [];
    arr.forEach((item) => {
      if (item.parent_id === parent_id) {
        const newItem = item;
        const children = createTree(arr, item.id);
        if(children.length > 0) {
          newItem.children = children;
        }
        tree.push(newItem);
      }
    })
    return tree;
  }
  const records = await Category.find(find);
  const newRecords = createTree(records);
  console.log(newRecords);
  res.render("admin/pages/category/create", {
    pageTitle: "Tạo danh mục sản phẩm",
    records: newRecords,
  });
};

// [POST] /admin/categoy/create
module.exports.createPost = async (req, res) => {
  if (req.body.position == "") {
    const countCategorys = await Category.countDocuments();
    req.body.position = countCategorys + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  const category = new Category(req.body);
  await category.save();
  res.redirect(`${systemConfig.prefixAdmin}/category`);
};
