import * as vegaLite from "vega-lite";
import * as vega from "vega";

import React, {FC, useEffect} from "react";
import Handler from "vega-tooltip";

const vl = require('vega-lite-api')
// import * as vl from "vega-lite-api";

type VegaComponentProps = {
    data: any[]
    type?:string,
    selectedFields: { x: string, y: string }
}
const VegaComponent2: FC<VegaComponentProps> = ({data,type='markLine', selectedFields}) => {
    const chartRef = React.createRef<any>();

    vl.register(vega, vegaLite, {
        view: {renderer: 'svg'},
    });
    useEffect(() => {
        if (data) {

            vl.register(vega, vegaLite, {});

            vl.markLine().data(data).encode(
                vl.x().fieldN(selectedFields.x),
                vl.y().fieldQ(selectedFields.y),
            )
                .render()
                .then((chart: any) => {
                    if (document?.getElementById("chart")) {
                        // @ts-ignore
                        document.getElementById("chart").innerHTML = ""

                    }
                    if (chartRef?.current)
                        chartRef.current
                            .appendChild(chart);
                });

        }
    }, [data, selectedFields, type]);

    return <div id={"chart"} ref={chartRef}/>
    // return React.createElement("div", {ref: chartRef});
}

export default VegaComponent2