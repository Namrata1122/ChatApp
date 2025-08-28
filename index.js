const express = require('express');
const {createServer} = require('node:http');
const {join} = require('node:path');
const {Server} = require('socket.io');

const createDatabase = require("./db/createdb")

(async ()=>{
    await createDatabase().catch((err)=>{
        console.error("error creating database",err);
    })
})
const initDb = require('./db/pgdbinit');

(async()=>{
    await initDb().catch((err)=>{
        console.log("error initializing schemas",err);
    });
})()

const app = express();
const server = createServer(app);
const io = new Server(server,{connectionStateRecovery:{}});

const users = require('./routes/usersRoutes');
// const messages = require('./routes/messageRoutes');

app.use(express.json())
// by default express does not serve static files so we need to explicitly tell it to serve static files like html and css
app.use(express.static('public'));

app.use('/users',users);
// app.use('/messages',messages);

app.get('/',(req,res)=>{
    res.sendFile(join(__dirname+'/public/index.html'));
});

io.on('connection',(socket)=>{
    console.log('a user connected');

    socket.on('disconnect',()=>{
        console.log('user disconnected');
    });

    socket.on('chat message',(msg)=>{
        io.emit('chat message',msg);//sending message to everyone including the sender
        // socket.broadcast.emit('chat message',msg); // sending msg to everyone except the sender
    });
});

const port = 3000;

server.listen(port,()=>console.log(`Server is listening on port ${port}...`));