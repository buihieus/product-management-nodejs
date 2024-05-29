const express = require('express')


require('dotenv').config()

const routes = require("./routes/client/index.route")
const routesAdmin = require("./routes/admin/index.route")

const app = express()
const port = process.env.PORT; 

const database = require("./config/database");
database.connect();

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'))

//Routes
routes(app);
routesAdmin(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})