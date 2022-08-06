//factory function
const player = (playerName, sign) => {
    return {playerName, sign}
};

// module
const gameBoard = (() => {
    const board = new Array(9);

    const markSquare = (index, marker) => {
        board[index] =  marker;
    }
    
    const winCombination = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    return {markSquare, board, winCombination};
})();

const gameController = (() => {
    const player_1 = player('player 1', 'x');
    const player_2 = player('player 2', 'o');
    const squares = document.querySelectorAll('.square');
    let currentPlayer;
    let counter = 0

    const setCurrentPlayer = (counter) => {
        return counter % 2 === 0 ? currentPlayer = player_1 : currentPlayer = player_2;
    }
    const checkWin = () => {
        return gameBoard.winCombination.some(combination => {
            return combination.every(index => {
                return (gameBoard.board[index] === player_1.sign);
            })  || combination.every(index => { 
                return (gameBoard.board[index] === player_2.sign);
            })  
        })
    }
    const checkDraw = () => {

    } 
    const play= () => {

    }
    squares.forEach(square => {
        square.addEventListener('click', () => {
            gameBoard.markSquare(square.dataset.index, setCurrentPlayer(counter).sign);
            counter++;
            console.log(gameBoard.board);
            square.innerHTML = currentPlayer.sign;
            console.log(checkWin());
        }, {once: true});        
    });
    
    
    
    return {setCurrentPlayer, checkWin}
})();