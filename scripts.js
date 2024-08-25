const gameBoard = (() => {
    let board = ["","","","","","","","",""];

    const getBoard = () => board;

    const updateBoard = (index, marker) => {
        
        if(board[index] === "") {

            board[index] = marker;

            return true;
        }
        return false;
    };

    const resetBoard = () => { 

        board =  ["", "", "", "", "", "", "", "", ""];
    }

    return { getBoard, updateBoard, resetBoard}    

})();

const player = (name, marker) =>{
    return { name, marker}
}
 const gameController= (() => {
    const cells = document.querySelectorAll(".box");
    const player1 = player("Player 1","X");
    const player2 = player("Player 2","O");
    currentPlayer = player1;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const getCurrentPlayer = () =>{currentPlayer};

    const playRound = (index) => {
        if (gameBoard.updateBoard(index, currentPlayer.marker)) {
            const winner = checkWinner();
            if (winner) {
                return winner;
            }
            switchPlayer();
        }
        return null;
    };

    const checkWinner = () => {
        const board = gameBoard.getBoard();
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]            
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                winningPattern = [pattern[0],pattern[1],pattern[2]];
                cells[pattern[0]].classList.add("winningRow");
                cells[pattern[1]].classList.add("winningRow");
                cells[pattern[2]].classList.add("winningRow");
                cells.forEach(cell => {
                    cell.classList.add("disabled");
                });
                return currentPlayer;
            }
        }

        if (board.every(cell => cell !== "")) {
            return "Tie";
        }

        return null;
    };

    const reset = () => {
        currentPlayer = player1;
        gameBoard.resetBoard();
        cells[winningPattern[0]].classList.remove("winningRow");
        cells[winningPattern[1]].classList.remove("winningRow");
        cells[winningPattern[2]].classList.remove("winningRow");
        cells.forEach(cell => {
            cell.classList.remove("disabled");
        });
    };

    return { playRound, reset, getCurrentPlayer };

 })();
 

 const DisplayController = (() => {
    const cells = document.querySelectorAll(".box");
    const message = document.querySelector("#message");
    const restartButton = document.querySelector("#restart");
    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            const result = gameController.playRound(index);
            updateDisplay();
            if (result) {
                message.textContent = result === "Tie" ? "It's a Draw!" : `${result.marker}'s wins!`;
            }
        });
    });

    const updateDisplay = () => {
        const board = gameBoard.getBoard();
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
        });
    };

    restartButton.addEventListener("click",()=>{
        gameController.reset();
        updateDisplay();
        message.textContent ="";
    })

})();