import { useEffect, useState } from 'react';
import Board from './components/Board';
import { checkWinner } from './utils';

import './App.css';

function App() {
  const [size, setSize] = useState(3);
  const [board, setBoard] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(0); // 1 or 0
  const [move, setMove] = useState(0);

  useEffect(() => {
    setBoard(new Array(size).fill(null).map(() => new Array(size).fill(-1)));
  }, [size]);

  useEffect(() => {
    const win = checkWinner(board, move);
    if (win) {
      setTimeout(() => {
        alert(win === 'win' ? `Player ${currentPlayer} wins!` : 'Draw!');
        setBoard(
          new Array(size).fill(null).map(() => new Array(size).fill(-1))
        );
        setCurrentPlayer(0);
        setMove(0);
      }, 10);
    } else {
      setCurrentPlayer(Number(!currentPlayer));
    }
  }, [board]);

  const handleInput = e => {
    if (e.key === 'Enter') {
      if (e.target.value < 3) {
        alert('Board size must be at least 3');
        return;
      }
      setSize(+e.target.value);
    }
  };

  const handleClick = ([x, y]) => {
    if (board[x][y] !== -1) return;
    setBoard(prevBoard => {
      const newBoard = [...prevBoard];
      newBoard[x][y] = currentPlayer;
      return newBoard;
    });
    setMove(move + 1);
  };

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <div>
        <input
          type="number"
          placeholder="Board size"
          onKeyDown={handleInput}
          defaultValue={3}
        />
      </div>
      {board && <Board board={board} handleClick={handleClick} />}
    </>
  );
}

export default App;
