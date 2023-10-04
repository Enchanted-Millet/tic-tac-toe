import { useEffect, useState } from 'react';
import './App.css';
import Board from './Board';

function checkWinner(board, move) {
  if (!board) return;

  const size = board.length;

  const checkRow = row => row.every(cell => cell === row[0] && cell !== -1);
  const transpose = matrix => matrix[0].map((_, i) => matrix.map(row => row[i]));

  // check diagonals
  const diagonal1 = [];
  const diagonal2 = [];
  for (let i = 0; i < size; i++) {
    diagonal1.push(board[i][i]);
    diagonal2.push(board[i][size - i - 1]);
  }

  if (board.some(checkRow) || transpose(board).some(checkRow) || checkRow(diagonal1) || checkRow(diagonal2)) {
    return 'win';
  }
  if (move >= size * size) {
    return 'draw';
  }
}

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
        setBoard(new Array(size).fill(null).map(() => new Array(size).fill(-1)));
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
        <input type="number" placeholder="Board size" onKeyDown={handleInput} defaultValue={3} />
      </div>
      {board && <Board board={board} handleClick={handleClick} />}
    </>
  );
}

export default App;
