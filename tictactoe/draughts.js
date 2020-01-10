
//Let's imagine that we are building a game of Tic Tac Toe. What kinds of prototype functions and properties would we need as well?
//so first off object for 3*3 grid



var winningSets = [[9,8,7],[6,5,4],[3,2,1],[1,5,9],[7,5,3],[1,4,7],[2,5,8],[3,6,9]];
winningSets.sort();
for(i=0;i<winningSets.length;i++){
winningSets[i].sort();
}

var container = document.getElementById("container")
var rowBlock = document.getElementsByClassName("rowBlock")
var columnBlock = document.getElementsByClassName("columnBlock")
var wonCalc = 0;
function TwoDimensional(arr, size) 
    {
      var res = []; 
      for(var i=0;i < arr.length;i = i+size)
      res.push(arr.slice(i,i+size));
      return res;
    }


var player = {
  xTurn :true,
oTurn:false
} 
var inUse = false;
var game = {
  gameWon: function(win){
    for(i=0;i<columnBlock.length;i++){
    columnBlock[i].innerText="";
    }
  game.usedSquares=[];
  rowCoords=[];
  game.p1Squares=[];//if any player1 squares are in a different row
  game.p2Squares=[];//if any player1 squares are in a different row
 if(win==true){
   if(player.xTurn==true){
 


return window.alert("Game Over You Has won player one of the X");
   }
   else{
    return window.alert("Game Over You Has won player two of the O");

   }
 }
else return window.alert("Game over Restarting ");
  },
  startingSquares :[],
  usedSquares:[],
  rowCoords:[],
  isGameOver: function(){
    if(game.startingSquares.length==game.usedSquares.length&&game.usedSquares.length!=0)
  {
    setTimeout(function(){      game.gameWon(false);
    }, 200);

    }
  },
  squareInuse : function(eventId){
    if(game.usedSquares.indexOf(+eventId)!=-1){

return  inUse =true;
    }
    else{
      return  inUse =false;

    }
  },
p1Squares:[],//if any player1 squares are in a different row
p2Squares:[],



  checkIfWinner: function(){
//deleted  my solution come with new one tomorrow--lmao! that didnt happen kinda done one scuff as all hell

for(i=0;i<winningSets.length;i++){
  game.p1Squares.sort();
  game.p2Squares.sort();

  var count1= 0;
  var count2= 0;
//reall badd needs fixing
  for(j=0;j<game.p1Squares.length;j++){//wont work as game continues btw
   if (winningSets[i].indexOf(game.p1Squares[j])!=-1){
     
     count1++;
     console.log("count is " +count1);
     if(count1===3){
      console.log("count is " +count1);

console.log("x won" + game.p1Squares);
      return game.gameWon(true);
  
     }
    
     }
  }
  for(j=0;j<game.p2Squares.length;j++){//wont work as game continues btw

     if(winningSets[i].indexOf(game.p2Squares[j])!=-1){
  count2++;
  if(count2===3){
    console.log("count is " +count1);

    console.log("o won " + game.p2Squares);

   return game.gameWon(true);
     }

   }



}
 

  }
  

}
}

   
   

  



var count=0;
var newArray=[];
//for(x=0;x<newThing.length;x++){

for(i=0;i<game.startingSquares.length/3;i++){
    count+=3;

   newArray.push(game.startingSquares.slice(i*3,count));
}

for(x=0;x<newArray.length;x++){

for(i=0;i<newArray.length;i++){
  newArray[i][x]= newArray[i][x] +1;
}

}
//makes the rows for me


grid();
function grid(){
makeRow(3);
makeCol(3);
}
function makeRow(amount){
for(i=0;i<amount;i++){
  var row = document.createElement("div");
  row.className="rowBlock"
  container.appendChild(row);


}


return row;
}
function makeCol(amount){
for(i=0;i<rowBlock.length;i++){
  for(a=0;a<amount;a++){
  var columnBlock = document.createElement("div");
  columnBlock.className= "columnBlock"
  rowBlock[a].appendChild(columnBlock);


  }


}
}








window.onload= function(){



  for(i=0;i<rowBlock.length;i++){

rowBlock[i].setAttribute("id", i);
game.rowCoords.push(+rowBlock[i].id);
console.log("pz work");
}

  for(i=0;i<columnBlock.length;i++){
    columnBlock[i].setAttribute("id", i);
    game.startingSquares.push(+columnBlock[i].id);
    
  }
 
  


  document.body.onclick = function(e) {   //when the document body is clicked

    game.squareInuse(event.srcElement.id);
if(inUse==true){

  return ;
} 






    if (window.event) {
        e = event.srcElement;           //assign the element clicked to e (IE 6-8)
       
    }
    else {
        e = e.target;                   //assign the element clicked to e
    }

    if (e.className && e.className.indexOf('columnBlock') != -1)
  
     {

      
       
       if(player.xTurn){
         
        //if the element has a class name, and that is 'someclass' then...
        var p = document.createElement("p");
        var node = document.createTextNode("X");
        p.appendChild(node);

   columnBlock[event.srcElement.id].appendChild(p);
  
   game.usedSquares.push(+event.srcElement.id)
   game.p1Squares.push(+event.srcElement.id+1)
   game.isGameOver();

   if( game.p1Squares.length>=3){
    setTimeout(function(){    game.checkIfWinner(); }, 100);
  }
  setTimeout(function(){
      player.xTurn = false;
    player.oTurn=true;    }, 200)
 
       }
       
       else if(player.oTurn){
        var p = document.createElement("p");
        var node = document.createTextNode("O");
        p.appendChild(node);

   columnBlock[event.srcElement.id].appendChild(p);

   game.usedSquares.push(+event.srcElement.id)
   game.p2Squares.push(+event.srcElement.id+1)
   game.isGameOver();

   if( game.p2Squares.length>=3){
             setTimeout(function(){    game.checkIfWinner(); }, 100);


   }
   setTimeout(function(){ 
  player.xTurn = true;
    player.oTurn=false;   }, 200)
 
       }

  
       }

    }

  }

 


function startGame(){




}

/*
  document.onclick= function(e){
   e=window.event? event.srcElement: e.target;
   if(e.className && e.className.indexOf('columnBlock')!=-1)


}
*/
