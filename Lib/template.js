var Template = {
  HTML: function (title, list, body, control) {
    return `
		<!doctype html>
		<html>
		<head> 
			<title>WEB1 - ${title}</title>
			<meta charset="utf-8">
		</head>
		<body>
			<h1><a href="/">WEB</a></h1>
			${list}
			${control}
			${body}
		</body>
		</html>`;
  },
  LIST: function (filelist) {
    var list = "<ol>";
    var i = 0;
    while (i < filelist.length) {
      list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
      i = i + 1;
    }
    list = list + "</ol>";
    return list;
  },
  BODY: function (case_index, title, description) {
    if (case_index == 0) {
      // default
      return `<h2>${title}</h2>${description}`;
    } else if (case_index == 1) {
      // create
      return `
					<form action="/create_process" method="post">
						<p><input type="text" name="title" placeholder="title"></p>
						<p>
							<textarea name="description" placeholder="description"></textarea>
						</p>
						<p>
							<input type="submit">
						</p>
					</form>
				`;
    } else if (case_index == 2) {
      // update
      return `
					<form action="/update_process" method="post">
						<input type="hidden" name="id" value=${title}>
						<p><input type="text" name="title" placeholder="title" value="${title}"></p>
						<p>
							<textarea name="description" placeholder="description">${description}</textarea>
						</p>
						<p>
							<input type="submit">
						</p>
					</form>
				`;
    }
  },
  CONTROL: function (haveID, title, description) {
    if (!haveID) {
      // Welcome
      return `<h2><a href="/create">create</a></h2>`;
    } else {
      // Choose ID
      return ` <a href="/create">create</a>
				<a href="/update?id=${title}">update</a>
				<form action="delete_process" method="post">
					<input type="hidden" name="id" value="${title}">
					<input type="submit" value="delete">
				</form>`;
    }
  },
};

module.exports = Template;
