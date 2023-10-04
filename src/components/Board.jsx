import PropTypes from 'prop-types';
import XSymbol from '../assets/x-symbol.svg';
import OSymbol from '../assets/circle-symbol.svg';
import style from './style.module.css';

export default function Board({ board, handleClick }) {
  return (
    <div className={style.board}>
      {board.map((row, i) => (
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

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  handleClick: PropTypes.func.isRequired
};
