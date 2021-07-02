const HTML = require("./Lib/HTML");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sequelizeRouter = require("./routes/sequelize");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("*", (request, response, next) => {
  request.template = (body) => HTML.template(body);
  request.readyBody = HTML.readyBody;
  request.createBody = HTML.createBody;
  request.tableBody = (results) => HTML.tableBody(results);
  request.insertForm = HTML.insertForm;
  request.deleteForm = HTML.deleteForm;
  next();
});

app.use("/sequelize", sequelizeRouter);

app.use((request, response, text) => {
  response.status(404).send("Sorry, Cannot find the Page!");
});

app.listen(8080, () => {
  console.log("Example app listening on port 8080!");
});
