$(document).ready(function () {
    let gameSpace = [];
    initialize();
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
        render();
    }

    // return 2 with probability 90% or 4 with probabiliti 10%;
    function random(min, max) {
        return Math.round(min - 0.5 + Math.random() * (max - min + 1));
    }
    function render() {
      let cells = document.createDocumentFragment();
      for (let i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            let cell = document.createElement('div');
            $(cell).addClass("cell");
            if(gameSpace[i][j]) {
              $(cell).text(gameSpace[i][j]);
            }
            $(cells).append(cell);
            $("#wrapper").append(cells);
        }

    }
    }
});
