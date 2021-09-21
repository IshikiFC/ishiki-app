import React, {useState} from 'react';
import Chart from "react-google-charts";

export const AgentMonitor = ({players, ball, probabilities}) => {
    // const [result, setResult] = useState(null);
    //
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

    const buildChartData = (probabilities) => {
        const data = [];
        data.push(['Action', 'Probability'])
        Object.keys(probabilities).forEach((key) => {
            const probability = probabilities[key];
            data.push([key, probability]);
        });
        return data;
    }


    return (
        <div>
            <Chart
                width={'800px'}
                height={'600px'}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={buildChartData(probabilities)}
                options={{
                    title: 'Agent Action Probability',
                    chartArea: {width: '50%'},
                    colors: ['#b0120a'],
                    hAxis: {
                        title: 'Probability',
                        minValue: 0,
                        maxValue: 1,
                    },
                    vAxis: {
                        title: 'Action',
                    },
                }}
            />
        </div>
    );
}