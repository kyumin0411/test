const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/", (request, response) => {
  var template = request.template(request.createBody);
  response.send(template);
});

router.get("/ready", async (request, response) => {
  try {
    const results = await db.User.findAll();
    var body = `
					${request.readyBody}
					${request.tableBody(results)}`;
    response.send(request.template(body));
  } catch (err) {
    console.log("error happens! Creating...");
    console.log(err);
  }
});

router.get("/create", async (request, response) => {
  try {
    var template = request.template(request.readyBody);
    await db.sequelize.sync({ force: true });
    console.log("DB connection complete!");
    response.send(template);
  } catch (err) {
    console.log("error happens! Creating...");
    console.log(err);
  }
});

router.get("/insert", (request, response) => {
  var template = request.template(request.insertForm);
  response.send(template);
});

router.get("/delete", (request, response) => {
  var template = request.template(request.deleteForm);
  response.send(template);
});

router.get("/drop", async (request, response) => {
  try {
    var template = request.template(request.createBody);
    await db.User.drop();
    console.log("DB table drop Complete!");
    response.send(template);
  } catch (err) {
    console.log("error happens! Creating...");
    console.log(err);
  }
});

router.post("/sequelize_insert_process", async (request, response) => {
  try {
    const post = request.body;
    const _userID = post.userID;
    const _name = post.name;
    const _age = post.age;
    await db.User.create({
      userID: _userID,
      name: _name,
      age: _age,
    });
    console.log("Insert data done!");
    response.redirect("/sequelize/ready");
  } catch (err) {
    console.error(err);
  }
});

router.post("/sequelize_delete_process", async (request, response) => {
  try {
    const post = request.body;
    console.log(post);
    const _userID = post.userID;
    await db.User.destroy({ where: { userID: _userID } });
    console.log("Delete Table Data Complete!");
    response.redirect("/sequelize/ready");
  } catch (err) {
    console.error(err);
  }
});
module.exports = router;
