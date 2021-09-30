import React, {FC, useEffect, useState} from 'react';
import {Button, Checkbox, Grid, makeStyles, Slider, TextField, Theme, Tooltip, Typography} from "@material-ui/core";
import VegaLitePreview from "../vega/VegaLitePreview";
import SettingsIcon from "@material-ui/icons/Settings";
import CancelIcon from "@material-ui/icons/Cancel";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";


const useStyles = makeStyles((theme: Theme) => ({

    sliderSpacing: {
        marginBottom: 4,
        '&>:nth-child(n)': {
            marginRight: 32
        },
        '&>:first-child': {
            marginRight: 0
        }
    },
    input: {
        '& .MuiOutlinedInput-input': {
            padding: '6px 4px 6px 12px'

        }
    },
    vega: {
        width: '100%',
    }

}))

interface coinProps {
    data: any[],
    height?: number,
    extraStyle?: any
}

const PureCandleStickChart: FC<coinProps> = ({height = 500, extraStyle, data}) => {
    const classes = useStyles()
    const [customWidth, setCustomWidth] = useState()
    const [customCheck, setCustomCheck] = useState(false)
    const [customSettings, setCustomSettings] = useState(false)

    const [vega, setVega] = useState<any>()
    const [barWidth, setBarWidth] = useState(0.5)
    const [innerWidth, setInnerWidth] = useState(0.01)
    useEffect(() => {
        setVega({
                "selection": {"grid": {"type": "interval", "bind": "scales"}},
                "width": "container",
                "height": height,
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
                        "selection": {"grid": {"type": "interval", "bind": "scales"}},
                        "mark": {
                            "tooltip": true,
                            "type": "bar",
                            "width": customCheck ? customWidth :
                                {
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
    }, [data, barWidth, innerWidth, customCheck, customWidth])
    return (
        <Grid container>
            <Grid container alignItems={'center'} className={classes.sliderSpacing} item xs={12}>
                <Button
                    onClick={() => setCustomSettings(!customSettings)}>
                    {!customSettings ? <SettingsIcon/> : <CancelIcon/>}
                </Button>
                {customSettings ?
                    <>
                        <Grid item container alignItems={'center'} wrap={'nowrap'} xs={1}>
                            <Checkbox checked={customCheck} onClick={() => setCustomCheck(!customCheck)}/>
                            <TextField placeholder={'custom width'} className={classes.input} type={'number'}
                                       disabled={!customCheck}
                                       value={customWidth}
                                       onChange={(e: any) => setCustomWidth(e.target.value)}
                                       variant={'outlined'}/>
                        </Grid>
                        <Grid item xs={2}>
                            <Slider min={10}
                                    disabled={customCheck}
                                    valueLabelDisplay="auto"
                                    max={100}
                                    value={barWidth * 100}
                                    onChange={(e, val) => setBarWidth((val as number) * 0.01)}/>
                        </Grid>
                        <Grid item xs={2}>
                            <Slider min={0}
                                    disabled={customCheck}
                                    valueLabelDisplay="auto"
                                    max={40}
                                    value={innerWidth * 100}
                                    onChange={(e, val) => setInnerWidth((val as number) * 0.01)}/>
                        </Grid>
                    </> : undefined}
                <Tooltip
                    title={<Typography align={'center'}>Low and high values not accurate, since they are calculated by
                        data taken every 10 minutes.</Typography>}>
                    <ErrorOutlineIcon style={{color: 'red'}}/>
                </Tooltip>
            </Grid>
            <Grid item xs={12}>
                <VegaLitePreview
                    className={classes.vega}
                    style={extraStyle ? extraStyle : {
                        background: '#f0f0f0',
                        boxShadow: '0 0 0 2px #72621d',
                        borderRadius: 4
                    }}
                    vegaConfig={vega} keyId={'vega-comp-candlestick'}/>
            </Grid>
        </Grid>
    )
}

export default PureCandleStickChart;
