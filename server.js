var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = process.env.PORT || 3000
var todoNextID = 1;
var todos = [];

app.use(bodyParser.json());

// GET /todos
app.get('/todos', function (req, res) {
	res.json(todos); // converts todos array to json and sends response
})

// GET /todos/:id
app.get('/todos/:id', function (req, res) {
	var todoID = parseInt(req.params.id, 10);
	var matchedTodo;

	
	todos.forEach(function (todo) {
		if (todoID === todo.id) {
			matchedTodo = todo;
		}
	});

	if (matchedTodo) {
		res.json(matchedTodo);
	} else {
		res.status(404).send();
	}
});

// POST /todos
app.post('/todos', function(req, res) {
	var body = req.body; // converts body from JSON to string
	body.id = todoNextID++;
	todos.push(body);
	res.json(body); // converts from string to JSON and send it back to the user
});

app.listen(PORT, function() {
	console.log('Express listening on port ' + PORT + '!');
});