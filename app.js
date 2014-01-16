var express = require('express');
var path = require('path');

// lag instans
var app = express();

// definer path til views
app.set('views', path.join(__dirname, 'views'));
// definer at vi bruker jade
app.set('view engine', 'jade');
app.use(express.bodyParser());

var guesses = [{guess: {color0: 'Red', color1: 'Green', color2: 'Green', color3: 'Yellow'}, correct:1, almostCorrect:1}];
var fasit = {color0: 'Red', color1: 'Red', color2: 'Blue', color3: 'Green'};

app.get('/', function(req, res) {
	res.render('mastermind', {title: 'Mastermind', guesses: guesses});
});

app.post('/', function(req, res) {
	checkForCorrectColors(req.body);
	res.render('mastermind', {title: 'Mastermind', guesses: guesses});
});

var checkForCorrectColors = function(guess) {
	var correct = 0;
	var almostCorrect = 0;
	for(var colorGuessed in guess) {
		for(var colorCorrect in fasit) {
			if(colorGuessed==colorCorrect) {
				almostCorrect++;
			}
		}
	}
	guesses.push({guess: guess, correct: correct, almostCorrect: almostCorrect});
}

app.listen(3000);
console.log('Server listening on port 3000');