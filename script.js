// Takes the information from gameBoard and outputs the X/O onto the screen
let displayControllerModule = (() => {
  const board = document.querySelectorAll(".grid-box");

  const display = () => {
    for (let i = 0; i < board.length; i++) {
      board[i].textContent = gameBoardModule.getBoard(i);
    }
  };
  return { display };
})();

//Acts as the memory and gets written and read by logic and also calls on the display
const gameBoardModule = (function () {
  const gameBoard = ["", "", "", "", "", "", "", "", ""];
  let message = "";

  const setBoard = (index, sign) => {
    gameBoard[index] = sign;
    displayControllerModule.display();
  };

  const setMessage = (messageFromLogic) => {
    message = messageFromLogic;
    displayControllerModule.display();
  };

  const getBoard = (index) => {
    return gameBoard[index];
  };

  const getMessage = () => {
    return message;
  };

  const restartBoard = () => {
    for (let i = 0; i < gameBoard.length; i++) {
      gameBoard[i] = "";
      displayControllerModule.display();
    }
  };

  return { setBoard, setMessage, getBoard, getMessage, restartBoard };
})();

//Adds click events and outputs it to the gameBoard
const logic = (() => {
  let round = 1;
  let gameStatus = true;

  const playRound = (gridIndex) => {
    if (gameStatus === false || gameBoardModule.getBoard(gridIndex) !== "") {
      return;
    }
    gameBoardModule.setBoard(gridIndex, currentPlayer());
    if (checkWinner(gridIndex)) {
      gameBoardModule.setMessage(alert(`${currentPlayer()} WON!`));
      gameStatus = false;
      return;
    }
    if (round === 9) {
      gameBoardModule.setMessage(alert("DRAW!"));
      gameStatus = false;
      return;
    }
    round++;
  };

  const checkWinner = (gridIndex) => {
    const winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    return winCombos
      .filter((combinations) => combinations.includes(gridIndex))
      .some((possibleCombos) => possibleCombos.every((index) => gameBoardModule.getBoard(index) == currentPlayer()));
  };

  const currentPlayer = () => {
    return round % 2 === 1 ? "X" : "O";
  };

  const restartGame = () => {
    round = 1;
    gameStatus = true;
    gameBoardModule.restartBoard();
  };
  return { restartGame, playRound };
})();

const eventHandler = (() => {
  const board = document.querySelectorAll(".grid-box");
  const restart = document.querySelector("button");

  board.forEach((board) => {
    board.addEventListener("click", (e) => {
      logic.playRound(parseInt(e.target.dataset.order));
    });

    restart.addEventListener("click", () => {
      logic.restartGame();
    });
  });
})();
