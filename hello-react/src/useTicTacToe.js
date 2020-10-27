import React, { useState } from 'react';

import { useLocalStorageState } from './useLocalStorageState';

function useTicTacToe() {
    const [history, setHistory] = useLocalStorageState([Array(9).fill(null)], 'history');
    const [step, setStep] = useLocalStorageState(0, 'step');
    const [player, setPlayer] = useLocalStorageState('X', 'currentPlayer');

    function resetGame() {
        setHistory([Array(9).fill(null)]);
        setStep(0);
        setPlayer('X');
    }

    return { history, step, player, setHistory, setStep, setPlayer, resetGame };
}

export default useTicTacToe;
