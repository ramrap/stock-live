const WebSocket = require('ws');
const app = require('express')();
var cors = require('cors')
app.use(cors())

const server = require('http').createServer(app);
const options = {
    cors: {
        origin: '*',
    }
};
const io = require('socket.io')(server, options);
const stocksUrl = 'ws://stocks.mnet.website/';

io.on('connection', socket => {
    console.log("someone connected!")
    const newStocks = (data) => {
        console.log("emitting new stocks data")
        socket.emit("newData", JSON.stringify(data))
    }
    let connection = new WebSocket(stocksUrl);
    connection.onmessage = newStocks;
    connection.onclose = () => { console.log("stocks connection error") }
});

server.listen(3001, () => {
    console.log("listening on port 3001")
});