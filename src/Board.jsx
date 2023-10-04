import PropTypes from 'prop-types';
import XSymbol from './assets/x-symbol.svg';
import OSymbol from './assets/circle-symbol.svg';

export default function Board({ board, handleClick }) {
  return (
    <div className="board">
      {board.map((row, i) => (
        <div key={i} className="row">
          {row.map((cell, j) => (
            <span key={j} className="cell" onClick={() => handleClick([i, j])}>
              {cell === 1 ? (
                <img src={XSymbol} alt="X Symbol" className="symbol" />
              ) : cell === 0 ? (
                <img src={OSymbol} alt="O Symbol" className="symbol" />
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
