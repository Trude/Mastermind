var express = require('express');
var path = require('path');

// lag instans
var app = express();

// definer path til views
app.set('views', path.join(__dirname, 'views'));
// definer at vi bruker jade
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use('/public', express.static(__dirname + '/public'));

var guesses = [];
var fasit = {color0: 'Red', color1: 'Red', color2: 'Blue', color3: 'Green'};

app.get('/', function(req, res) {
	res.render('mastermind', {title: 'Mastermind', guesses: guesses});
});

app.post('/guess', function(req, res) {
	checkForCorrectColors(req.body);
	res.render('mastermind', {title: 'Mastermind', guesses: guesses});
});

app.get('/startover', function(req, res) {
  guesses = [];
  res.render('mastermind', {title: 'Mastermind', guesses: guesses});
});

var checkForCorrectColors = function(guess) {
	var correct = findNumberOfCorrectGuesses(guess);
	var almostCorrect = findNumberOfAlmostCorrectGuesses(guess);
	guesses.push({guess: guess, correct: correct, almostCorrect: almostCorrect});
}

var findNumberOfCorrectGuesses = function(guess) {
	var correct = 0;
	for(var color in guess) {
		if(fasit[color] == guess[color]){
			correct++;
		}
	}
	return correct;
}

var findNumberOfAlmostCorrectGuesses = function(guess) {
	var guessCopy = copyMap(guess);
	var fasitCopy = copyMap(fasit);

	var almostCorrect = 0;
	for(var colorGuess in guess) {
		if(guessCopy[colorGuess] == fasitCopy[colorGuess]) {
			delete guessCopy[colorGuess];
			delete fasitCopy[colorGuess];
		}
	}

	for(var colorGuess in guessCopy) {
		for(var colorFasit in fasitCopy) {
			if(colorGuess != colorFasit && guessCopy[colorGuess] == fasitCopy[colorFasit]) {
				almostCorrect++;
				delete fasitCopy[colorFasit];
				break;
			}
		}
	}
	return almostCorrect;
}

var copyMap = function(map) {
	var newMap = {};
	for (var i in map) {
 		newMap[i] = map[i];
 	}
 	return newMap;
}

app.listen(3000);
console.log('Server listening on port 3000');