var express = require('express');

var ServerManager = require('./server/build/src/ServerManager').ServerManager;
var serverManager = new ServerManager();

var app = express();

app.use(express.static('client/build/'));

app.get('/api/playerLogin', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});