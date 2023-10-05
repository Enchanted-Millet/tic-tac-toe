export function checkWinner(
  board: Board,
  move: number
): 'win' | 'draw' | undefined {
  if (!board) return;

  const size = board.length;

  const checkRow = (row: BoardRow) =>
    row.every(cell => cell === row[0] && cell !== -1);
  const transpose = (matrix: Board) =>
    matrix[0].map((_, i) => matrix.map(row => row[i]));

  // check diagonals
  const diagonal1 = [];
  const diagonal2 = [];
  for (let i = 0; i < size; i++) {
    diagonal1.push(board[i][i]);
    diagonal2.push(board[i][size - i - 1]);
  }

  if (
    board.some(checkRow) ||
    transpose(board).some(checkRow) ||
    checkRow(diagonal1) ||
    checkRow(diagonal2)
  ) {
    return 'win';
  }
  if (move >= size * size) {
    return 'draw';
  }
}
