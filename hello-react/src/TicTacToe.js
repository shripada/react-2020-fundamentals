// class Square extends React.Component {
//     render() {
//         return <button className="square">{/* TODO */}</button>;
//     }
// }

import './TicTacToe.css';

import React, { useState } from 'react';

const Square = ({ value, handleClick }) => {
    return (
        <button className="square" onClick={handleClick}>
            {value}
        </button>
    );
};

const Board = () => {
    function renderSquare(i) {
        return (
            <Square
                value={board[i]}
                handleClick={() => {
                    console.log(`square ${i} is clicked`);
                    //We need to record this interaction in the board state
                    //1. The square got fresh tap
                    //2. The square already had a value associated, in other words, board[i] had a non null value
                    if (board[i] === null && !computeWinner()) {
                        //Set board state to a new state depending who is the current player
                        const newBoard = [...board]; //Note, we have to create a new state object, and never mutate the current state and set it back. React wont come to know any state change in this case and there will be no re rendering that is going to happen
                        newBoard[i] = player;
                        //Flip the player
                        setPlayer(player === 'X' ? 'O' : 'X');
                        //Set the board state
                        console.log(board);
                        setBoard(newBoard);
                    }
                }}
            />
        );
    }

    const [board, setBoard] = useState(Array(9).fill(null));
    const [player, setPlayer] = useState('X');

    console.log(board);

    function computeWinner() {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    }

    function status() {
        //Check if there is a winner, if so, please show the status that there is a winner,
        //and game should end.
        //We can actually derive if there is a winner. We dont need to maintain a seperate state
        //for this.
        const winner = computeWinner();
        if (winner === null) {
            return `Next player: ${player}`;
        } else {
            return `Player ${winner} won!`;
        }
    }

    return (
        <div>
            <div className="status">{status()}</div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
};

const Game = () => {
    return (
        <div className="game">
            <div className="game-board">
                <Board />
            </div>
            <div className="game-info">
                <div>{/* status */}</div>
                <ol>{/* TODO */}</ol>
            </div>
        </div>
    );
};

export default Game;
