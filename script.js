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
    const player_1 = player('player 1', 'cross');
    const player_2 = player('player 2', 'circle');
    const squares = document.querySelectorAll('.square');
    let currentPlayer;
    let counter = 0

    const resultDiv = document.querySelector('.result');
    const resultMessage = document.querySelector('.message');
    const restartButton = document.querySelector('.restartButton');
    const boardDiv = document.querySelector('.gameBoard');

    const firstPlayer = document.querySelector('.first');
    const secondPlayer = document.querySelector('.second');

    const setCurrentPlayer = (counter) => {
        if (counter % 2 === 0) {
            boardDiv.classList.remove('circleTurn');
            boardDiv.classList.add('crossTurn');
            firstPlayer.classList.add('active');
            secondPlayer.classList.remove('active');
            return currentPlayer = player_1;
        }
        else {
            boardDiv.classList.remove('crossTurn');
            boardDiv.classList.add('circleTurn');
            secondPlayer.classList.add('active');
            firstPlayer.classList.remove('active');
            return currentPlayer = player_2;
        }
        //return counter % 2 === 0 ? currentPlayer = player_1 : currentPlayer = player_2;
    }
    const checkGameEnd = () => {
        return gameBoard.board.every(element => {
            return element === 'cross' || element === 'circle';
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
                square.classList.remove('cross', 'circle');
                boardDiv.classList.remove('circleTurn');
                boardDiv.classList.add('crossTurn');
                secondPlayer.classList.remove('active');
                firstPlayer.classList.add('active');
                square.removeEventListener('click', play);
                square.addEventListener('click', play, {once: true});
        });
    }
    const checkStatus = () => {
        
        if(checkWin()) {
            resultDiv.classList.add('display');
            resultMessage.innerText = `${currentPlayer.sign.toUpperCase()} Wins!`;
            restartButton.addEventListener('click', resetGame);
        }
        else if (checkGameEnd()) {
            if(checkWin()) resultMessage.innerText = `${currentPlayer.sign} Wins!`;
                
            else resultMessage.innerText = 'Draw!';
       
            resultDiv.classList.add('display');
            restartButton.addEventListener('click', resetGame);
        }
        else setCurrentPlayer(counter);
    }
    const play = (e) => {
        gameBoard.markSquare(e.target.dataset.index, setCurrentPlayer(counter).sign);
        counter++;
        e.target.classList.add(currentPlayer.sign);
        checkStatus();
    }
    squares.forEach(square => {
        square.addEventListener('click', play, {once: true});        
    });
    
    return {play}
})();
