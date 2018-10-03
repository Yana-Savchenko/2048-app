$(document).ready(function () {
  let gameSpace = [];
  initialize();

  $(document).keydown((e) => {
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
  })
  function initialize() {
    for (let i = 0; i < 4; i++) {
      gameSpace[i] = new Array();
      for (var j = 0; j < 4; j++) {
        gameSpace[i][j] = 0;
      }
    }
    const startNumber = random(1, 10) === 4 ? 4 : 2;
    const row = random(0, 3);
    const column = random(0, 3);
    gameSpace[row][column] = startNumber;
    gameSpace[1][1] = 2;
    gameSpace[1][2] = 2;
    gameSpace[1][3] = 2;
    render();
  }

  function moveLeft() {
    console.log("left");
    for (let i = 0; i < 4; i++) {
      let newRow = getFullCells(getRow(i));
      for (let j = newRow.length - 1; j >= 0; j--) {
        if (newRow[j] === newRow[j - 1]) {
          newRow[j - 1] = newRow[j] * 2;
          newRow[j] = 0;
          j--;
        }
        newRow = getFullCells(newRow);
        while (newRow.length < 4) {
          newRow.push(0);
        }
        gameSpace[i] = newRow;
      }
    }
    render();
  }

  function moveRight() {
    for (let i = 0; i < 4; i++) {
      let newRow = getFullCells(getRow(i));
      for (let j = 0; j < newRow.length; j++) {
        if (newRow[j] === newRow[j + 1]) {
          newRow[j + 1] = newRow[j] * 2;
          newRow[j] = 0;
          j++;
        }
      }
      newRow = getFullCells(newRow);
      while (newRow.length < 4) {
        newRow.unshift(0);
      }
      gameSpace[i] = newRow;
    }
    render();

  }

  function moveUp() {
    for (let i = 0; i < 4; i++) {
      let newColumn = getFullCells(getColumn(i));
      for (let j = newColumn.length - 1; j >= 0; j--) {
        if (newColumn[j] === newColumn[j - 1]) {
          newColumn[j - 1] = newColumn[j] * 2;
          newColumn[j] = 0;
          j--;
        }
        newColumn = getFullCells(newColumn);
        while (newColumn.length < 4) {
          newColumn.push(0);
        }
        for (let k = 0; k < 4; k++) {
          gameSpace[k][i] = newColumn[k];
        }
      }
    }
    render();
  }

  function moveDown() {
    for (let i = 0; i < 4; i++) {
      let column = getColumn(i);
      let newColumn = getFullCells(getColumn(i));
      for (let j = 0; j < column.length; j++) {
        if (newColumn[j] === newColumn[j + 1]) {
          newColumn[j + 1] = newColumn[j] * 2;
          newColumn[j] = 0;
          j++;
        }
        newColumn = getFullCells(newColumn);
        while (newColumn.length < 4) {
          newColumn.unshift(0);
        }
        for (let k = 0; k < 4; k++) {
          gameSpace[k][i] = newColumn[k];
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

  function render() {
    $("#wrapper").empty();
    let cells = document.createDocumentFragment();
    for (let i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        let cell = document.createElement('div');
        $(cell).addClass("cell");
        switch (gameSpace[i][j]) {
          case (2): {
            $(cell).text(gameSpace[i][j]);
            $(cell).addClass("two");
            break;
          }
          case (4): {
            $(cell).text(gameSpace[i][j]);
            $(cell).addClass("four");
            break;
          }
          case (8): {
            $(cell).text(gameSpace[i][j]);
            $(cell).addClass("four");
            break;
          }
          case (16): {
            $(cell).text(gameSpace[i][j]);
            $(cell).addClass("four");
            break;
          }
          case (32): {
            $(cell).text(gameSpace[i][j]);
            $(cell).addClass("four");
            break;
          }
          case (64): {
            $(cell).text(gameSpace[i][j]);
            $(cell).addClass("four");
            break;
          }
          case (128): {
            $(cell).text(gameSpace[i][j]);
            $(cell).addClass("four");
            break;
          }
        }
        $(cells).append(cell);
        $("#wrapper").append(cells);
      }

    }
  }
});
