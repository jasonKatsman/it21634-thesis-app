import React, {FC, useEffect, useRef, useState} from 'react';
import {Grid, makeStyles, Theme} from "@material-ui/core";
import VegaLitePreview from "../vega/VegaLitePreview";

const useStyles = makeStyles((theme: Theme) => ({}))

interface coinProps {
    data: any[],
    field: string,
    time: string
}

const WaterFallChart: FC<coinProps> = ({data, field}) => {

    const [vega, setVega] = useState<any>()
    const widthRef = useRef<any>()

    useEffect(() => {
        let dataArray: any[] = []
        data.forEach((coin) => {
            coin.forEach((item: any, i: number) => {
                const price = item[field]
                const diff = i > 0 ? price - coin[i - 1][field] : 0;
                const prev = i > 0 ? coin[i - 1][field] : null;
                dataArray = [...dataArray, {price: price, diff, prev, date: item.date, name: item.name}]
            })
        })

        setVega({
            "selection": {"grid": {"type": "interval", "bind": "scales"}},
            "autosize": {"type": "fit", "contains": "padding"},
            "width": "container",
            "height": 500,
            background: '#f0f0f0',
            "data": {"values": dataArray},
            "mark": {"type": "bar", size:8,  "tooltip": true},
            "encoding": {
                "tooltip": [
                    {"field": "name", "type": "nominal"},
                    {"field": "diff", "type": "quantitative"},
                    {"field": "price", "type": "quantitative"},
                    {"timeUnit": "yearmonthdatehoursminutes", "field": "date", "title": "date"}
                ],
                "x": {"title": "date", "field": "date", "type": "temporal"},
                "y": {"field": "prev", "scale": {"zero": false}, "type": "quantitative", "title": "price"},
                "y2": {"field": "price"},
                "color": {
                    "condition": [
                        {"test": "datum.price < datum.prev", "value": "#F45C3C"}
                    ],
                    "value": "#86CA79"
                }
            }
        })
    }, [data])

    console.log(vega)
    return (
        <Grid item container xs={12}>
            <Grid item xs={12} ref={widthRef}>
                <VegaLitePreview
                    style={{
                        overflow: "auto",
                        width: '100%',
                        background: '#f0f0f0',
                        boxShadow: '0 0 0 2px #72621d',
                        borderRadius: 4
                    }}
                    vegaConfig={vega} keyId={`vega-comp-${field}-ba`}/>
            </Grid>
        </Grid>
    )
}

export default WaterFallChart;
