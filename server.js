const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const { randId } = require('./utils');
//const { Socket } = require('dgram');
//const { static } = require('express');

const app = express();

const server = http.createServer(app);


//var io = require('socket.io').listen(server);

const io = socketio(server);



app.use(express.static(path.join(__dirname,'public')));
//var playerOne , playerTwo;
var turnid , t=1,warnn=0,  c=0 , sockid ,wait;
var t1 = 1 , t2 = 0 ;
var  snumber; // count for just counting no of turnovers to check console
const Roomss = {};
const turn = {
    playerOne : 0,
    playerTwo : 0,
    

};


//when client connects
io.on('connection', socket => {
    console.log('new connection formed');

    socket.emit('message' , 'we go on');

    socket.on('disconnect',() => {
        io.emit('message' , 'user disconnected');
    });
    socket.on("NewGame" , hndlNewGme); 
    socket.on("JoinGame" , hndlJnGame);

    var count = 0;

    //Listen for num
    socket.on('numclick' , (ele,id,number) =>{
        //var k =number;
        console.log(turn.playerOne ," this is one",turn.playerTwo,"this is two");
        
        if( number === 1 )//&& socket.number == 1) 
        {
            turn.playerOne = 1;
            console.log("first level  entered",number);
        
        }
        else 
        {
            turn.playerTwo = 1;
            console.log("first level  entered",number);
            }


        //console.log(turn);
        // if(turn.playerOne == 1 && turn.playerTwo == 0)
        //     io.to(Roomss[2]).emit("wait",snumber);
        // if(turn.playerOne == 0 && turn.playerTwo == 1)
        //     io.to(Roomss[1]).emit("wait",snumber);

        if(turn.playerOne == 1 && turn.playerTwo == 1){
            console.log("she entered",number,"\n");
            var frstenable = Roomss[wait];
            //io.to(frstenable).emit('release');
        
            var enable_id , disable_id , opp;
            snumber = socket.number;
            enable_id = Roomss[snumber] ;
            if(snumber == 1) opp =2;
            else opp =1 ;
            disable_id = Roomss[opp];
           // console.log(typeof(enable_id) , typeof(socket.id));

            io.to(enable_id).emit("d");
            io.to(disable_id).emit("e");

            io.emit('show',ele,id,snumber,turn);
            
            }
            else{
            // may - 7 - socket.emit("wait",snumber);
            io.to(Roomss[socket.number]).emit("wait",snumber);
            wait = socket.number;
            
        }
    });

    
    
    function hndlNewGme(){
        let roomid = randId(5);
        socket.number = 1;
        Roomss[socket.number] = socket.id;
        socket.join(roomid);
        
        socket.emit('gamecode' , roomid);
        socket.emit("turn" , socket.number);
        turn.playerOne = 0;
        turn.playerTwo=0;

        console.log(Roomss);
        
        //io.to(roomid).emit('roomjoined',roomid);
        
        
       

    };
    function hndlJnGame(gameCode){
                socket.emit('gamecode' , gameCode);
                turn.playerOne=0;
                turn.playerTwo=0;
                //console.log(gameCode);

                //console.log(io.sockets.adapter.rooms[gameCode]);
                var room;
                let numClints = 0;
                
                //io.sockets.adapter.rooms[gameCode] == undefined ? room = undefined : room = io.sockets.adapter.rooms.get(gameCode).size;
            if(gameCode.length == 5){
                room = io.sockets.adapter.rooms.get(gameCode);
                console.log(room);
                
                let allUsers
                if(room){
                    //allUsers=room.sockets;
                    numClints = room.size;
                }
                
                //allUsers = room;
                
                console.log(numClints);
                
            
            //if(numClints){
                    //numClints = Object.keys(allUsers).length;
                    //console.log(numClints);
                
                if(numClints === 0){
                    // socket
                    socket.emit("unknown");
                    return;
                }
                else if(numClints > 1){
                    //socket
                    socket.emit("toomany");
                    return;
                }
                
                    socket.join(gameCode);
                    socket.number = 2;
                    Roomss[socket.number] = socket.id;
                    socket.emit("turn" , socket.number);
                    console.log("socket no ",socket.number);
                    console.log(Roomss);
                    //console.log(gameCode);
                    //console.log(numClints , allUsers);

                
    }
            else{
                socket.emit("unknown");
            }
    }
    
        // Listen for gameover
        socket.on('gameover', (sock)=>{
        var lose;
        sock === 1 ? lose = 2 :lose = 1;
        var wnnr = Roomss[sock];
        var losr = Roomss[lose];
        console.log(wnnr,losr);
        io.to(losr).emit('gameoverrl' , sock);
        io.to(wnnr).emit('gameoverrw' , sock);
        turn.playerOne = 0 ;
        turn.playerTwo = 0;
        socket.conn.close();
        });

});

const PORT = process.env.PORT || 3000;


server.listen(PORT , () => console.log(`server is running on ${PORT}`));