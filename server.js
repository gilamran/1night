var options = require('./server-options');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var serverManager = require('./server/build/src/ServerManager').serverManager;

// setup the server
server.listen(options.port, () => {
  var host = server.address().address;
  var port = server.address().port;

  console.log(`1-Night Server listening at http://${host}:${port}`);
});

// API for getters
app.get('/api/players', (req, res) => {
  res.send(JSON.stringify(serverManager.playersManager.playersNames));
});

// Client statics
app.use(express.static('client/build/'));

// socket.io stuff
io.on('connection', socket => {
  var addedPlayer = false;
  console.log(`socket.io got new connection`);

  socket.on('PLAYER_LOGIN', playerName => {
    console.log(`socket.io got "PLAYER_LOGIN" message with "${playerName}"`);
    socket.playerId = serverManager.playersManager.playerLogin(playerName);
    addedPlayer = true;
    socket.emit('PLAYER_LOGIN_SUCCEED', socket.playerId);
  });

  socket.on('disconnect', () => {
    if (addedPlayer) {
      serverManager.playersManager.playerLogout(socket.playerId);

      // echo globally that this player has left
      socket.broadcast.emit('player left', {
        playerId: socket.playerId
      });
    }
  });
});
