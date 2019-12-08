import React, {PureComponent} from 'react';
import {VictoryArea, VictoryAxis, VictoryChart, VictoryTheme} from 'victory';

const data = [
    {
        time: '0', name: 'Rain', geo: 100, bio: 0, ant: 0
    },
    {
        time: '2', name: 'Birds', geo: 0, bio: 100, ant: 0
    },
    {
        time: '4', name: 'Birds', geo: 0, bio: 100, ant: 0
    },
    {
        time: '6', name: 'Birds', geo: 0, bio: 100, ant: 0
    },
    {
        time: '8', name: 'Rain', geo: 100, bio: 0, ant: 0
    },
    {
        time: '10', name: 'Rain', geo: 100, bio: 0, ant: 0
    },
    {
        time: '12', name: 'Rain', geo: 100, bio: 0, ant: 0
    },
    {
        time: '14', name: 'Cricket', geo: 0, bio: 100, ant: 0
    },
    {
        time: '16', name: 'Rain', geo: 100, bio: 0, ant: 0
    },
    {
        time: '18', name: 'Rain', geo: 100, bio: 0, ant: 0
    },
    {
        time: '20', name: 'Rain', geo: 100, bio: 0, ant: 0
    },
    {
        time: '22', name: 'Birds', geo: 0, bio: 100, ant: 0
    },
    {
        time: '24', name: 'Birds', geo: 0, bio: 100, ant: 0
    },
    {
        time: '26', name: 'Birds', geo: 0, bio: 100, ant: 0
    },
    {
        time: '28', name: 'Car', geo: 0, bio: 0, ant: 100
    },
    {
        time: '30', name: 'Car', geo: 0, bio: 0, ant: 100
    },
    {
        time: '32', name: 'Rain', geo: 100, bio: 0, ant: 0
    },
    {
        time: '34', name: 'Birds', geo: 0, bio: 100, ant: 0
    },
    {
        time: '36', name: 'Rain', geo: 100, bio: 0, ant: 0
    },
    {
        time: '38', name: 'Rain', geo: 100, bio: 0, ant: 0
    },
    {
        time: '40', name: 'Rain', geo: 100, bio: 0, ant: 0
    },
];

const data02 = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 19000}
];

export default class Example extends PureComponent {
    render() {
        return (
            <div>
                <h1>Victory Tutorial</h1>
                <VictoryChart
                    domainPadding={10}
                    theme={VictoryTheme.material}
                >
                    <VictoryAxis dependentAxis
                                 style={{axis: {stroke: "none"}}}
                                 tickFormat={(x) => `t:${x}`}
                    />
                    <VictoryAxis independentAxis
                                 style={{axis: {stroke: "none"}}}
                                 tickFormat={(x) => `%${x}`}
                    />
                    <VictoryArea
                        data={data}
                        x={"time"}
                        y={"geo"}
                        interpolation="stepAfter"
                        scale={{x: "time", y: "linear"}}
                        style={{
                            data: {fill: "#39a1bd", stroke: "#25687a", strokeWidth: 1},
                            parent: {border: "1px solid #ccc"}
                        }}
                    />
                </VictoryChart>
            </div>
        );
    }
}
