const Account = require("../../models/account.model");
const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");
const md5 = require("md5");
// [GET] admin/accounts
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Account.find(find).select("-password -token");
  for (const record of records) {
    const role = await Role.findOne({
        deleted: false,
        _id: record.role_id
    })
    record.role = role;
  }
  res.render("admin/pages/account/index", {
    titlePage: "Danh sách tài khoản",
    records: records
  });
};
// [GET] /accounts/create
module.exports.create = async (req, res) => {
  const record = await Role.find({
    deleted: false,
  });
  res.render("admin/pages/account/create", {
    titlePage: "Danh sách tài khoản",
    roles: record,
  });
};
// [POST] /accounts/create
module.exports.createPost = async (req, res) => {
  const emailExists = await Account.findOne({
    email: req.body.email,
    deleted: false,
  });
  if (emailExists) {
    req.flash("error", `Email ${req.body.email} đã tồn tại`);
    res.redirect("back");
  } else {
    req.body.password = md5(req.body.password);
    const account = new Account(req.body);
    await account.save();
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
};
