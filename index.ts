import "./style.css";
import p5 from "p5";
import { Board, Direction, IFoundFour } from "./board";

let board: Board;
let fieldSize = 60;
let margin = 20;
let currentPlayer = 1;
let found: IFoundFour = null;

function setup(p: p5) {
  board = new Board(7, 6);

  p.createCanvas(
    margin * 2 + board.columns * fieldSize,
    margin * 2 + (board.rows + 1) * fieldSize
  );
}

function mouseClicked(p: p5) {
  if (!found && board.getStatus(getColumnFromMousePosition(),0) === 0) {
    board.addDisc(currentPlayer, getColumnFromMousePosition());
    found = board.findConnectedFour();

    if (currentPlayer===1) currentPlayer = 2;
    else currentPlayer = 1;
  }
}

function calculateX(col: number) {}

function calculateY(row: number) {}

function draw(p: p5) {
  p.background("pink");
  p.stroke("black");
  p.strokeWeight(1);

  // row = zeile
  // column = spalte
  // stoke = pinsel
  // fill = ausfüllen
  // rect = rectangle = Rechteck
  // margin = rand

  
  // draw board
  p.fill("orange");
  p.rect(
    margin,
    margin + fieldSize,
    board.columns * fieldSize,
    board.rows * fieldSize,
    5
  );

  // for-Schleife
  for (let row = 0; row < board.rows; row++) {
    for (let col = 0; col < board.columns; col++) {
      const status = board.getStatus(col,row);
      let color= "white";
      if (status === 1) color = "purple";
      else if (status===2) color = "darkblue";

      p.fill(color);
      p.circle(
        margin + col * fieldSize + fieldSize / 2,
        margin + row * fieldSize + fieldSize + fieldSize / 2,
        fieldSize * 0.6
      );
    }
  }

  if (!found)  {
    if (currentPlayer=== 1) p.fill("purple");
    else p.fill("darkblue");

    p.circle(
      margin + getColumnFromMousePosition() * fieldSize + fieldSize / 2,
      margin + fieldSize / 2,
      fieldSize * 0.6
    );
 }
  if (found)  {
    p.fill("lime");
    p.textSize(40);
    p.textAlign (p.CENTER, p.CENTER);
    p.text("Gewonnen!", p.width  / 2, p.height / 2);
  }
}

function getColumnFromMousePosition() {
  return Math.min(6, Math.max(0, Math.round((p.mouseX - margin - fieldSize / 2) / fieldSize)));
}

const p = new p5((p: p5) => {
  p.setup = () => setup(p);
  p.draw = () => draw(p);
  p.mouseClicked = () => mouseClicked(p);
  return p;
});
