var express = require('express');
var path = require('path');


// lag instans
var app = express();

// definer path til views
app.set('views', path.join(__dirname, 'views'));
// definer at vi bruker jade
app.set('view engine', 'jade');

app.get('/', function(req, res) {
	res.render('mastermind', {title: 'Mastermind'});
});

app.listen(3000);
console.log('Server listening on port 3000');