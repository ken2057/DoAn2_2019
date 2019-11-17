//Install express server
const express = require('express');
var bodyParser = require("body-parser");
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
// app.use(express.static(__dirname + '/dist/<name-of-app>'));
app.disable('etag');
app.use(bodyParser.json(), { maxAge: 2592000000 });
app.use(express.static(__dirname + '/dist/Angular'));


app.get('/*', function(req,res) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    res.sendFile(path.join(__dirname + '/dist/Angular/index.html'));
    next()
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
