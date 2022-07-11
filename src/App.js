import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {

//   -----   USE STATE  -----

const [player, setPlayer] = useState(1);
const [pattern, setPattern] = useState([
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
]);
const [gameState, setGameState] = useState("running");
const [winnerPlayer, setWinnerPlayer] = useState(0);

//   -----   FUNCTIONS  -----

const togglePlayer = () => {
  if(player == 1) {
    setPlayer(2);
  } else {setPlayer(1)}
}

const getLowestCase = (row, column) => {
  let newArr = [...pattern];
  let myRow = row;
  for(let i=row; i<6-row; i++) {
    if(newArr[i][column] === 0) {
      myRow = i;
    }
  }
  return myRow;
}

const handleClick = (i, s) => {
  const row = i;
  const column = s;
  let newArr = [...pattern];
  let lowestRow = row;
  if(newArr[row][column] === 0 && gameState === "running") { // if full below
    lowestRow = getLowestCase(row,column);
    newArr[lowestRow][column] = player;
    setPattern(newArr);
    togglePlayer();
    checkIfWin();
    console.log(checkIfWin())
  }
}

const onReset = () => {
  setPattern([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]);
  setPlayer(1);
  setGameState("running");
  setWinnerPlayer(0);
}

const checkIfWin = () => {
  const myPattern = [...pattern];
  var win = false;
  var winner = 0;
  const regex1 = /1,1,1,1/;
  const regex2 = /2,2,2,2/;

  // rows
  for(let i = 0; i < 6; i++) {
    if(regex1.test(myPattern[i])) {
      win = true;
      winner = 1;
    }
    if(regex2.test(myPattern[i])) {
      win = true;
      winner = 2;
    }    
  } // rows

  // columns
  for(let j = 0; j < 7; j++) {
    var myColumn = [];
    for(let i = 0; i < 6; i++) {
      myColumn.push(myPattern[i][j]);
    }
    if(regex1.test(myColumn)) {
      win = true;
      winner = 1;
    }
    if(regex2.test(myColumn)) {
      win = true;
      winner = 2;
    }    
  } // columns

  // for / diagonals
for(let k = 3; k < 9; k++) {
  var myDiagonal = [];
    for(let i = 0; i < myPattern.length; i++){
      let j =  (k - i);
      if(j>=0 && j < 7) {
        myDiagonal.push(myPattern[i][j]);
      } // if
   }; // i

    if(regex1.test(myDiagonal)) {
      win = true;
      winner = 1;
    }
    if(regex2.test(myDiagonal)) {
      win = true;
      winner = 2;
    }   
} // k

// for \ diagonals
for(let k = -2; k < 4; k++) {
  var myDiagonal = [];
    for(let i = 0; i < myPattern.length; i++){
      let j =  (k + i);
      if(j>=0 && j < 7) {
        myDiagonal.push(myPattern[i][j]);
      } // if
   }; // i
    if(regex1.test(myDiagonal)) {
      win = true;
      winner = 1;
    }
    if(regex2.test(myDiagonal)) {
      win = true;
      winner = 2;
    }   
} // k

  if(win) {
    setGameState("won");
    setWinnerPlayer(winner);
  }
}

  return (
    <div className="App">
      <h1> {gameState === "running" ? "connect4" : "player " + winnerPlayer + " won !"} </h1>
      <div id="player" style={{color: "var(--color"+player+")", visibility: gameState === "won" ? "hidden" : "visible",}}>Player {player} turn</div>
      <div id="resetbutton" onClick={onReset}>Reset</div>
      <div id="gameboard">
      <>
    {pattern.map((row, i)=>{
        return  (
        <div className="row">
        {pattern[i].map((d, j) =>
        <div className="case" style={{backgroundColor: "var(--color"+pattern[i][j]+")",}} key={i + j} i={i} j={j} onClick={() => {handleClick(i, j);}}>
        </div>
        )}
        </div>
        )})}    
    </>

      </div>
    </div>
  );
}

export default App;