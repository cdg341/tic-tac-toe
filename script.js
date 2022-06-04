// gameBoard module
let gameboardModule = (function () {
  let gameBoard = [];
  return { gameBoard };
})();

// displayControllerModule
let displayControllerModule = (function () {
  let display = () => {
    console.log("This is a test");
  };
  return { display };
})();

// Set up player factory function
let createPlayer = (playerName, playerNumber, assignment) => {
  let getPlayerName = () => {
    playerName;
    console.log(`This is the name of player ${playerNumber}, ${playerName}, which is assigned O`);
  };
  return { getPlayerName, playerName, playerNumber, assignment };
};

//Render contents of the gameBoard array to the page
function render() {}

let playerOne = createPlayer("Cameron", 1, "X");
let playerTwo = createPlayer("Brandon", 2, "O");
