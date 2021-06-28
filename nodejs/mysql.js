var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'alticast#',
	database: 'db',
});

connection.connect();

connection.query(
	"INSERT INTO `author` VALUES (1,'egoing','developer')",
	function (error, results, fields) {
		if (error) {
			console.log(error);
		}
		console.log('db connection success!!');
		console.log(results, fields);
	}
);

module.exports = connection;

connection.end();
