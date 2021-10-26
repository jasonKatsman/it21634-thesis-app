import React, {FC, memo, useEffect, useState} from 'react';
import {Grid, makeStyles, Theme} from "@material-ui/core";
import VegaLitePreview from "../vega/VegaLitePreview";

const useStyles = makeStyles((theme: Theme) => ({
    chart: {
        width: '100%',
    }
}))

interface coinProps {
    data: any[],
    field: string,
    time?: string,
    height?: number,
    hasPoints?: boolean,
    extraStyle?: any
}

const VegaFieldsComparison: FC<coinProps> = ({hasPoints = true, extraStyle, height = 350, time, data, field}) => {
    const [vega, setVega] = useState<any>()
    const classes = useStyles()
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
            "height": "container",
            background: '#f0f0f0',
            "data": {"values": dataArray},
            "mark": {
                "type": "area",
                width: '',
                "line": true, "point": hasPoints,
                "tooltip": true,
                opacity: 0.1
            },
            "encoding": {
                "x": {
                    title: "",
                    "field": "date",
                    "type": "temporal",
                    "timeUnit": "yearmonthdatehoursminutes",
                    "axis": {
                        "gridDash": [5, 5],
                        "labelColor": "#02254b",
                        "titleColor": "#02254b"
                    }
                },
                "y": {
                    "aggregate": "average",
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
                "color": {
                    "field": "name", "type": "nominal", legend: {
                        orient: "bottom"
                    }
                }
            }
        })
    }, [data, hasPoints])

    return (
        <Grid item container xs={12}>
            <Grid item xs={12}>
                <VegaLitePreview
                    className={classes.chart}
                    style={extraStyle ? extraStyle : {
                        height:height,
                        background: '#f0f0f0',
                        boxShadow: '0 0 0 2px #72621d',
                        borderRadius: 4
                    }}
                    vegaConfig={vega} keyId={`vega-comp-${field}`}/>
            </Grid>
        </Grid>
    )
}

export default memo(VegaFieldsComparison);
