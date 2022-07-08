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

//   -----   FUNCTIONS  -----

const togglePlayer = () => {
  if(player == 1) {
    setPlayer(2);
  } else {setPlayer(1)}
}

const handleClick = (i, s) => {
  const row = i;
  const column = s;
  let newArr = [...pattern];
  if(newArr[row][column] === 0 && row==5 || newArr[row+1][column] !== 0) {
    newArr[row][column] = player;
    setPattern(newArr);
    togglePlayer();
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
}

  return (
    <div className="App">
      <h1>Connect 4</h1>
      <div id="player" style={{color: "var(--color"+player+")",}}>Player {player} turn</div>
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