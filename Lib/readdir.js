const fs = require('fs');
const Template = require('./template');

const ShowList = function (title, body, control, response) {
	fs.readdir(`./Data/`, function (err, filelist) {
		var list = Template.LIST(filelist);
		var template = Template.HTML(title, list, body, control);

		response.writeHead(200);
		response.end(template);
	});
};

module.exports = ShowList;
