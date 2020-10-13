import './App.css';

import Counter from './Counter';
import React from 'react';

function App() {
    let [counter, setCounter] = React.useState(0);
    let [flag, setFlag] = React.useState(true);
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
            <button onClick={() => setFlag(!flag)}>Toggle Counter</button>
        </div>
    );
}

export default App;
