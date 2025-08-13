
let cells = document.querySelectorAll(".cell");
let statustext = document.querySelector("#statusText");
const restartbtn = document.querySelector("#restart");
let scorex = document.querySelector("#scoreX");
let scorey = document.querySelector("#scoreY");



let ScoreX= 0 ;
let ScoreY = 0 ; 

const wincondition = [
[0 , 1 , 2 ],
[3, 4 , 5 ],
[6 , 7 , 8 ],
[0 ,3 , 6 ],
[1 , 4 , 7 ], 
[2 , 5 , 8 ], 
[0 , 4 , 8 ], 
[ 2 , 4 , 6 ],
]; 

let options = ["" , "" , "",  "" , "" , "" , "", "", ""]; 
let currentPlayer="X" ;
let running = false ;

initialisegame();


function initialisegame(){
    cells.forEach((cell) => cell.addEventListener("click" , cellclicked));
    restartbtn.addEventListener("click" , restartgame);
    statustext.textContent = `C'est au tour de ${currentPlayer} `;
    running = true ; 
}
function cellclicked(){
    const cellindex = this.getAttribute("cellindex");

    if( options[cellindex] != "" || !running ){
        return 
    }

    updatecell(this , cellindex); 
     if ( options[cellindex] =="X"){
        ScoreX ++ ; 
        scorex.textContent =  `score player X : ${ScoreX} `;
     }else{
        ScoreY ++ ; 
        scorey.textContent =  `score player O : ${ScoreY} `;
     }
    checkwinner();

}

function updatecell (cell , index){
     options[index] = currentPlayer ;
     cell.textContent = currentPlayer ;
}


function changePlayer(){
    currentPlayer = (currentPlayer =="X") ? "0" : "X" ;
    statustext.textContent = `C'est au tour de ${currentPlayer} `;

}
function checkwinner(){ 
    let won = false ; 
    for ( let i = 0 ; i < wincondition.length ; i++){
        const condition = wincondition[i];
        const cellA = options[condition[0]]; 
        const cellB = options[condition[1]]; 
        const cellC = options[condition[2]]; 


         if ( cellA =="" || cellB =="" | cellC ==""){
            continue
         }
         if(cellA == cellB && cellB == cellC){
            won = true ; 
            break;
         }
         }

           if(won == true){
            statustext.textContent = `winner is ${currentPlayer} 🏆 `;
            running = false ; 
         }else if (!options.includes("")){
                statustext.textContent="Draw!";
                running=false ; 
            }else {
                changePlayer();
            }
}

function restartgame(){
      currentPlayer = "X";
      options = ["" , "" , "",  "" , "" , "" , "", "", ""]; 
      statustext.textContent = ` C'est au tour de ${currentPlayer} `; 
      cells.forEach(cell => cell.textContent="");
      running = true ; 
      ScoreX = 0 ; 
      ScoreY = 0 ; 
      scorex.textContent = `score player X : ${ScoreX} `;
      scorey.textContent = `score player Y : ${ScoreY} `;
}









