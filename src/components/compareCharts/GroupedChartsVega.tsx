import React, {FC, useEffect, useRef, useState} from 'react';
import {Grid, makeStyles, Slider, Switch, Theme, Typography} from "@material-ui/core";
import VegaLitePreview from "../vega/VegaLitePreview";
import {prepareTimeUnits} from "../../utils/prepareTimeUnits";
import {prepareTimeNumber} from "../../utils/prepareTimeNumber";

const useStyles = makeStyles((theme: Theme) => ({}))

interface coinProps {
    data: any[],
    field: string,
    time: string,
}

const GroupedChartsVega: FC<coinProps> = ({time, data, field}) => {

    const [vega, setVega] = useState<any>()
    const widthRef = useRef<any>()

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
            "autosize": {"type": "fit", "contains": "padding"},
            "width": (widthRef?.current?.offsetWidth-250)/prepareTimeNumber(time),
            "height": 300,
            background: '#f0f0f0',
            "data": {"values": dataArray},
            "mark": {
                "type": "bar",
                "width": {"band": 1},
                "line": true,
                "point": true,
                "tooltip": true,
                "opacity": 0.9
            },
            "encoding": {
                "facet": {
                    title:"",
                    "field": "date",
                    "type": "temporal",
                    "timeUnit": prepareTimeUnits(time),
                    spacing: 10
                },
                "x": {
                    "title": "",
                    "field": "name",
                    "type": "nominal",
                    "axis": {
                        "gridDash": [5, 5],
                        "labelColor": "#02254b",
                        "titleColor": "#02254b"
                    }
                },
                "y": {
                    "aggregate": "average",
                    "field": "customField",
                    "title": "current_price",
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
    }, [data])



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
                    vegaConfig={vega} keyId={`vega-comp-${field}`}/>
            </Grid>
        </Grid>
    )
}

export default GroupedChartsVega;
