import XSymbol from '../assets/x-symbol.svg';
import OSymbol from '../assets/circle-symbol.svg';
import style from './style.module.css';

interface BoardProps {
  board: Board;
  handleClick: (position: Position) => void;
}

export default function Board({ board, handleClick }: BoardProps) {
  return (
    <div className={style.board}>
      {board.map((row: BoardRow, i) => (
        <div key={i} className={style.row}>
          {row.map((cell, j) => (
            <span
              key={j}
              className={style.cell}
              onClick={() => handleClick([i, j])}
            >
              {cell === 1 ? (
                <img src={XSymbol} alt="X Symbol" className={style.symbol} />
              ) : cell === 0 ? (
                <img src={OSymbol} alt="O Symbol" className={style.symbol} />
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
