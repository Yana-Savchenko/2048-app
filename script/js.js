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
    // gameSpace[1][1] = 1;
    // gameSpace[2][1] = 3;
    render();
  }

  function moveLeft() {
    console.log("left");
    for (let i = 0; i < 4; i++) {
      let row = getRow(i);
      let newRow = [];
      for (let j = row.length - 1; j >= 0; j--) {
        if (!row[j]) {
          newRow.push(row[j]);
        } else {
          newRow.unshift(row[j]);
        }
      }
      gameSpace[i] = newRow;
    }
    render();
  }

  function moveRight() {
    for (let i = 0; i < 4; i++) {
      let row = getRow(i);
      let newRow = [];
      for (let j = 0; j < row.length; j++) {
        if (!row[j]) {
          newRow.unshift(row[j]);
        } else {
          newRow.push(row[j]);
        }
      }
      gameSpace[i] = newRow;
    }
    render();
  }

  function moveUp() {
    for (let i = 0; i < 4; i++) {
      let column = getColumn(i);
      let newColumn = [];
      for (let j = column.length - 1; j >= 0; j--) {
        if (!column[j]) {
          newColumn.push(column[j]);
          
        } else {
          newColumn.unshift(column[j]);
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
      let newColumn = [];
      for (let j = 0; j < column.length; j++) {
        if (!column[j]) {
          newColumn.unshift(column[j]);
        } else {
          newColumn.push(column[j]);
        }
      }
      for (let k = 0; k < 4; k++) {
        gameSpace[k][i] = newColumn[k];
      }
    }
     render();
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
        switch(gameSpace[i][j]){
          case(2): {
            $(cell).text(gameSpace[i][j]);
            $(cell).addClass("two");
            break;
          }
          case(4): {
            $(cell).text(gameSpace[i][j]);
            $(cell).addClass("four");
            break;
          }
        }
        // if (gameSpace[i][j]) {
        //   $(cell).text(gameSpace[i][j]);

        // }
        $(cells).append(cell);
        $("#wrapper").append(cells);
      }

    }
  }
});
