import { options } from './ServerOptions';
import { serverManager } from './ServerManager';
import { createServer } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';

const app = express();
const server = createServer(app);
const io = socketIo(server);


// setup the server
server.listen(options.port, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`1-Night Server listening at http://${host}:${port}`);
});

// API for getters
app.get('/api/players', (req: express.Request, res: express.Response) => {
  res.send(JSON.stringify(serverManager.playersManager.playersNames));
});

// Client statics
app.use(express.static('client/build/'));

// socket.io stuff
io.on('connection', (socket: TPlayerSocket) => {
  let addedPlayer = false;
  console.log(`socket.io got new connection`);

  socket.on('PLAYER_LOGIN', (playerName: string) => {
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

type TPlayerSocket = SocketIO.Socket & {
  playerName: string,
  playerId: string
}
