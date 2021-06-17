//const { reset } = require("nodemon");

//const { randId } = require("../../utils");
const socket = io();
const Codedisp      = document.getElementById("Code");
const initialScreen = document.getElementById("initialscreen");
const gameScreen    = document.getElementById("gamescreen");
const Newbtn        = document.getElementById("NewGmebtn");
const Gamecode      = document.getElementById("GmeCodeIN");
const Joinbtn       = document.getElementById("JoinGmebtn");
const showTurn      = document.getElementById("showTurn");
const Wonscreen  = document.getElementById("wonscreen");
const Losescreen  = document.getElementById("losescreen");
const Result        = document.getElementById("Result");
const Jumbotron        = document.getElementById("jumbotron");
//const bunty         = document.getElementById("bunty");
var enable = document.getElementsByClassName("btttn");



var game , player , turnidd;

/*bunty.addEventListener('click' , () => {
    bunty.setAttribute('disabled' , 'disabled');
    console.log("katam");

});*/

socket.on('gamecode', DispGameCode);
socket.on('unknown',  UnknownCode);
socket.on('toomany',  TooManyPlayers);
socket.on('roomjoined' , roomjoin);
socket.on('wait', hndlwait);
socket.on('release',()=>{
    for(var i=0 ; i<enable.length ; i++){
        enable[i].disabled = false;
    }
    showTurn.innerText = " Your's Turn";
})
socket.on('e',() =>{
    //table').prop('disabled', false );
    //table.disabled = false;
    for(var i=0 ; i<enable.length ; i++){
        enable[i].disabled = false;
    }
    
    showTurn.innerText = " Your's Turn";
    //alert("its urs turn ");

});
socket.on('d',() =>{
    //$('table').prop('disabled', true );
    for(var i=0 ; i<enable.length ; i++){
        enable[i].disabled = true;
    }
    showTurn.innerText = " Opponet's Turn";
    //alert("its opp turn");
});

// on new game or join game
socket.on('turn', (number) =>{
    player = number;//
});
/*ocket.on('turnid' , (turnid,warnn,number) =>{
     turnidd = turnid;
     if(warnn == 1){
         alert("Its not urs turn its his"+number);
     }
});*/
//socket.on('originalturn', ()=>{
 //   alert('its his turn');
//socket.on('warn' , (number) =>{
    //alert("Its his turn : "+number);
//});

Newbtn.addEventListener("click" , NewGame);
Joinbtn.addEventListener("click" , JoinGam);


function NewGame(){
    socket.emit("NewGame");
    disp();
    
};
function JoinGam(){
    const gamecod = Gamecode.value;
    socket.emit("JoinGame" , gamecod);
    disp();
};




function disp(){
    initialScreen.style.display="none";
    gameScreen.style.display="block";
    // if(Wonscreen.style.display == "block" && Losescreen.style.display == "block")
    // {
    //     Wonscreen.style.display = "none";
    //     Losescreen.style.display = "none";
    // }
    
}




socket.on('message', message =>{
    console.log(message);
});

socket.on('show',(ele,id,number,turn) =>{
    //player = number;
    highlight(ele,id,game,number,turn);
    
});

socket.on('gameoverrw', (sock) => {
    //alert(" Gameover Player :  "+sock+" wins");
    //location.reload();
    gameScreen.style.display = "none";
    Jumbotron.style.display = "none";
    Wonscreen.style.display = "block";
    Losescreen.style.display = "none";
    //p.innerHTML=sock,"won";
    //Result.innerHTML = "You won the game!!!";//,sock;
    
});
socket.on('gameoverrl', (sock) => {
    //alert(" Gameover Player :  "+sock+" wins");
    //location.reload();
    gameScreen.style.display = "none";
    Jumbotron.style.display = "none";
    Losescreen.style.display = "block";
    Wonscreen.style.display = "none";
    //p.innerHTML=sock,"loose";
    //Result.innerHTML = "You lose the game!!!";//,sock;
    
    
});



var pre=1;
var winner=[[0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0]],
    winner1=[[0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0]];
var bingo=[0,0,0,0,0,0,0,0,0,0,0,0]; 


//const tbl_val = document.getElementById('table');

