import React, {FC, useEffect, useState} from 'react';
import {Grid, makeStyles, Theme} from "@material-ui/core";
import VegaLitePreview from "../vega/VegaLitePreview";

const useStyles = makeStyles((theme: Theme) => ({}))

interface coinProps {
    data: any[],
    field: string,
    time: string,
}

const VegaFieldsComparison: FC<coinProps> = ({time, data, field}) => {
    const [vega, setVega] = useState<any>()

    useEffect(() => {
        let dataArray: any[] = []
        data.forEach((coin) => {
            coin.forEach((item: any) => {
                const customField = item[field]
                dataArray = [...dataArray, {customField: customField, date: item.date, name: item.name}]
            })
        })
        setVega({
            "selection": {"grid": {"type": "interval", "bind": "scales"}},
            "width": "container",
            "height": "300",
            background: '#f0f0f0',
            "data": {"values": dataArray},
            "mark": {
                "type": "area",
                width: '',
                "line": true, "point": true,
                "tooltip": true,
                opacity: 0.1
            },
            "encoding": {
                "x": {
                    title: "",
                    "field": "date",
                    "type": "temporal",
                    "timeUnit": "",
                    "axis": {
                        "gridDash": [5, 5],
                        "labelColor": "#02254b",
                        "titleColor": "#02254b"
                    }
                },
                "y": {
                    "aggregate": "",
                    "stack": "none",
                    "scale": {"zero": false},
                    "field": "customField",
                    "title": `${field}`,
                    "type": "quantitative",
                    "axis": {
                        "gridColor": "lightgray",
                        "labelColor": "#02254b",
                        "titleColor": "#02254b"
                    }
                },
                "color": {"field": "name", "type": "nominal", legend: {
                        orient: "bottom"
                    }}
            }
        })
    }, [data])

    return (
        <Grid item container xs={12}>
            <Grid item xs={12}>
                <VegaLitePreview
                    style={{width: '100%', background: '#f0f0f0', boxShadow: '0 0 0 2px #72621d', borderRadius: 4}}
                    vegaConfig={vega} keyId={`vega-comp-${field}`}/>
            </Grid>
        </Grid>
    )
}

export default VegaFieldsComparison;
