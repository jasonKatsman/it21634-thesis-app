import React, {FC, useEffect, useState} from 'react';
import {Grid, makeStyles, Slider, Switch, Theme, Typography} from "@material-ui/core";
import VegaLitePreview from "../vega/VegaLitePreview";

const useStyles = makeStyles((theme: Theme) => ({}))

interface coinProps {
    data: any[],
    field: string
}

const VegaFieldsComparison: FC<coinProps> = ({data, field}) => {

    const [vega, setVega] = useState<any>()
    const [bar, setBar] = useState(false)
    const [barWidth, setBarWidth] = useState(15)

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
                "type": bar ? "bar" : "area",
                width: barWidth,
                "line": true, "point": true,
                "tooltip": true,
                opacity: bar ? 0.6 : 0.4
            },
            "encoding": {
                "x": {
                    title: "",
                    "field": "date",
                    "type": "temporal",
                    "axis": {
                        "gridDash": [5, 5],
                        "labelColor": "#02254b",
                        "titleColor": "#02254b"
                    }
                },
                "y": {
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
                "color": {"field": "name", "type": "nominal"}
            }
        })
        console.log(dataArray)
    }, [data, bar, barWidth])

    return (
        <Grid item container xs={12}>
            <Grid item xs={12}>
                <Switch
                    checked={bar}
                    onChange={() => setBar(!bar)}
                    color="primary"
                    name="bar"
                    inputProps={{'aria-label': 'bar'}}
                />
                <Typography variant={'caption'} color={'primary'}
                            style={{fontSize: 14, fontWeight: 800}}>Bar</Typography>
                {bar ? <Slider min={5} valueLabelDisplay="auto" max={60} value={barWidth}
                               onChange={(e, val) => setBarWidth(val as number)}/> : undefined}
            </Grid>
            <Grid item xs={12}>
                <VegaLitePreview
                    style={{width: '100%', background: '#f0f0f0', boxShadow: '0 0 0 2px #72621d', borderRadius: 4}}
                    vegaConfig={vega} keyId={`vega-comp-${field}`}/>
            </Grid>
        </Grid>
    )
}

export default VegaFieldsComparison;
