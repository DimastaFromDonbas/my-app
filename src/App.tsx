import React, { useEffect, useState } from 'react';
import './App.css'
import BoardComponent from './components/BoardComponent';
import LostFigures from './components/LostFigures';
import Timer from './components/Timer';
import { Board } from './models/Board';
import { Colors } from './models/Colors';
import { Player } from './models/Player';

function App() {
  const [board, setBoard] = useState(new Board())

  const [ whitePlayer ] = useState(new Player(Colors.WHITE))
  const [ blackPlayer ] = useState(new Player(Colors.BLACK))
  const [ currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

  useEffect(() => {
    restart()
    setCurrentPlayer(blackPlayer)
    // eslint-disable-next-line
  },[]) // eslint-disable-next-line

  function restart() {
    const newBoard = new Board();
    newBoard.initCells()
    newBoard.addFigures()
    setBoard(newBoard)
  }

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.BLACK ? whitePlayer : blackPlayer)
  }

  return (
    <div className="app">
      <Timer swapPlayer={swapPlayer} restart={restart} currentPlayer={currentPlayer}/>
      <BoardComponent
       swapPlayer = {swapPlayer}
       currentPlayer = {currentPlayer}
       board = {board}
       setBoard = {setBoard}/>
      
       <div className='flex'>
        <LostFigures title={"Белые фигуры"} figures={board.lostWhiteFigures} />
       
        <LostFigures title={"Черные фигуры"} figures={board.lostBlackFigures} />
       </div>
    </div>
  );
}

export default App;