//tbl_val.addEventListener('click' , () => {
                  
        function num(ele,id){
            console.log("id is",id)
                        var num=id
                        var num1,num2;
                        if(num>9){
                         num2=num%10;
                        //if(num0>=5)
                        //num0=num0-5;
                        num=Math.floor(num/10);
                         num1=num;}
                        else {
                            num1=0;
                            num2=id;
                        }
                        console.log(ele);
                        
                        console.log(num1);
                        console.log(num2);
                        
            

            
            if(pre<=25){
                //document.getElementById("table").setAttribute("disabled","disabled");
                if(ele.value == 0){
                ele.innerHTML=pre;
                ele.value=pre;
                pre=pre+1;
                //var Val=event.target;
                //console.log(Val);
                winner[num1][num2]=ele.innerHTML;
                for(i=0;i<5;i++)
                for(j=0;j<5;j++)
                console.log(winner[i][j]);}
                //id.setAttribute("aria-pressed") === "true";
        }
            else{
                //highlight(ele,id)
                
                var tnum =  ele.innerHTML;
                
                // socket
                //if(ele.querySelector('.highlight') == null || ele.querySelector('.highlight2') == null)
                if(ele.classList.contains('highlight3') || ele.classList.contains('highlight2')){}
                else socket.emit('numclick' , tnum,id,player);
                        

            }

        }
            var key=1;
            var k,l;

        function highlight(ele,id,game,number){
            var checkrow=1,checkcol=1,checkdiagonal=1,checkrdiagonal=1;
           // console.log(typeof ele.value);
            console.log(id , ele);
            var equal = ele.innerHTML;
            console.log("equal = ",equal);
            for(i=0;i<5;i++){
                for(j=0;j<5;j++){
                    if(winner[i][j] == ele){
                        if(i!=0)
                            var indexx = (i)*10+j;
                        else
                            var indexx = i*10+j;
                            //indexx = (("0"+ indexxx).slice(-2));
                            k=i;
                            l=j;

                            break;}
                    
                    }}
                    /*onsole.log(indexx,typeof indexx);
                    console.log('same');*/
                    //console.log('k,l values');
                    //console.log(k,l);
                    var idd = document.getElementById(indexx);
                    console.log(idd);

                    //socket.emit('turnover',player);
                    // Turn over among players
                   /*console.log("turn idd");
                    console.log(player);
                    console.log("number");
                    console.log(number);
                    console.log(turn);*/
                    

                    var turn1 = 0 , turn2 = 0;
                    //if( player == number){
                        if(number == 1){
                        //if(turn.turnn.playerOneTurn == true){
                    
                            idd.classList.add('highlight3');
                                //turn.turnn.playerOneTurn == false;}
                                //turn1 = 1;
                                //turn2 = 0;
                            
                            }
                            //else if(number == 2)// && player == 1){{}
                           //socket.emit('turnover',number);
                           else if(number ==2){
                           //else if(turn.turnn.playerTwoTurn == true){
        
                            idd.classList.add('highlight2');
                    
                    //else{
                        
                   // }
                    
                    //turn.playerTwo.playerTwoTurn == false;
                   // turn2 = 1;
                    //turn1 = 0;
                    }
                    //else if(number === 1 && player != 1) alert("his turn"+player);
                    //else alert("his turn"+player);
                                   
                    winner1[k][l]=1;
                    console.log("winner array \n");
                       for(i=0;i<5;i++)
                        for(j=0;j<5;j++)
                        console.log(winner1[i][j]);
                        
                        for(let i=0;i<5;i++)
                        {
                            for(let j=1;j<=5;j++)
                            {
                                if(winner1[i][j-1] != 1){
                                    checkrow=0;
                                }
                            if(winner1[j-1][i] != 1)
                               checkcol=0;
                            }
                            for(let k=1;k<=5;k++){
                                if(winner1[k-1][k-1] != 1)
                              checkdiagonal=0;
                            }
                            let k=0;
                            for(let l=5;l>2;l--)
                            { 
                            
                                if(winner1[k][l-1] != 1)
                                checkrdiagonal=0;
                                k++;
                            }
                                if(checkrow == 1)
                                 bingo[i]=1;
                                if(checkdiagonal == 1) 
                                    bingo[10]=1;
                                if(checkcol == 1 )
                                    bingo[i+5]=1;  
                                if(checkrdiagonal == 1)
                                    bingo[11]=1;      
                                 checkcol=1;
                                 checkrow=1;
                                 checkdiagonal=1;
                                 checkrdiagonal=1;
                        }
                        
                        console.log(bingo);
                        //socket.emit('bingolist',bingo);
                    
                        
                        
                           var sum = bingo.reduce((a,b) => a+b,0);
                           for(i=0;i<sum;i++){
                               var Bindex = "00";
                               Bindex=Bindex+i;
                               var color = document.getElementById(Bindex);
                               console.log("bindex val",Bindex);
                                color.classList.add('highlight1')
                           }
                           if(sum === 5){
                               // socket
                                 socket.emit('gameover',player);
                                 console.log(number );
                           }}

                           /*alert("Bingo You are winner !!! Start New game");
                           location.reload();}
                           console.log(sum);
                           console.log(id+" set is"+winner[id]);}*/
        
    
                    function newgame(){
                        if(confirm("Entire Game will be lost!!!")){
                            location.reload();
                        }}
                        function newgame1()
                            {location.reload();}
                    function DispGameCode(roomid){
                        game = roomid;
                        //console.log(roomid);
                        Codedisp.innerText = roomid;
                    }
                    function UnknownCode(){
                        resett();
                        alert("Invalid Game Code");
                    }
                    function TooManyPlayers(){
                        resett();
                        alert("Two Players are already playing");
                    }
                    function resett(){

                        Gamecode.value = null;
                        Codedisp.innerText = null;
                        initialScreen.style.display="block";
                        gameScreen.style.display="none";
    
                    }
                    function roomjoin(roomid){
                        alert(roomid);
                    }
                    function hndlwait(number){
                        var no;
                        if(number == 1)
                        no=2;
                        else no=1;

                        alert("wait for the other"+no);
                        //if(player == 1){
                    for(var i=0 ; i<enable.length ; i++){
                        enable[i].disabled = true;
                    }
                    showTurn.innerText = " Wait for the opponent";
                

                    }

                //     #resultscreen{
                //         color  :#ececec;
                //        align-items : center;
                //        align-content: center;
                //    }