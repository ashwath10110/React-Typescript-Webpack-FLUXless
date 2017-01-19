var path = require('path');
var http = require('http');

var express = require('express');
var proxy = require('express-http-proxy');
var Twitter = require('twitter');

var app = express();
var port = process.env.PORT || 3000;

var session = require('express-session')
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(express.static(__dirname + "build"));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/twitter', proxy('twitter.com'));

var client = new Twitter({
	consumer_key: '1BENo4oz0qwAqpR75l0Vu5LvX',
	consumer_secret: 'FHw8jWHS8ZEZqAvPoTIuaceuKlYYwPvjgE98CVuMK9XWr3jSwO',
	access_token_key: '1924199304-HnodTon4wGw41WSh5UmNVNURteo1LDc9K3rGSHR',
	access_token_secret: 'yfZJJRhaEVCaZPNPu7ezi1sZJhuagLi4WGRGIUxkSWIsx'
});

app.get('/api', function(req, res) {
	res.send('API');
});

app.post('/getTweets', (req, res, next) => {

	var screenName = req.body.credentials.username;

	client.get('statuses/user_timeline', {
		screen_name: screenName,
		count: 10
	}, function(error, tweets, response) {
		if (!error) {
			res.status(200).json(tweets);
		} else {
			res.status(500).json({
				error: error
			});
		}
	});
});

var server = http.createServer(app).listen(port, function() {
	console.log('Express server listening on port ' + port);
});