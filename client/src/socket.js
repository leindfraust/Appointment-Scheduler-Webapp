import {
    io
} from "socket.io-client"
const URL = "http://localhost:5000"
const socket = io(process.env.NODE_ENV === 'development' ? URL : '', {
    autoConnect: false
});
export default socket;