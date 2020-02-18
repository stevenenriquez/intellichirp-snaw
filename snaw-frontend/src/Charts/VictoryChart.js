import React, {PureComponent} from 'react';
import {VictoryArea, VictoryAxis, VictoryChart, VictoryTheme} from 'victory';

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
