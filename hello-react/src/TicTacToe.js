// class Square extends React.Component {
//     render() {
//         return <button className="square">{/* TODO */}</button>;
//     }
// }

import './TicTacToe.css';

import React, { useEffect, useRef, useState } from 'react';

import Button from './Button';
import useTicTacToe from './useTicTacToe';

const Square = ({ value, winner, handleClick }) => {
    const classes = `square ${winner ? 'square-winning' : undefined}`;
    return (
        <button className={classes} onClick={handleClick}>
            {value}
        </button>
    );
};

const Board = ({ board, winnerLine, handleClick }) => {
    function renderSquare(i) {
        const winner = (winnerLine && winnerLine.includes(i)) || false;
        return <Square value={board[i]} winner={winner} handleClick={() => handleClick(i)} />;
    }

    return (
        <div>
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
    const handleClick = (i) => {
        const isStepCurrent = () => step === history.length - 1;
        console.log(`square ${i} is clicked`);
        //We need to record this interaction in the board state
        //1. The square got fresh tap
        //2. The square already had a value associated, in other words, board[i] had a non null value
        const board = history[step];
        const [winner] = computeWinner(board);
        if (isStepCurrent() && board[i] === null && !winner) {
            //Set board state to a new state depending who is the current player
            //We need to derive the right board for the given step
            const newBoard = [...board]; //Note, we have to create a new state object, and never mutate the current state and set it back. React wont come to know any state change in this case and there will be no re rendering that is going to happen
            newBoard[i] = player;
            //Flip the player
            setPlayer(player === 'X' ? 'O' : 'X');
            //Set the board state
            console.log(board);

            // [initalboard, step1board]
            const newHistory = history.concat([newBoard]);
            setHistory(newHistory);
            //Update the step
            setStep(step + 1);
        }
    };

    // const [history, setHistory] = useState([Array(9).fill(null)]);
    // const [step, setStep] = useState(0);
    // const [player, setPlayer] = useState('X');

    const { history, setHistory, step, setStep, player, setPlayer, resetGame } = useTicTacToe();

    function computeWinner(board) {
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
                return [board[a], [a, b, c]];
            }
        }
        return [null, null];
    }

    function status() {
        //Check if there is a winner, if so, please show the status that there is a winner,
        //and game should end.
        //We can actually derive if there is a winner. We dont need to maintain a seperate state
        //for this.
        const [winner] = computeWinner(history[step]);
        if (winner === null) {
            if (step === 9)
                //We have filled all the board, this must be a draw
                return 'Game is drawn!';

            return `Next player: ${player}`;
        } else {
            return `Player ${winner} won!`;
        }
    }

    function renderHistory() {
        return history.map((b, index) => (
            <li key={index}>
                <Button selected={index === step} onClick={() => setStep(index)}>
                    {index === 0 ? 'Go to start of the game' : `Goto step${index}`}
                </Button>
            </li>
        ));
    }

    const board = history[step];

    const firstPlayerNameFieldRef = useRef(null);
    console.log(firstPlayerNameFieldRef.current);
    useEffect(() => {
        console.log(firstPlayerNameFieldRef.current);
        if (firstPlayerNameFieldRef.current) {
            firstPlayerNameFieldRef.current.focus();
        }
    }, []);

    const [, winnerLine] = computeWinner(history[step]);
    return (
        <div className="game">
            <div className="game-board">
                <Board board={history[step]} winnerLine={winnerLine} handleClick={handleClick} />
            </div>
            <div className="game-info">
                <div>{status()}</div>
                <ol>{renderHistory()}</ol>
            </div>
            <div className="name-inputs">
                <input ref={firstPlayerNameFieldRef} type={'text'} onChange={() => {}} placeholder={'X'} />
                <input type={'text'} onChange={() => {}} placeholder={'Y'} />
            </div>
            <Button
                selected={false}
                onClick={() => {
                    resetGame();
                }}
            >
                Reset the game
            </Button>
        </div>
    );
};

export default Game;
