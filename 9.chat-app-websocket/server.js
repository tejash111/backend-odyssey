const express=require('express')
const http=require('http')
const socketIo = require('socket.io')

const app=express()

const server=http.createServer(app)

//initiate socket.io and attach this to the http server
const io=socketIo(server);

app.use(express.static('public'))
 
const users = new Set();

io.on("connection",(socket)=> {
    console.log("A user is now connected");

    //handle users when they join the chat
    socket.on('join',(userName)=>{
        users.add(userName)
        socket.userName = userName;

        //brodcase to all clients/users that a new user has joined
        io.emit('userJoined',userName)

        //sent the updated user list to all clients
        io.emit('userList',Array.from(users))
    })
    
    //handle incoming chat message
    socket.on('chatMessage',(message)=>{
        //brodcast the recived message to conncected clients
        io.emit("chatMessage",message)
    })

    //hnadle user dissconnected
    socket.on("disconnect",()=>{
        console.log(`an user is dissconnected`);

        users.forEach(user=>{
            if (user === socket.userName){
                io.emit('userLeft',user)

                io.emit('userList',Array.from(users))
            }
        })
        
    })
    
})

const PORT =3000;

server.listen(PORT,()=>{
    console.log("serveris now running");
    
})