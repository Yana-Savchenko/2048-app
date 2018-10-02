$(document).ready(function () {
    let gameSpace = [];
    console.log(random());
    function initialize() {
    
    }
    function random() {
        const newNumber = Math.round(0.5 + Math.random() * 10);
        if (newNumber === 4) {
            return 4;
        }
        return 2;
    }
    function render() {

    }
});
