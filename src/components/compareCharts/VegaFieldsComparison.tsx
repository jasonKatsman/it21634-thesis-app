import React, {FC, useEffect, useState} from 'react';
import {Grid, makeStyles, Slider, Switch, Theme, Typography} from "@material-ui/core";
import VegaLitePreview from "../vega/VegaLitePreview";
import {prepareTimeUnits} from "../../utils/prepareTimeUnits";

const useStyles = makeStyles((theme: Theme) => ({}))

interface coinProps {
    data: any[],
    field: string,
    time: string,
}

const VegaFieldsComparison: FC<coinProps> = ({time, data, field}) => {

    const [vega, setVega] = useState<any>()
    const [bar, setBar] = useState(false)
    const [stack, setStack] = useState(true)
    const [barWidth, setBarWidth] = useState(0.8)

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
                width: barWidth ? {
                    band: barWidth
                } : '',
                "line": true, "point": true,
                "tooltip": true,
                opacity: bar ? 0.8 : 0.2
            },
            "encoding": {
                "x": {
                    title: "",
                    "field": "date",
                    "type": "temporal",
                    "timeUnit": bar ? prepareTimeUnits(time) : "",
                    "axis": {
                        "gridDash": [5, 5],
                        "labelColor": "#02254b",
                        "titleColor": "#02254b"
                    }
                },
                "y": {
                    "aggregate": bar ? "average" : "",
                    "stack": bar && stack ? "zero" : "none",
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
    }, [data, bar, barWidth, stack])

    const prepareBarSection = () => {
        return <Grid container>
            <Grid item xs={12}>
                <Typography variant={'caption'} color={'secondary'}
                            style={{fontSize: 14, fontWeight: 800}}>bar width</Typography><Slider min={0}
                                                                                                  valueLabelDisplay="auto"
                                                                                                  max={100}
                                                                                                  value={barWidth * 100}
                                                                                                  onChange={(e, val) => setBarWidth((val as number) * 0.01)}/>
            </Grid>
        </Grid>
    }

    return (
        <Grid item container xs={12}>
            <Grid item container xs={12}>
                <Grid item>
                    <Switch
                        checked={bar}
                        onChange={() => setBar(!bar)}
                        color="primary"
                        name="bar"
                        inputProps={{'aria-label': 'bar'}}
                    />
                    <Typography variant={'caption'} color={'primary'}
                                style={{fontSize: 14, fontWeight: 800}}>Bar</Typography></Grid>
                {bar ? <Grid item>
                    <Switch
                        checked={stack}
                        onChange={() => setStack(!stack)}
                        color="primary"
                        name="stack"
                        inputProps={{'aria-label': 'bar'}}
                    /><Typography variant={'caption'} color={'primary'}
                                  style={{fontSize: 14, fontWeight: 800}}>Stacked bars</Typography>
                </Grid> : undefined}
            </Grid>
            {bar ? prepareBarSection() : undefined}
            <Grid item xs={12}>
                <VegaLitePreview
                    style={{width: '100%', background: '#f0f0f0', boxShadow: '0 0 0 2px #72621d', borderRadius: 4}}
                    vegaConfig={vega} keyId={`vega-comp-${field}`}/>
            </Grid>
        </Grid>
    )
}

export default VegaFieldsComparison;
