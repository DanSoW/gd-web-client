import { io } from 'socket.io-client';
import Api from 'src/constants/api';

// Опции для подключения сокета
const options = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"]
};

const socket = io(Api.MAIN_SERVER, options);

export const SocketConnection = () => {
    if(socket.disconnected){
        socket.connect();
    }
}

export default socket;