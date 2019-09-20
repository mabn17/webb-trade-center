import io from 'socket.io-client';

const SERVER_URL = process.env.REACT_APP_BACKEND_URL;
const socket = io.connect(SERVER_URL);

function emitMessage(msg) {
  socket.emit('message', msg);
}

function emitStockChange(change) {
  socket.emit('stock update', change);
}

export {
  socket,
  emitMessage,
  emitStockChange
};
