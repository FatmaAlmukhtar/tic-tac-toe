// factory function pattern
const player = (playerName, sign) => {
    return {playerName, sign}
};

// module pattern
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

// module pattern
const gameController = (() => {
    const player_1 = player('player 1', 'cross');
    const player_2 = player('player 2', 'circle');
    
    let currentPlayer;
    let roundCounter = 0

    const resultDiv = document.querySelector('.result');
    const resultMessage = document.querySelector('.message');
    const restartButton = document.querySelector('.restartButton');

    const boardDiv = document.querySelector('.gameBoard');
    const squares = document.querySelectorAll('.square');

    const firstPlayer = document.querySelector('.first');
    const secondPlayer = document.querySelector('.second');

    /* swap players each round 
        if round counter is even it's player 1 turn
        if round counter is odd it's player 2 turn */
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
    }

    /* check if game ended 
        i.e. all spots on board has been filled with either a cross or a circle */
    const checkGameEnd = () => {
        return gameBoard.board.every(element => {
            return element === 'cross' || element === 'circle';
        })
    }

    /* check for a win 
        by checking if one of the win combinations is met by either the cross or the circle */
    const checkWin = () => {
        return gameBoard.winCombination.some(combination => {
            return combination.every(index => {
                return (gameBoard.board[index] === currentPlayer.sign);
            })  
        })
    }

    /* reset the game board to original status by removing: 
        result message
        all markers */
    const resetGame = () => {
        resultDiv.classList.remove('display');
        gameBoard.resetBoard();
        roundCounter = 0;
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

    /* after each pick from a player, check for a win or game end 
        if neither is met swap player turn */
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
        else setCurrentPlayer(roundCounter);
    }

    /* play one round of the game (one pick by either players): 
        mark the spot picked with the player's marker
        increment round counter
        check game status, a win or game end */
    const play = (e) => {
        gameBoard.markSquare(e.target.dataset.index, setCurrentPlayer(roundCounter).sign);
        roundCounter++;
        e.target.classList.add(currentPlayer.sign);
        checkStatus();
    }

    squares.forEach(square => {
        square.addEventListener('click', play, {once: true});        
    });
    
    return {play}
})();
