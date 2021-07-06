/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description useDebounce.js
 * @createdOn 06/07/21 8:57 am
 */


import { useState, useEffect } from 'react';

export default function useDebounce(value, delay = 800) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value]);

    return debouncedValue;
}
