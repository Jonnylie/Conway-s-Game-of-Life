import {
  createBoard,
  markTile,
  TILE_STATUSES
} from "./gameOfLife.js";

const BOARD_SIZE = 10;

const boardElement = document.querySelector(".board");
const startButton = document.querySelector(".start-btn")

boardElement.style.setProperty("--size", BOARD_SIZE);
const board = createBoard(BOARD_SIZE);
startButton.addEventListener('click', startGame)

board.forEach((row) =>
  row.forEach((tile) => {
    tile.element.addEventListener("click", () => {
      markTile(tile);
    });
    boardElement.append(tile.element);
  })
);

export function nearbyAliveCells(board, { x, y }) {
  const aliveCells = [];
  for (let xOffSet = -1; xOffSet <= 1; xOffSet++) {
    for (let yOffSet = -1; yOffSet <= 1; yOffSet++) {
      const tile = board[x + xOffSet]?.[y + yOffSet];
      if (xOffSet === 0 && yOffSet === 0)
        continue;
      if (tile && tile.status === TILE_STATUSES.ALIVE) {
        aliveCells.push(tile);
      }
    }
  }
  return aliveCells;
}

function startGame(){
  const nextIteration = []
  board.forEach((row) => {
    row.forEach((tile) => {
      const adjacentAliveCells = nearbyAliveCells(board, tile)
      if (tile.status === TILE_STATUSES.DEAD && adjacentAliveCells.length === 3){
        nextIteration.push({
          tile: tile,
          status: TILE_STATUSES.ALIVE
        })
      }

      if (tile.status === TILE_STATUSES.ALIVE && (adjacentAliveCells.length < 2 || adjacentAliveCells.length > 3)){
        nextIteration.push({
          tile: tile,
          status: TILE_STATUSES.DEAD
        })
      }
    });
  });
  console.log(nextIteration)
  nextIteration.forEach(({tile, status}) => {
    board[tile.x][tile.y].status = status
  })
}

