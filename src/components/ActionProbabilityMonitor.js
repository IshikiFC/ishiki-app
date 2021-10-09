import Chart from "react-google-charts";
import React from "react";
import {NUM_ACTIONS} from "../utils/Constants";

export const ActionProbabilityMonitor = ({evaluation, action}) => {
    const buildChartData = (evaluation, action) => {
        const data = [];
        data.push(['Action', 'Player', 'GRF', 'Tamakeri'])
        for (let i = 0; i < NUM_ACTIONS; i++) {
            const label = evaluation['grf']['action'][i][0];
            const entry = [
                label,
                label === action ? 1 : 0,
                evaluation['grf']['action'][i][1],
                evaluation['tamakeri']['action'][i][1],
            ]
            data.push(entry)
        }
        return data;
    }

    return (
        <div>
            <Chart
                width={'600px'}
                height={'800px'}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={buildChartData(evaluation, action)}
                options={{
                    title: 'Action Probability',
                    chartArea: {width: '50%'},
                    colors: ['#373840', '#f54a2c', '#344bf7'],
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