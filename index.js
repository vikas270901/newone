const path = require("path");
const express = require("express");
const app = express();
const http = require("http");
const socketio =require("socket.io");
const server = http.createServer(app)
const io = socketio(server);
const public = path.join(__dirname, 'public');
// console.log(public);
app.use(express.static(public));
const port = process.env.PORT||2005;
app.set('view engine', 'html');

let count=0;

app.get("/", (req, res)=>{
    res.sendFile(__dirname+'/public/client.html');
});
io.on("connection", (socket)=>{
    // res.sendFile(client);
    count++;
    io.emit("counter", count);
    socket.broadcast.emit('message', 'A new user joined now...')
    // console.log("connection successful, total = "+ count);

    socket.on("message", (data,callback)=>{
        // console.log(data);
        io.emit("sendMessage", data);
        // callback("message delivered...")
    })
    socket.on("coordinates",(link)=>{
        io.emit("link", link);
    })
    socket.on("disconnect", (socket)=>{
        count = count-1;
        io.emit("left", count);
    })
});

server.listen(port, ()=>{
    console.log("server started...")
});