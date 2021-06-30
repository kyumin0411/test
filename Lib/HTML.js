const HTML = {
  template: (body) => `		
				<!doctype html>
				<html>
				<head> 
					<title>Sequelize</title>
					<meta charset="utf-8">
				</head>
				<body>
					${body}
          <img src="/images/puppy.jpeg" style="width: 500px">
				</body>
				</html>`,
  readyBody: `					
					<h1>Sequelize MySQL!<h1>
					<h2><a href="/sequelize/insert">INSERT</a></h2>
					<h2><a href="/sequelize/delete">DELETE</a></h2>
					<h2><a href="/sequelize/drop">DROP</a></h2>`,
  createBody: `		
					<h1>Sequelize MySQL!<h1>
					<h2>Let's start, Create a new table.</h2>
					<h2><a href="/sequelize/create">CREATE</a></h2>`,
  tableBody: (results) => `
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
					</table>`,
  insertForm: `
				<form action="/sequelize/sequelize_insert_process" method="post">
					<h2>Submit following information </h2>
					<p><input type="text" name="userID" placeholder="userID"></p>
					<p><input type="text" name="name" placeholder="name"></p>
					<p><input type="text" name="age" placeholder="age"></p>
					<p>
						<input type="submit">
					</p>
				</form>
				`,
  deleteForm: `
					<form action="/sequelize/sequelize_delete_process" method="post">
						<p><input type="text" name="userID" placeholder="userID"></p>
						<p>
							<input type="submit">
						</p>
					</form>
					`,
};

module.exports = HTML;
