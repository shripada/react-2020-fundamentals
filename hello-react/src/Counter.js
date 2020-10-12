import './Counter.css';

import React, { useState } from 'react';

const Counter = ({ counterBase, upperLimit, lowerLimit }) => {
    let [count, setCount] = useState(0);
    let [multiplier, setMultiplier] = useState(5);

    return (
        <div className="Counter">
            <button
                onClick={() => {
                    count = count - 1;
                    console.log('- clicked' + count);
                    setCount(count);
                }}
            >
                -
            </button>
            <div className="Label">{count * multiplier}</div>
            <button
                onClick={() => {
                    count = count + 1;
                    console.log('+ clicked', count);
                    setCount(count);
                }}
            >
                +
            </button>
            <div className="Multipler">
                <label htmlFor="multiplier">Multiplier</label>
                <input
                    onChange={(event) => {
                        console.dir(event.target.value);
                        setMultiplier(Number(event.target.value));
                    }}
                    type="text"
                    id="multiplier"
                    name="multiplier"
                    defaultValue={multiplier}
                />
            </div>
        </div>
    );
};

export default Counter;
