import './Counter.css';

import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

const Counter = ({ counterBase, upperLimit, lowerLimit, counterCallback }) => {
    let [count, setCount] = useState(0);
    let [multiplier, setMultiplier] = useState(5);
    let [data, setData] = useState({ count: 0, multiplier: 1 });

    useEffect(() => {
        console.log('* Component is rendered');
        return () => {
            console.log('component is unmounted');
        };
    }, []);

    return (
        <div className="Counter">
            <button
                onClick={() => {
                    data.count = data.count - 1;
                    console.log('clicked: ' + data.count);
                    setData({ ...data, count: data.count });
                    // setCount(count);
                    // counterCallback && counterCallback(count);
                }}
            >
                -
            </button>
            <div className="Label">{data.count * multiplier}</div>
            <button
                onClick={() => {
                    count = count + 1;
                    console.log('+ clicked', count);
                    setCount(count);
                    counterCallback && counterCallback(count);
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

Counter.propTypes = {
    counterCallback: PropTypes.func,
    counterBase: PropTypes.number.isRequired,
};

export default Counter;
