import './Counter.css';

import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

const COUNT = 'Count';

const Counter = ({ counterBase, upperLimit, lowerLimit, counterCallback }) => {
    function readFromStorage(key) {
        if (typeof window.localStorage !== 'undefined') {
            console.log(`Reading ${key} from local storage`);
            // Code for localStorage/sessionStorage.
            return localStorage.getItem(key);
        } else {
            // Sorry! No Web Storage support..
            throw new Error('Cant read local storage!');
        }
    }

    function writeToStorage(key, value) {
        if (typeof window.localStorage !== 'undefined') {
            // Code for localStorage/sessionStorage.
            return localStorage.setItem(key, value);
        } else {
            // Sorry! No Web Storage support..
            throw new Error('Cant write to local storage!');
        }
    }

    //Use lazy initialisation via a initialisation function as an argument to setState
    // rather than the actual value
    let [count, setCount] = useState(() => readFromStorage(COUNT) || 0); //useState(readFromStorage(COUNT) || 0);

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
                    count = count - 1;
                    console.log('clicked: ' + count);

                    // setData({ ...data, count: data.count });
                    setCount(count);
                    writeToStorage(COUNT, count);
                    counterCallback && counterCallback(count);
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
                    writeToStorage(COUNT, count);
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
