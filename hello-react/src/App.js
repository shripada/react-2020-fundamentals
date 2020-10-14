import './App.css';

import { readFromStorage, writeFromStorage, writeToStorage } from './LocalStorage';

import Counter from './Counter';
import React from 'react';

const COUNTER_DISPLAYED = 'CounterDisplayed';
function App() {
    let [counter, setCounter] = React.useState(0);
    let [flag, setFlag] = React.useState(() => {
        const flagFromStorage = readFromStorage(COUNTER_DISPLAYED);
        if (flagFromStorage == undefined) {
            return true;
        } else {
            return flagFromStorage;
        }
    });
    return (
        <div className="App">
            {flag && (
                <Counter
                    counterCallback={(count) => {
                        counter = count;
                        setCounter(count);
                    }}
                />
            )}
            <h1>The most recent value of the counter is:{counter}</h1>
            <button
                onClick={() => {
                    setFlag(!flag);
                    writeToStorage(COUNTER_DISPLAYED, !flag);
                }}
            >
                Toggle Counter
            </button>
        </div>
    );
}

export default App;
