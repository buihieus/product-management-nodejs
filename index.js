const express = require('express')
const methodOverride = require('method-override')

require('dotenv').config()

const routes = require("./routes/client/index.route")
const routesAdmin = require("./routes/admin/index.route")

const app = express()
const port = process.env.PORT; 

app.use(methodOverride('_method'))

const database = require("./config/database");
database.connect();

const configSystem = require("./config/system");

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'))

//App Locals variables (sử dụng biến toàn cục này trong file pug)
app.locals.preFixAdmin = configSystem.prefixAdmin;

//Routes
routes(app);
routesAdmin(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})