//factory function
const player = (playerName, sign) => {
    return {playerName, sign}
};

// module
const gameBoard = (() => {
    let board = ['','','','','','','','',''];

    const markSquare = (index, marker) => {
        board[index] =  marker;
    }
    const resetBoard = () => {
        for(let i=0; i<board.length; i++) {
            board[i] = '';
        }
        /*
        board.map((element,index) => {
            board[index] = '';
        });*/
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
    return {markSquare, board, winCombination, resetBoard};
})();

const gameController = (() => {
    const player_1 = player('player 1', 'x');
    const player_2 = player('player 2', 'o');
    const squares = document.querySelectorAll('.square');
    let currentPlayer;
    let counter = 0

    const resultDiv = document.querySelector('.result');
    const resultMessage = document.querySelector('.message');
    const restartButton = document.querySelector('.restartButton');

    const setCurrentPlayer = (counter) => {
        return counter % 2 === 0 ? currentPlayer = player_1 : currentPlayer = player_2;
    }
    const checkGameEnd = () => {
        return gameBoard.board.every(element => {
            return element === 'x' || element === 'o';
        })
        
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
    const resetGame = () => {
        resultDiv.classList.remove('display');
        gameBoard.resetBoard();
        counter = 0;
        squares.forEach(square => {
                square.innerHTML = '';
                square.removeEventListener('click', play);
                square.addEventListener('click', play, {once: true});
        });
    }
    const checkStatus = () => {
        
        if(checkWin()) {
            resultDiv.classList.add('display');
            resultMessage.innerText = `${currentPlayer.sign}'s Wins!`;
            restartButton.addEventListener('click', resetGame);
        }
        else if (checkGameEnd()) {
            if(checkWin()) resultMessage.innerText = `${currentPlayer.sign}'s Wins!`;
                
            else resultMessage.innerText = 'Draw!';
       
            resultDiv.classList.add('display');
            restartButton.addEventListener('click', resetGame);
        }
        else setCurrentPlayer(counter);
    }
    const play = (e) => {
        gameBoard.markSquare(e.target.dataset.index, setCurrentPlayer(counter).sign);
        counter++;
        e.target.innerHTML = currentPlayer.sign;
        checkStatus();
    }
    squares.forEach(square => {
        square.addEventListener('click', play, {once: true});        
    });
    
    return {play}
})();
