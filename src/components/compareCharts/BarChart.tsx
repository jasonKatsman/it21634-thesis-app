import React, {FC, useEffect, useState} from 'react';
import {Box, Grid, makeStyles, Slider, Switch, Theme, Typography} from "@material-ui/core";
import VegaLitePreview from "../vega/VegaLitePreview";
import {prepareTimeUnits} from "../../utils/prepareTimeUnits";

const useStyles = makeStyles((theme: Theme) => ({
    barSection: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: "nowrap",
        width: '100%',
        '& p': {
            width: 120
        }
    }
}))

interface coinProps {
    data: any[],
    field: string,
    time: string,
}

const BarChart: FC<coinProps> = ({time, data, field}) => {
    const classes = useStyles()
    const [vega, setVega] = useState<any>()
    const [stack, setStack] = useState(true)
    const [barWidth, setBarWidth] = useState(0.8)

    const prepareOpacity = () => {
        if (stack) return 0.9
        return 0.5
    }

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
                "type": "bar",
                width: barWidth ? {
                    band: barWidth
                } : '',
                "line": true, "point": true,
                "tooltip": true,
                opacity: prepareOpacity()
            },
            "encoding": {
                "x": {
                    title: "",
                    "field": "date",
                    "type": "temporal",
                    "timeUnit": prepareTimeUnits(time),
                    "axis": {
                        "gridDash": [5, 5],
                        "labelColor": "#02254b",
                        "titleColor": "#02254b"
                    }
                },
                "y": {
                    "aggregate": "average",
                    "stack": stack ? "zero" : "none",
                    "scale": {"zero": true},
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
    }, [data, barWidth, stack])

    return (
        <Grid item container xs={12}>
            <Box className={classes.barSection}>
                <Typography noWrap color={'primary'}
                            style={{fontSize: 14, fontWeight: 800}}>Stacked bars</Typography><Switch
                checked={stack}
                onChange={() => setStack(!stack)}
                color="primary"
                name="stack"
                inputProps={{'aria-label': 'bar'}}
            />
                <Typography noWrap color={'secondary'} style={{fontSize: 14, fontWeight: 800}}>bar
                    width</Typography>
                <Slider min={0}
                        valueLabelDisplay="auto"
                        max={100}
                        value={barWidth * 100}
                        onChange={(e, val) => setBarWidth((val as number) * 0.01)}/>

            </Box>

            <Grid item xs={12}>
                <VegaLitePreview
                    style={{width: '100%', background: '#f0f0f0', boxShadow: '0 0 0 2px #72621d', borderRadius: 4}}
                    vegaConfig={vega} keyId={`vega-comp-${field}`}/>
            </Grid>
        </Grid>
    )
}

export default BarChart;
