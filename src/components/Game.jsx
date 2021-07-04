import React, { useState } from 'react';
import '../styles/game.css';

function Game() {
  let size = 10;
  let matrix = [];
  let cont = 0;
  for (var i = 0; i < size; i++) {
    matrix[i] = [];
    for (var j = 0; j < size; j++) {
      matrix[i][j] = {
        x: i,
        y: j,
        u: false,
        r: false,
        b: false,
        l: false,
        content: cont++,
      };
    }
  }
  const [grid, setGrid] = useState(matrix);
  const [turn, setTurn] = useState(true);
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  /*
  const [reset, setReset] = useState(false);
  const [winner, setWinner] = useState(0); */

  const surround = (cell, pos, copy) => {
    let x = cell.x;
    let y = cell.y;
    let keep = false;
    let red = 0;
    let green = 0;

    switch (pos) {
      case 'u':
        copy[x][y].u = turn ? 1 : 2;
        if (x === 0) {
        } else {
          copy[x - 1][y].b = turn ? 1 : 2;
          if (
            copy[x - 1][y].u &&
            copy[x - 1][y].r &&
            copy[x - 1][y].b &&
            copy[x - 1][y].l
          ) {
            copy[x - 1][y].content = turn ? 'R' : 'G';
            keep = true;
          }
          if (copy[x][y].u && copy[x][y].r && copy[x][y].b && copy[x][y].l) {
            copy[x][y].content = turn ? 'R' : 'G';
            keep = true;
          }
        }
        break;
      case 'l':
        copy[x][y].l = turn ? 1 : 2;
        if (copy[x][y].u && copy[x][y].r && copy[x][y].b && copy[x][y].l) {
          copy[x][y].content = turn ? 'R' : 'G';
          keep = true;
        }
        break;
      case 'b':
        copy[x][y].b = turn ? 1 : 2;
        if (copy[x][y].u && copy[x][y].r && copy[x][y].b && copy[x][y].l) {
          copy[x][y].content = turn ? 'R' : 'G';
          keep = true;
        }
        break;
      case 'r':
        copy[x][y].r = turn ? 1 : 2;
        if (y === 0) {
        } else {
          copy[x][y - 1].l = turn ? 1 : 2;
          if (
            copy[x][y - 1].u &&
            copy[x][y - 1].r &&
            copy[x][y - 1].b &&
            copy[x][y - 1].l
          ) {
            copy[x][y - 1].content = turn ? 'R' : 'G';
            keep = true;
          }
          if (copy[x][y].u && copy[x][y].r && copy[x][y].b && copy[x][y].l) {
            copy[x][y].content = turn ? 'R' : 'G';
            keep = true;
          }
        }
        break;
      default:
    }

    for (var i = 0; i < size; i++) {
      for (var j = 0; j < size; j++) {
        if (copy[i][j].content === 'R') red++;
        if (copy[i][j].content === 'G') green++;
      }
    }

    setRed(red);
    setGreen(green);

    if (!keep) setTurn(!turn);
    return copy;
  };

  const handleRigthClick = (cell, pos) => {
    switch (pos) {
      case 'u':
        if (!cell.u) setGrid(surround(cell, pos, [...grid]));
        break;
      case 'l':
        if (!cell.l) setGrid(surround(cell, pos, [...grid]));
        break;
      case 'b':
        if (!cell.b) setGrid(surround(cell, pos, [...grid]));
        break;
      case 'r':
        if (!cell.r) setGrid(surround(cell, pos, [...grid]));
        break;
      default:
    }
  };

  return (
    <div className='grid'>
      {grid.map((row, i) => (
        <div key={i}>
          {row.map((col, j) => (
            <div key={j} className='d-inline-flex'>
              <div
                className={
                  typeof col.content === 'number'
                    ? 'cont'
                    : `cont ${col.content}`
                }
              >
                <div
                  className={
                    col.u === 1
                      ? 'd1 p1'
                      : col.u === 2
                      ? 'd1 p2'
                      : turn
                      ? 'd1 ho1'
                      : 'd1 ho2'
                  }
                  onClick={() => {
                    handleRigthClick(col, 'u');
                  }}
                ></div>
                <div
                  className={
                    col.l === 1
                      ? 'd2 p1'
                      : col.l === 2
                      ? 'd2 p2'
                      : turn
                      ? 'd2 ho1'
                      : 'd2 ho2'
                  }
                  onClick={() => {
                    handleRigthClick(col, 'l');
                  }}
                ></div>
                <div
                  className={
                    col.b === 1
                      ? 'd3 p1'
                      : col.b === 2
                      ? 'd3 p2'
                      : turn
                      ? 'd3 ho1'
                      : 'd3 ho2'
                  }
                  onClick={() => {
                    handleRigthClick(col, 'b');
                  }}
                ></div>
                <div
                  className={
                    col.r === 1
                      ? 'd4 p1'
                      : col.r === 2
                      ? 'd4 p2'
                      : turn
                      ? 'd4 ho1'
                      : 'd4 ho2'
                  }
                  onClick={() => {
                    handleRigthClick(col, 'r');
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      ))}
      <h2 className='turn'>
        Turn of
        <span className={turn ? 'j1' : 'j2'}> {turn ? 'RED' : 'GREEN'}</span>
        <br />
      </h2>
      <h2 className='turn'>
        Red: <span className='j1'>{red}</span> Green:{' '}
        <span className='j2'>{green}</span>
      </h2>
    </div>
  );
}

export default Game;
