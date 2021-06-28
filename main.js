var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
const Template = require('./Lib/template');
const ShowList = require('./Lib/readdir');
const SanitizeHTML = require('sanitize-html');
const Path = require('path');
const models = require('./models');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'alticast#',
	database: 'db',
});

async function Response(title, description, response) {
	try {
		let result = await ShowList(title, description);
		response.writeHead(200);
		response.end(result);
	} catch (err) {
		console.log('Problem happens');
	}
}

var app = http.createServer(function (request, response) {
	var _url = request.url;
	var parsed_url = url.parse(_url, true);
	var queryData = parsed_url.query;
	var title = queryData.id;
	var pathname = parsed_url.pathname;
	var path = parsed_url.path;

	if (pathname === '/sql') {
		// models.sequelize.sync();

		connection.connect();

		console.log('This is MySQL!!');
		connection.query(
			"INSERT INTO `music` VALUES (1, 1, 'Name')",
			function (error, results, fields) {
				if (!error) {
					console.log('DB insert success!!');
					console.log(results, fields);
				}
			}
		);

		connection.end();

		console.log(new Date().toISOString());
		response.writeHead(200);
		response.end('SQL OK!');
	} else if (pathname === '/') {
		if (title === undefined) {
			title = 'Welcome';

			const description = 'Hello, welcome Node.js!';
			const body = Template.BODY(0, title, description);
			const control = Template.CONTROL(false, title);

			ShowList(title, body, control, response);
		} else {
			const sanitizedTitle = SanitizeHTML(title);
			const filteredID = Path.parse(queryData.id).base;
			fs.readFile(`data/${filteredID}`, 'utf8', function (err, description) {
				const sanitizedDescription = SanitizeHTML(description);
				const body = Template.BODY(0, sanitizedTitle, sanitizedDescription);
				const control = Template.CONTROL(true, sanitizedTitle);

				ShowList(sanitizedTitle, body, control, response);
			});
		}
	} else if (pathname === '/create') {
		const sanitizedTitle = SanitizeHTML(title);
		const description = '';
		const body = Template.BODY(1, sanitizedTitle, description);
		const control = ``;

		ShowList(sanitizedTitle, body, control, response);
	} else if (pathname === '/create_process') {
		var body = '';
		request.on('data', function (data) {
			body += data;
		});

		request.on('end', function () {
			const post = qs.parse(body);
			const title = post.title;
			const description = post.description;
			const sanitizedTitle = SanitizeHTML(title);
			const sanitizedDescription = SanitizeHTML(description);
			fs.writeFile(`./Data/${sanitizedTitle}`, sanitizedDescription, 'utf8', (err) => {
				response.writeHead(302, { Location: `/?id=${sanitizedTitle}` });
				response.end();
			});
		});
	} else if (pathname === '/update') {
		const sanitizedTitle = SanitizeHTML(title);
		fs.readFile(`./Data/${sanitizedTitle}`, 'utf8', (err, description) => {
			fs.readdir(`./Data/`, function (err, filelist) {
				const sanitizedDescription = SanitizeHTML(description);
				const body = Template.BODY(2, sanitizedTitle, sanitizedDescription);
				const control = ``;

				ShowList(sanitizedTitle, body, control, response);
			});
		});
	} else if (pathname === '/update_process') {
		var body = '';
		request.on('data', function (data) {
			body += data;
		});

		request.on('end', function () {
			const post = qs.parse(body);
			const id = post.id;
			const title = post.title;
			const description = post.description;
			const sanitizedID = SanitizeHTML(id);
			const sanitizedTitle = SanitizeHTML(title);
			const sanitizedDescription = SanitizeHTML(description);
			fs.rename(`./Data/${sanitizedID}`, `./Data/${sanitizedTitle}`, function (err) {
				if (!err) {
					fs.writeFile(`./Data/${sanitizedTitle}`, sanitizedDescription, 'utf8', (err) => {
						response.writeHead(302, { Location: `/?id=${sanitizedTitle}` });
						response.end();
					});
				}
			});
		});
	} else if (pathname === '/delete_process') {
		var body = '';
		request.on('data', function (data) {
			body += data;
		});

		request.on('end', function () {
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
		response.end('Not Found');
	}
});
app.listen(8080);
