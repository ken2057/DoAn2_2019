//Install express server
const express = require('express');
var bodyParser = require("body-parser");
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
// app.use(express.static(__dirname + '/dist/<name-of-app>'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist/Angular'));

app.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next()
});

app.disable('etag');
app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname + '/dist/Angular/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
