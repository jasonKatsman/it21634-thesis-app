import React, {FC, useEffect, useState} from 'react';
import {Grid, makeStyles, Slider, Theme} from "@material-ui/core";
import VegaLitePreview from "../vega/VegaLitePreview";

const useStyles = makeStyles((theme: Theme) => ({

    sliderSpacing: {
        '&>:nth-child(n)': {
            marginRight: 32
        }
    }

}))

interface coinProps {
    data: any[],
}

const CandleStickChart: FC<coinProps> = ({data}) => {
    const classes = useStyles()

    const [vega, setVega] = useState<any>()
    const [barWidth, setBarWidth] = useState(0.5)
    const [innerWidth, setInnerWidth] = useState(0.01)
    useEffect(() => {

        setVega({
                "selection": {"grid": {"type": "interval", "bind": "scales"}},
                "width": "container",
                "height": "450",
                background: '#f0f0f0',
                "description": "A candlestick chart",
                "data": {
                    "values": data
                },
                "encoding": {
                    "x": {
                        "field": "date",
                        "type": "temporal",
                        "timeUnit": "monthdatehours",
                        "axis": {
                            "format": "%m/%d %H:%M",
                            "labelAngle": -45,
                        }
                    },
                    "y": {
                        "type": "quantitative",
                        "scale": {"zero": false},
                        "axis": {"title": "Price"}
                    },
                    "color": {
                        "condition": {
                            "test": "datum.open < datum.close",
                            "value": "#06982d"
                        },
                        "value": "#ae1325"
                    }
                },
                "layer": [
                    {

                        "mark": {
                            "tooltip": true, "type": "bar",
                            "width": {
                                "band": innerWidth
                            }
                        },
                        "encoding": {
                            "tooltip": [
                                {"field": "open", "type": "quantitative"},
                                {"field": "close", "type": "quantitative"},
                                {"field": "low", "type": "quantitative"},
                                {"field": "high", "type": "quantitative"},
                                {"timeUnit": "yearmonthdatehours", "field": "date", "title": "date"}
                            ],
                            // "size": {"value": 1.8},
                            "y": {"field": "low"},
                            "y2": {"field": "high"}
                        }
                    },
                    {
                        "mark": {
                            "tooltip": true,
                            "type": "bar",
                            "width": {
                                "band": barWidth
                            }

                        },
                        "encoding": {
                            "tooltip": [
                                {"field": "open", "type": "quantitative"},
                                {"field": "close", "type": "quantitative"},
                                {"field": "low", "type": "quantitative"},
                                {"field": "high", "type": "quantitative"},
                                {"timeUnit": "yearmonthdatehours", "field": "date", "title": "date"}
                            ],
                            "y": {"field": "open"},
                            "y2": {"field": "close"}
                        }
                    }
                ]
            }
        )
    }, [data, barWidth, innerWidth])

    return (
        <Grid container>
            <Grid container className={classes.sliderSpacing} item xs={12}>
                <Grid item xs={2}>
                    <Slider min={10}
                            valueLabelDisplay="auto"
                            max={100}
                            value={barWidth * 100}
                            onChange={(e, val) => setBarWidth((val as number) * 0.01)}/>
                </Grid>
                <Grid item xs={2}>
                    <Slider min={0}
                            valueLabelDisplay="auto"
                            max={40}
                            value={innerWidth * 100}
                            onChange={(e, val) => setInnerWidth((val as number) * 0.01)}/>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <VegaLitePreview
                    style={{width: '100%', background: '#f0f0f0', boxShadow: '0 0 0 2px #72621d', borderRadius: 4}}
                    vegaConfig={vega} keyId={'vega-comp-candlestick'}/>
            </Grid>
        </Grid>
    )
}

export default CandleStickChart;
