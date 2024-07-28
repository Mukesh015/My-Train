import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../lib/store';
import { increment, decrement } from '../../lib/features/counter/counterSlice';

interface CounterProps {
    value: string;
}

export const Counter: React.FC<CounterProps> = ({ value }) => {
    const dispatch = useDispatch();

    // Call useSelector unconditionally
    const adultCount = useSelector((state: RootState) => state.traveller.adult);
    const childrenCount = useSelector((state: RootState) => state.traveller.children);
    const infantsCount = useSelector((state: RootState) => state.traveller.infants);

    const handleIncrement = (category: string) => {
        dispatch(increment(category));
    };

    const handleDecrement = (category: string) => {
        dispatch(decrement(category));
    };

    // Determine the current count based on the value prop
    let count: number;
    switch (value) {
        case 'adult':
            count = adultCount;
            break;
        case 'children':
            count = childrenCount;
            break;
        case 'infants':
            count = infantsCount;
            break;
        default:
            count = 0;
            break;
    }

    return (
        <div className="relative flex items-center">
            <button
                type="button"
                onClick={() => handleDecrement(value)}
                id="decrement-button"
                data-input-counter-decrement="counter-input"
                className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            >
                <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                </svg>
            </button>
            <input
                type="text"
                id="counter-input"
                data-input-counter
                className="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                placeholder=""
                value={count}
                required
            />
            <button
                type="button"
                onClick={() => handleIncrement(value)}
                id="increment-button"
                data-input-counter-increment="counter-input"
                className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            >
                <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                </svg>
            </button>
        </div>
    );
}
