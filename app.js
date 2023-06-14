const express = require("express");
const expressHandlebars = require("express-handlebars");
const Sequelize = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3001;  // Use the PORT environment variable, or default to 3000

const hbs = expressHandlebars.create({
	defaultLayout: "main",
});

app.use(express.urlencoded({ extended: true })); // This line is necessary to parse the form data


app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

const partialsDir = __dirname + '/views/partials/';

hbs.getPartials().then(function (partials) {
    for (let partial in partials) {
        hbs.registerPartial(partial, partials[partial]);
    }
});

app.get("/", (req, res) => {
	res.render("home", { name: "John Doe" });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.post('/display-name', (req, res) => {
  const name = req.body.name;
  res.render('display-name', { name });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});