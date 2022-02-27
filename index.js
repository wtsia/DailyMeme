const express = require('express');
const parser = require('body-parser');
const methodOverride = require('method-override');
const hbs = require('hbs');
const path = require('path')
const controller = require('./controllers/controller');
const cors = require('cors')
const app = express();

app.set("view engine", "hbs");
app.use(cors())
app.use(parser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(parser.json());
app.use("/", controller);
app.use(express.static(path.join(__dirname, '/public')));
app.set("port", process.env.PORT || 3301);

app.listen(app.get("port"), () => {
  console.log(`✅ PORT: ${app.get("port")} +++++++`);
});

