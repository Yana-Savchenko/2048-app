$(document).ready(function () {
  let gameSpace = [];
  let isFieldChanged = false;
  let isStart = true;
  let counter = 0;
  initialize();


  $(".new-game").click(() => {
    isStart = true;
    $(document).unbind('keydown', move);
    initialize();
  })
  function initialize() {
    for (let i = 0; i < 4; i++) {
      gameSpace[i] = new Array();
      for (var j = 0; j < 4; j++) {
        gameSpace[i][j] = 0;
      }
    }
    counter = 0;
    $(".game-over").css("opacity", "0");
    $(".game-win").css("opacity", "0");
    // gameSpace[1][1] = 1024;
    // gameSpace[1][2] = 1024;
    // gameSpace[1][3] = 1024;
    // gameSpace[2][2] = 2048;
    createNewCell();
    createNewCell();
    $(document).bind('keydown', event, move);
    render();
    isStart = false;
  }

  function move(e) {
    switch (e.keyCode) {
      case (37): {
        // gameSpace[1][1] = 2048;
        moveLeft();
        break;
      }
      case (38): {
        moveUp();
        break;
      }
      case (39): {
        moveRight();
        break;
      }
      case (40): {
        moveDown();
        break;
      }
    }
  }

  function moveLeft() {
    for (let i = 0; i < 4; i++) {
      let row = getRow(i)
      let newRow = getFullCells(row);
      for (let j = newRow.length - 1; j > 0; j--) {
        if (newRow[j] === newRow[j - 1] && newRow[j - 1]) {
          newRow[j - 1] = newRow[j] * 2;
          counter += newRow[j - 1];
          newRow[j] = 0;
          j--;
        }

      }
      newRow = getFullCells(newRow);
      while (newRow.length < 4) {
        newRow.push(0);
      }
      gameSpace[i] = newRow;
      for (let i = 0; i < 4; i++) {
        if (row[i] !== newRow[i]) {
          isFieldChanged = true;
        }
      }
    }
    render();
  }

  function moveRight() {
    for (let i = 0; i < 4; i++) {
      let row = getRow(i)
      let newRow = getFullCells(row);
      for (let j = 0; j < newRow.length - 1; j++) {
        if (newRow[j] === newRow[j + 1] && newRow[j + 1]) {
          newRow[j + 1] = newRow[j] * 2;
          counter += newRow[j + 1]
          newRow[j] = 0;
          j++;
        }
      }
      newRow = getFullCells(newRow);
      while (newRow.length < 4) {
        newRow.unshift(0);
      }
      gameSpace[i] = newRow;
      for (let i = 0; i < 4; i++) {
        if (row[i] !== newRow[i]) {
          isFieldChanged = true;
        }
      }
    }
    render();

  }

  function moveUp() {
    for (let i = 0; i < 4; i++) {
      let column = getColumn(i);
      let newColumn = getFullCells(column);
      for (let j = newColumn.length - 1; j > 0; j--) {
        if (newColumn[j] === newColumn[j - 1] && newColumn[j - 1]) {
          newColumn[j - 1] = newColumn[j] * 2;
          counter += newColumn[j - 1];
          newColumn[j] = 0;
          j--;
        }
      }
      newColumn = getFullCells(newColumn);
      while (newColumn.length < 4) {
        newColumn.push(0);
      }
      for (let k = 0; k < 4; k++) {
        gameSpace[k][i] = newColumn[k];
      }
      for (let i = 0; i < 4; i++) {
        if (column[i] !== newColumn[i]) {
          isFieldChanged = true;
        }
      }
    }
    render();
  }

  function moveDown() {
    for (let i = 0; i < 4; i++) {
      let column = getColumn(i);
      let newColumn = getFullCells(column);
      for (let j = 0; j < column.length - 1; j++) {
        if (newColumn[j] === newColumn[j + 1] && newColumn[j + 1]) {
          newColumn[j + 1] = newColumn[j] * 2;
          counter += newColumn[j + 1];
          newColumn[j] = 0;
          j++;
        }

      }
      newColumn = getFullCells(newColumn);
      while (newColumn.length < 4) {
        newColumn.unshift(0);
      }
      for (let k = 0; k < 4; k++) {
        gameSpace[k][i] = newColumn[k];
      }
      for (let i = 0; i < 4; i++) {
        if (column[i] !== newColumn[i]) {
          isFieldChanged = true;
        }
      }
    }
    render();
  }

  function getFullCells(arr) {
    let fullCellsArr = [];
    arr.forEach(num => {
      if (num) {
        fullCellsArr.push(num);
      }
    });
    return fullCellsArr;
  }
  function getRow(num) {
    let row = [];
    for (let i = 0; i < 4; i++) {
      row.push(gameSpace[num][i]);
    }
    return row;
  }

  function getColumn(num) {
    let row = [];
    for (let i = 0; i < 4; i++) {
      row.push(gameSpace[i][num]);
    }
    return row;
  }

  function random(min, max) {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
  }

  function getEmptyCells() {
    let emptyCells = [];
    for (let i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if (!gameSpace[i][j]) {
          emptyCells.push({ x: i, y: j });
        }
      }
    }
    if(emptyCells.length === 0) {
      return false;
    }
    return emptyCells;
  }

  function createNewCell() {
    let emptyCells = getEmptyCells();
    newNumber = random(1, 10) === 4 ? 4 : 2;
    newCell = emptyCells[random(0, emptyCells.length - 1)];
    gameSpace[newCell.x][newCell.y] = newNumber;
  }

  function checkMove() {
    for (let i = 0; i < 4; i++) {
      let row = getRow(i)
      for (let j = 0; j < 3; j++) {
        if (row[j] == row[j+1]) {
          return true;
        }
      }
    }
    for (let i = 0; i < 4; i++) {
      let column = getColumn(i)
      for (let j = 0; j < 3; j++) {
        if (column[j] == column[j+1]) {
          return true;
        }
      }
    }
    return false;
  }
  function showWin() {
    $(".game-win").css("opacity", "1");
    $(document).unbind('keydown', move);
  }
  function showGameOver() {
    $(".game-over").css("opacity", "1");
      $(document).unbind('keydown', move);
  }
  function render() {
    if (!isStart && isFieldChanged) {
      createNewCell();
    }
    $("#game-field").empty();
    let cells = document.createDocumentFragment();
    for (let i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        let cell = document.createElement('div');
        $(cell).addClass("cell");
        switch (gameSpace[i][j]) {
          case (2): {
            $(cell).text(gameSpace[i][j]);
            $(cell).addClass("cell2");
            break;
          }
          case (4): {
            $(cell).text(gameSpace[i][j]);
            $(cell).addClass("cell4");
            break;
          }
          case (8): {
            $(cell).text(gameSpace[i][j]);
            $(cell).addClass("cell8");
            break;
          }
          case (16): {
            $(cell).text(gameSpace[i][j]);
            $(cell).addClass("cell16");
            break;
          }
          case (32): {
            $(cell).text(gameSpace[i][j]);
            $(cell).addClass("cell32");
            break;
          }
          case (64): {
            $(cell).text(gameSpace[i][j]);
            $(cell).addClass("cell64");
            break;
          }
          case (128): {
            $(cell).text(gameSpace[i][j]);
            $(cell).addClass("cell128");
            break;
          }
          case (256): {
            $(cell).text(gameSpace[i][j]);
            $(cell).addClass("cell256");
            break;
          }
          case (512): {
            $(cell).text(gameSpace[i][j]);
            $(cell).addClass("cell512");
            break;
          }
          case (1024): {
            $(cell).text(gameSpace[i][j]);
            $(cell).addClass("cell1024");
            break;
          }
          case (2048): {
            $(cell).text(gameSpace[i][j]);
            $(cell).addClass("cell2048");
            showWin();
            break;
          }
        }
        $(cells).append(cell);

      }

    }
    if (!getEmptyCells() && !checkMove()) {
      showGameOver();
    }
    $("#game-field").append(cells);

    $("#score").text(counter);
    isFieldChanged = false;
  }
});
