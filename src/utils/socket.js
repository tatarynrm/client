import io from "socket.io-client";

const socket = io("http://192.168.5.180:8800/api");
// const socket = io("http://localhost:8800");
// const socket = io("http://0.0.0.0:8800");
// const socket = io("http://ict.lviv.ua/api");

export default socket;