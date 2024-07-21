'use client'
import { useState, useEffect } from 'react';

interface Props {
    params: {
        stod: string;
    };
}

const ChannelPage: React.FC<Props> = ({ params }) => {
    const [sourceCode, setSourceCode] = useState<string>('');
    const [destinationCode, setDestinationCode] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [adults, setAdults] = useState<number>(0);
    const [children, setChildren] = useState<number>(0);
    const [infants, setInfants] = useState<number>(0);

    useEffect(() => {
    if (params && params.stod) {
        const decodedId = decodeURIComponent(params.stod);
        console.log('Decoded ID:', decodedId);

        // Extracting parameters using regex
        const regex = /SourceCode:\s*([^ ]+)\s+DestinationCode:\s*([^ ]+)\s+selectedDate:\s*([^ ]+)\s+adults?:\s*(\d+)\s+children:\s*(\d+)\s+infants:\s*(\d+)/;
        const match = decodedId.match(regex);

        if (match) {
            console.log('Regex match:', match);

            const [, source, destination, date, adultCount, childrenCount, infantCount] = match;
            console.log('Extracted values:', source, destination, date, adultCount, childrenCount, infantCount);

            setSourceCode(source);
            setDestinationCode(destination);
            setSelectedDate(date);
            setAdults(parseInt(adultCount, 10));
            setChildren(parseInt(childrenCount, 10));
            setInfants(parseInt(infantCount, 10));
        } else {
            console.log('Regex did not match');
        }
    }
}, [params,setSourceCode,setDestinationCode,setSelectedDate,setAdults,setChildren,setInfants]);
    
    return (
        <div>
            <h1>Channel Page</h1>
            {/* Render your page content here */}
        </div>
    );
};

export default ChannelPage;
