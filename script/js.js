$(document).ready(function () {
  let gameSpace = [];
  let isFieldChanged = false;
  let isStart = true;
  let counter = 0;
  let newCells = [];
  let direction = 0;
  class Cell {
    constructor(num) {
      this.content = num;
      this.isIncreaced = false;
      this.isPositionChanged = false;
    }
  }

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
        gameSpace[i][j] = new Cell(0);
      }
    }
    counter = 0;
    $(".game-over").css("opacity", "0");
    $(".game-win").css("opacity", "0");
    createNewCell();
    createNewCell();
    $(document).bind('keydown', event, move);
    render();
    isStart = false;
  }

  function move(e) {
    direction = e.keyCode;
    switch (e.keyCode) {
      case (37): {
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
      let row = getRow(i);
      let newRow = getFullCells(row);
      for (let j = newRow.length - 1; j > 0; j--) {
        if (newRow[j - 1] && newRow[j].content === newRow[j - 1].content && newRow[j - 1].content) {
          newRow[j - 1].content = newRow[j].content * 2;
          newRow[j - 1].isIncreaced = true;
          counter += newRow[j - 1].content;
          newRow[j].content = 0;
          j--;
        }

      }
      newRow = getFullCells(newRow);
      while (newRow.length < 4) {
        newRow.push(new Cell(0));
      }
      
      for (let i = 0; i < 4; i++) {
        if (row[i].content !== newRow[i].content) {
          isFieldChanged = true;
          newRow[i].isPositionChanged = true;
        }
      }
      gameSpace[i] = newRow;
    }
    render();
  }

  function moveRight() {
    for (let i = 0; i < 4; i++) {
      let row = getRow(i);
      let newRow = getFullCells(row);
      for (let j = 0; j < newRow.length - 1; j++) {
        if (newRow[j + 1] && newRow[j].content === newRow[j + 1].content && newRow[j + 1].content) {
          newRow[j + 1].content = newRow[j].content * 2;
          newRow[j + 1].isIncreaced = true;
          counter += newRow[j + 1].content
          newRow[j].content = 0;
          j++;
        }
      }
      newRow = getFullCells(newRow);
      while (newRow.length < 4) {
        newRow.unshift(new Cell(0));
      }
      for (let i = 0; i < 4; i++) {
        if (row[i].content !== newRow[i].content) {
          isFieldChanged = true;
          newRow[i].isPositionChanged = true;
        }
      }
      gameSpace[i] = newRow;
    }
    render();

  }

  function moveUp() {
    for (let i = 0; i < 4; i++) {
      let column = getColumn(i);
      let newColumn = getFullCells(column);
      for (let j = newColumn.length - 1; j > 0; j--) {
        if (newColumn[j - 1] && newColumn[j].content === newColumn[j - 1].content && newColumn[j - 1].content) {
          newColumn[j - 1].content = newColumn[j].content * 2;
          newColumn[j - 1].isIncreaced = true;
          counter += newColumn[j - 1].content;
          newColumn[j].content = 0;
          j--;
        }
      }
      newColumn = getFullCells(newColumn);
      while (newColumn.length < 4) {
        newColumn.push(new Cell(0));
      }
      for (let i = 0; i < 4; i++) {
        if (column[i].content !== newColumn[i].content) {
          isFieldChanged = true;
          newColumn[i].isPositionChanged = true;
        }
      }
      for (let k = 0; k < 4; k++) {
        gameSpace[k][i] = newColumn[k];
      }
    }
    render();
  }

  function moveDown() {
    for (let i = 0; i < 4; i++) {
      let column = getColumn(i);
      let newColumn = getFullCells(column);
      for (let j = 0; j < column.length - 1; j++) {
        if (newColumn[j + 1] && newColumn[j].content === newColumn[j + 1].content && newColumn[j + 1].content) {
          newColumn[j + 1].content = newColumn[j].content * 2;
          newColumn[j + 1].isIncreaced = true;
          counter += newColumn[j + 1].content;
          newColumn[j].content = 0;
          j++;
        }

      }
      newColumn = getFullCells(newColumn);
      while (newColumn.length < 4) {
        newColumn.unshift(new Cell(0));
      }
      for (let i = 0; i < 4; i++) {
        if (column[i].content !== newColumn[i].content) {
          isFieldChanged = true;
          newColumn[i].isPositionChanged = true;
        }
      }
      for (let k = 0; k < 4; k++) {
        gameSpace[k][i] = newColumn[k];
      }
    }
    render();
  }

  function getFullCells(arr) {
    let fullCellsArr = [];
    arr.forEach((num) => {
      if (num.content) {
        let fullCell = Object.assign({}, num);;
        fullCellsArr.push(fullCell);
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
        if (!gameSpace[i][j].content) {
          emptyCells.push({ x: i, y: j });
        }
      }
    }
    if (emptyCells.length) {
      return emptyCells;
    }
    return false;
  }

  function createNewCell() {
    let emptyCells = getEmptyCells();
    let newNumber = random(1, 10) === 4 ? 4 : 2;
    let newCellContent = new Cell(newNumber);
    let newCell = emptyCells[random(0, emptyCells.length - 1)];
    gameSpace[newCell.x][newCell.y] = newCellContent;
    newCells.push({ x: newCell.x, y: newCell.y });
  }

  function checkMove() {
    for (let i = 0; i < 4; i++) {
      let row = getRow(i)
      let column = getColumn(i)
      for (let j = 0; j < 3; j++) {
        if (row[j].content == row[j + 1].content || column[j].content == column[j + 1].content) {
          return true;
        }
      }
    }
    return false;
  }
  function showWin() {
    $(".game-win").show();
    $(document).unbind('keydown', move);
  }
  function showGameOver() {
    $(".game-over").css("opacity", "1");
    $(document).unbind('keydown', move);
  }
  function setDirection(direction, cell) {
    switch (direction) {
      case (37): {
        $(cell).addClass("movedLeft");
        break;
      };
      case (38): {
        $(cell).addClass("movedUp");
        break;
      };
      case (39): {
        $(cell).addClass("movedRight");
        break;
      };
      case (40): {
        $(cell).addClass("movedDown");
        break;
      };
    }
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
        newCells.forEach((newCell) => {
          if (i === newCell.x && j === newCell.y) {
            $(cell).addClass("new-cell");
          }
        })
        if (gameSpace[i][j].isIncreaced) {
          $(cell).addClass("increaced");
          setDirection(direction, cell);
        }
        if (gameSpace[i][j].isPositionChanged && gameSpace[i][j].content) {
          setDirection(direction, cell);
        }
        switch (gameSpace[i][j].content) {
          case (2): {
            $(cell).text(gameSpace[i][j].content);
            $(cell).addClass("cell2");
            break;
          }
          case (4): {
            $(cell).text(gameSpace[i][j].content);
            $(cell).addClass("cell4");
            break;
          }
          case (8): {
            $(cell).text(gameSpace[i][j].content);
            $(cell).addClass("cell8");
            break;
          }
          case (16): {
            $(cell).text(gameSpace[i][j].content);
            $(cell).addClass("cell16");
            break;
          }
          case (32): {
            $(cell).text(gameSpace[i][j].content);
            $(cell).addClass("cell32");
            break;
          }
          case (64): {
            $(cell).text(gameSpace[i][j].content);
            $(cell).addClass("cell64");
            break;
          }
          case (128): {
            $(cell).text(gameSpace[i][j].content);
            $(cell).addClass("cell128");
            break;
          }
          case (256): {
            $(cell).text(gameSpace[i][j].content);
            $(cell).addClass("cell256");
            break;
          }
          case (512): {
            $(cell).text(gameSpace[i][j].content);
            $(cell).addClass("cell512");
            break;
          }
          case (1024): {
            $(cell).text(gameSpace[i][j].content);
            $(cell).addClass("cell1024");
            break;
          }
          case (2048): {
            $(cell).text(gameSpace[i][j].content);
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
    newCells = [];
    direction = 0;
    for (let i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        gameSpace[i][j].isIncreaced = false;
        gameSpace[i][j].isPositionChanged = false;
      }
    }
    isFieldChanged = false;
  }


});
