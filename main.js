var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");
const Template = require("./Lib/template");
const ShowList = require("./Lib/readdir");
const SanitizeHTML = require("sanitize-html");
const Path = require("path");
const db = require("./models");
const express = require("express");
const app = express();
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "alticast#",
  database: "db",
});

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var parsed_url = url.parse(_url, true);
  var queryData = parsed_url.query;
  var title = queryData.id;
  var pathname = parsed_url.pathname;
  var path = parsed_url.path;

  console.log("pathname : ", pathname);

  if (pathname === "/sequelize") {
    if (queryData.id === undefined) {
      const template = `		
				<!doctype html>
				<html>
				<head> 
					<title>Sequelize</title>
					<meta charset="utf-8">
				</head>
				<body>
					<h1>Sequelize MySQL!<h1>
					<h2>Let's start, Create a new table.</h2>
					<h2><a href="/sequelize?id=create">CREATE</a></h2>
				</body>
				</html>`;
      response.writeHead(200);
      response.end(template);
    } else if (queryData.id === "ready") {
      const template = `<!doctype html>
				<html>
				<head> 
					<title>Sequelize</title>
					<meta charset="utf-8">
				</head>
				<body>
					<h1>Sequelize MySQL!<h1>
					<h2><a href="/sequelize?id=insert">INSERT</a></h2>
					<h2><a href="/sequelize?id=delete">DELETE</a></h2>
					<h2><a href="/sequelize?id=drop">DROP</a></h2>
				</body>
				</html>`;
      response.writeHead(200);
      response.end(template);
    } else if (queryData.id === "create") {
      const template = `		
				<!doctype html>
				<html>
				<head> 
					<title>Sequelize</title>
					<meta charset="utf-8">
				</head>
				<body>
					<h1>Sequelize MySQL!<h1>
					<h2>New Table 'Users' is created!</h2>
					<h2><a href="/sequelize?id=insert">INSERT</a></h2>
					<h2><a href="/sequelize?id=delete">DELETE</a></h2>
					<h2><a href="/sequelize?id=drop">DROP</a></h2>
				</body>
				</html>`;
      db.sequelize
        .sync({ force: true })
        .then(() => {
          console.log("DB connection complete!");
          response.writeHead(200);
          response.end(template);
        })
        .catch((err) => {
          console.error(err);
          process.exit();
        });
    } else if (queryData.id === "insert") {
      const Form = `
				<form action="/sequelize_insert_process" method="post">
					<h2>Submit following information </h2>
					<p><input type="text" name="userID" placeholder="userID"></p>
					<p><input type="text" name="name" placeholder="name"></p>
					<p><input type="text" name="age" placeholder="age"></p>
					<p>
						<input type="submit">
					</p>
				</form>
				`;
      var template = `		
				<!doctype html>
				<html>
				<head> 
					<title>Sequelize_Create</title>
					<meta charset="utf-8">
				</head>
				<body>
					<h1>Sequelize Create!</h1>
					${Form}
				</body>
				</html>`;

      response.writeHead(200);
      response.end(template);
    } else if (queryData.id === "delete") {
      const Form = `
					<form action="/sequelize_delete_process" method="post">
						<p><input type="text" name="userID" placeholder="userID"></p>
						<p>
							<input type="submit">
						</p>
					</form>
					`;
      var template = `		
					<!doctype html>
					<html>
					<head> 
						<title>Sequelize_Delete</title>
						<meta charset="utf-8">
					</head>
					<body>
						<h1>Sequelize Delete!</h1>
						${Form}
					</body>
					</html>`;

      response.writeHead(200);
      response.end(template);
    } else if (queryData.id === "drop") {
      const template = `		
				<!doctype html>
				<html>
				<head> 
					<title>Sequelize</title>
					<meta charset="utf-8">
				</head>
				<body>
					<h1>Sequelize MySQL!<h1>
					<h2>There is no Table.. Please Create new table.</h2>
					<h2><a href="/sequelize?id=create">CREATE</a></h2>
				</body>
				</html>`;
      db.User.drop()
        .then(() => {
          console.log("DB table drop Complete!");
          response.writeHead(200);
          response.end(template);
        })
        .catch((err) => {
          console.error(err);
          process.exit();
        });
    } else if (queryData.id === "Show_table") {
      console.log("db", db);
      console.log("db.models : ", db.models);
      console.log("db.model :", db.Model);
      console.log("");
      db.User.findAll()
        .then((results) => {
          var template = `
					<!doctype html>
					<html>
					<head> 
						<title>Sequelize_Delete</title>
						<meta charset="utf-8">
					</head>
					<body>
						<h1>Sequelize Delete!</h1>
						<table>
							<tr>
									<td>userID</td>
									<td>name</td>
									<td>age</td>
							</tr>
							${results?.map(
                (data) =>
                  `<tr>
									<td>${data.dataValues.userID}</td>
									<td>${data.dataValues.name}</td>
									<td>${data.dataValues.age}</td>
								</tr>`
              )}
					</table>
					</body>
					</html>
					`;

          response.writeHead(200);
          response.end(template);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  } else if (pathname === "/sequelize_insert_process") {
    var body = "";
    request.on("data", function (data) {
      body += data;
    });
    request.on("end", function () {
      const post = qs.parse(body);
      const _userID = post.userID;
      const _name = post.name;
      const _age = post.age;
      db.User.create({
        userID: _userID,
        name: _name,
        age: _age,
      })
        .then(() => {
          console.log("Insert data done!");
          response.writeHead(302, { Location: "/sequelize?id=ready" });
          response.end();
        })
        .catch((err) => {
          console.error(err);
        });
    });
  } else if (pathname === "/sequelize_delete_process") {
    var body = "";
    request.on("data", function (data) {
      body += data;
    });
    request.on("end", function () {
      const post = qs.parse(body);
      console.log(post);
      const _userID = post.userID;
      db.User.destroy({ where: { userID: _userID } })
        .then(() => {
          console.log("Delete Table Data Complete!");
          response.writeHead(302, { Location: "/sequelize?id=ready" });
          response.end();
        })
        .catch((err) => {
          console.error(err);
        });
    });
  } else if (pathname === "/sql") {
    connection.connect((err) => {
      console.log("mySQL Connected!");
    });

    connection.query(
      "INSERT INTO `coffee` VALUES ('cafe latte', 'france')",
      function (error, results, fields) {
        if (!error) {
          console.log("DB insert success!!");
          console.log(results, fields);
        }
      }
    );

    connection.end();

    console.log(new Date().toISOString());
    response.writeHead(200);
    response.end("SQL OK!");
  } else if (pathname === "/") {
    if (title === undefined) {
      title = "Welcome";

      const description = "Hello, welcome Node.js!";
      const body = Template.BODY(0, title, description);
      const control = Template.CONTROL(false, title);

      ShowList(title, body, control, response);
    } else {
      const sanitizedTitle = SanitizeHTML(title);
      const filteredID = Path.parse(queryData.id).base;
      fs.readFile(`data/${filteredID}`, "utf8", function (err, description) {
        const sanitizedDescription = SanitizeHTML(description);
        const body = Template.BODY(0, sanitizedTitle, sanitizedDescription);
        const control = Template.CONTROL(true, sanitizedTitle);

        ShowList(sanitizedTitle, body, control, response);
      });
    }
  } else if (pathname === "/create") {
    const sanitizedTitle = SanitizeHTML(title);
    const description = "";
    const body = Template.BODY(1, sanitizedTitle, description);
    const control = ``;

    ShowList(sanitizedTitle, body, control, response);
  } else if (pathname === "/create_process") {
    var body = "";
    request.on("data", function (data) {
      body += data;
    });

    request.on("end", function () {
      const post = qs.parse(body);
      const title = post.title;
      const description = post.description;
      const sanitizedTitle = SanitizeHTML(title);
      const sanitizedDescription = SanitizeHTML(description);
      console.log(post);
    });
  } else if (pathname === "/update") {
    const sanitizedTitle = SanitizeHTML(title);
    fs.readFile(`./Data/${sanitizedTitle}`, "utf8", (err, description) => {
      fs.readdir(`./Data/`, function (err, filelist) {
        const sanitizedDescription = SanitizeHTML(description);
        const body = Template.BODY(2, sanitizedTitle, sanitizedDescription);
        const control = ``;

        ShowList(sanitizedTitle, body, control, response);
      });
    });
  } else if (pathname === "/update_process") {
    var body = "";
    request.on("data", function (data) {
      body += data;
    });

    request.on("end", function () {
      const post = qs.parse(body);
      const id = post.id;
      const title = post.title;
      const description = post.description;
      const sanitizedID = SanitizeHTML(id);
      const sanitizedTitle = SanitizeHTML(title);
      const sanitizedDescription = SanitizeHTML(description);
      fs.rename(
        `./Data/${sanitizedID}`,
        `./Data/${sanitizedTitle}`,
        function (err) {
          if (!err) {
            fs.writeFile(
              `./Data/${sanitizedTitle}`,
              sanitizedDescription,
              "utf8",
              (err) => {
                response.writeHead(302, { Location: `/?id=${sanitizedTitle}` });
                response.end();
              }
            );
          }
        }
      );
    });
  } else if (pathname === "/delete_process") {
    var body = "";
    request.on("data", function (data) {
      body += data;
    });

    request.on("end", function () {
      const post = qs.parse(body);
      const id = post.id;
      const sanitizedID = SanitizeHTML(id);
      fs.unlink(`./Data/${sanitizedID}`, function (err) {
        if (!err) {
          response.writeHead(302, { Location: `/` });
          response.end();
        }
      });
    });
  } else {
    response.writeHead(404);
    response.end("Not Found");
  }
});
app.listen(8080);
