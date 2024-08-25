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
                message.textContent = result === "Tie" ? "It's a tie!" : `${result.name} wins!`;
            }
        });
    });

    const updateDisplay = () => {
        const board = gameBoard.getBoard();
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
        });
    };

})();
