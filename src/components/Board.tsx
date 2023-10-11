import XSymbol from '../assets/x-symbol.svg';
import OSymbol from '../assets/circle-symbol.svg';

interface BoardProps {
  board: Board;
  handleClick: (position: Position) => void;
}

export default function Board({ board, handleClick }: BoardProps) {
  return (
    <div className="flex flex-col w-[500px] h-[500px]">
      {board.map((row: BoardRow, i) => (
        <div key={i} className="flex flex-1">
          {row.map((cell, j) => (
            <span
              key={j}
              className="flex flex-1 justify-center items-center border-2 border-sky-800 cursor-pointer"
              onClick={() => handleClick([i, j])}
            >
              {cell === 1 ? (
                <img src={XSymbol} alt="X Symbol" className="w-3/4" />
              ) : cell === 0 ? (
                <img src={OSymbol} alt="O Symbol" className="w-4/5" />
              ) : (
                ''
              )}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
