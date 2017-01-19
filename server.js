var path = require('path');
var http = require('http');
var express = require('express');
var proxy = require('express-http-proxy');

var app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use('/twitter', proxy('twitter.com'));

app.use('/api', proxy('twitter.com'));

http.createServer(app).listen(3000, () => {
    console.log('Listening...');
});