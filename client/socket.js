// you can remove files you don't need, e.g. if you aren't planning to use sockets

import io from 'socket.io-client';

const socket = io(window.location.origin);

socket.on('connect', function () {
  console.log('Connected!');
});

export default socket
