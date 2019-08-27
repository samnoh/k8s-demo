import React, { useEffect, useState, useCallback } from 'react';

import { getValues, getIndexes, postIndex } from '../lib/api';

const Fib = () => {
    const [seenIndexes, setSeenIndexes] = useState([]);
    const [values, setValues] = useState({});
    const [index, setIndex] = useState('');

    useEffect(() => {
        const fn = async () => {
            const indexes = await getIndexes();
            if (Array.isArray(indexes)) {
                setSeenIndexes(indexes);
            }

            const fetchedValues = await getValues();
            if (typeof fetchedValues === 'object') {
                fetchedValues && setValues(fetchedValues);
            }
        };
        fn();
    }, []);

    const handleSubmit = useCallback(
        e => {
            e.preventDefault();
            postIndex(index);
            setIndex('');
            window.location.reload();
        },
        [index]
    );

    const renderSeenIndexes = useCallback(() => {
        return seenIndexes.map(({ number }) => number).join(', ');
    }, [seenIndexes]);

    const renderValues = useCallback(() => {
        const entries = [];

        // eslint-disable-next-line
        for (let key in values) {
            entries.push(
                <div key={key}>
                    For index {key} I calculated {values[key]}
                </div>
            );
        }

        return entries;
    }, [values]);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Enter your index:</label>
                <input
                    type="number"
                    value={index}
                    onChange={e => {
                        setIndex(e.target.value);
                    }}
                />
                <button>Submit</button>
            </form>
            <h3>Indexes I have seen:</h3>
            {renderSeenIndexes()}
            <h3>Calculated Values:</h3>
            {renderValues()}
        </>
    );
};

export default Fib;
