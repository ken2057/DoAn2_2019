//Install express server
const express = require('express');
var bodyParser = require("body-parser");
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
// app.use(express.static(__dirname + '/dist/<name-of-app>'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist/Angular'));

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname + '/dist/Angular/index.html'));
});
app.disable('etag');

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);