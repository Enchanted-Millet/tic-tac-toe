import { useEffect, useState, KeyboardEvent } from 'react';
import Board from './components/Board';
import { checkWinner } from './utils';
import { Status } from './types';

function App() {
  const [size, setSize] = useState(3);
  const [board, setBoard] = useState<Board>([[]]);
  const [currentPlayer, setCurrentPlayer] = useState(0); // 1 or 0
  const [move, setMove] = useState(0);
  const [status, setStatus] = useState<Status>(Status.Continue); // win or draw

  useEffect(() => {
    setBoard(new Array(size).fill(null).map(() => new Array(size).fill(-1)));
    setMove(0);
    setStatus(Status.Continue);
    setCurrentPlayer(0);
  }, [size]);

  useEffect(() => {
    setStatus(checkWinner(board, move));
    setCurrentPlayer(move % 2);
  }, [board, move]);

  useEffect(() => {
    if (status) {
      setTimeout(() => {
        alert(
          status === Status.Win
            ? `Player ${Number(!currentPlayer)} wins!`
            : 'Draw!'
        );
        setBoard(
          new Array(size).fill(null).map(() => new Array(size).fill(-1))
        );
        setCurrentPlayer(0);
        setMove(0);
        setStatus(Status.Continue);
      }, 10);
    }
  }, [status]);

  const handleInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLInputElement;
      if (+target.value < 3) {
        alert('Board size must be at least 3');
        return;
      }
      setSize(+target.value);
    }
  };

  const handleClick = ([x, y]: Position) => {
    if (board[x][y] !== -1) return;
    setBoard(prevBoard => {
      const newBoard = [...prevBoard];
      newBoard[x][y] = currentPlayer;
      return newBoard;
    });
    setMove(move + 1);
  };

  return (
    <div className="flex flex-col items-center m-20">
      <h1 className="text-5xl">Tic Tac Toe</h1>
      <div className="my-4">
        <input
          type="number"
          placeholder="Board size"
          onKeyDown={handleInput}
          defaultValue={3}
          className="border-0 rounded-md py-1.5 px-2 text-gray-100 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400"
        />
      </div>
      <Board board={board} handleClick={handleClick} />
      <h2 className="text-2xl mt-4 italic">Your turn, Player {move % 2}</h2>
    </div>
  );
}

export default App;
