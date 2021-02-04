const io = require('socket.io')(3001, {
    // Now, the CORS config.
    // You could either use the new `cors` property...
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["content-type"]
    }
});
const si = require('systeminformation');

const socketapi = {
    io: io
};

io.on('connection', (socket) => {
    setInterval(() => {
        si.mem(data => {
            socket.broadcast.emit('usedMem', (100 - ((data.free/data.total) * 100)).toFixed(2))
        })
        si.currentLoad(data=>{
            socket.broadcast.emit('usedCpu', data.currentload.toFixed(2))
        })
    }, 5000)
})


function formatBytes(a, b = 2) {
    if (0 === a) return "0 Bytes";
    const c = 0 > b ? 0 : b, d = Math.floor(Math.log(a) / Math.log(1024));
    return parseFloat((a / Math.pow(1024, d)).toFixed(c)) + " " + ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]
}

module.exports = socketapi;