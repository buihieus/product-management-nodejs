module.exports.index = (req, res) => {
    res.render('client/pages/product/index', {
        pageTitle: "Trang sản phẩm"
    });
}