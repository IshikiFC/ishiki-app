import Chart from "react-google-charts";
import React from "react";

export const ValueHistoryMonitor = ({valueHistory, windowSize}) => {
    const buildChartData = (valueHistory, windowSize) => {
        const data = [];
        data.push(['x', 'GRF', 'Tamakeri']);
        for (let i = 0; i < windowSize; i++) {
            const entry = [
                i - windowSize + 1,
                valueHistory['grf'][i],
                valueHistory['tamakeri'][i]
            ]
            data.push(entry)
        }
        return data;
    }

    return (
        <Chart
            width={'600px'}
            height={'400px'}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={buildChartData(valueHistory, windowSize)}
            options={{
                hAxis: {
                    title: 'Time',
                    minValue: -windowSize,
                    maxValue: 1,
                },
                vAxis: {
                    title: 'Value estimate',
                    minValue: -1,
                    maxValue: 1,
                },
                colors: ['#f54a2c', '#344bf7'],
            }}
            rootProps={{'data-testid': '2'}}
        />
    );
}