import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { increment, decrement } from '@/lib/features/counter/counterSlice';

interface TravellerProps {
    setIsTraveller: React.Dispatch<React.SetStateAction<boolean>>;
 
}



const Traveller: React.FC<TravellerProps> = ({ setIsTraveller }) => {
    const dispatch = useDispatch();
    const { adult, children, infants } = useSelector((state: RootState) => state.traveller);

    const handleIncrement = (category: string) => {
        dispatch(increment(category));
    };

    const handleDecrement = (category: string) => {
        dispatch(decrement(category));
    };

    return (
        <div>
            {[
                { title: 'Adult', age: '12+ years', count: adult },
                { title: 'Children', age: '2-12 years', count: children },
                { title: 'Infants', age: '0-2 years', count: infants },
            ].map((category, idx) => (
                <div key={idx} className="flex justify-around mt-6">
                    <div>
                        <p className="font-serif font-normal">{category.title}</p>
                        <p>{category.age}</p>
                    </div>
                    <div className="flex items-center ml-8">
                        <div
                            className={`rounded-full bg-gray-200 p-2 ${category.count === 0 ? 'pointer-events-none' : ''
                                }`}
                            onClick={() => handleDecrement(category.title.toLowerCase())}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                <path d="M200-440v-80h560v80H200Z" />
                            </svg>
                        </div>
                        <p style={{ margin: '0 8px' }}>{category.count}</p>
                        <div
                            className="rounded-full bg-blue-200 p-2"
                            onClick={() => handleIncrement(category.title.toLowerCase())}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0000F5">
                                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                            </svg>
                        </div>
                    </div>
                </div>
            ))}
            <button type="button" className=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center  me-2 mb-2 mt-6" onClick={()=>setIsTraveller(false)}>Done</button>
        </div>
    );
};

export default Traveller;
