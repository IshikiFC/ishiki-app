import React, {useEffect, useState} from 'react';
import {buildObservation} from "../utils/ApiUtils";


const style = {
    display: 'flex'
}

export const Stats = ({players, ball}) => {
    const [result, setResult] = useState(null);

    // useEffect(() => {
    //     fetch(
    //         'http://localhost:5000/evaluate/grf',
    //         {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(buildObservation(players, ball)),
    //             mode: 'cors'
    //         }
    //     )
    //         .then(response => response.json())
    //         .then(data => {
    //             setResult(data);
    //         });
    // }, [players, ball]);


    return (
        <div style={style}>
            <pre>
                {JSON.stringify(buildObservation(players, ball), null, 2)}
            </pre>
            <pre>
                {JSON.stringify(result, null, 2)}
            </pre>
        </div>
    );
}