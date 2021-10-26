import React, {FC, memo, useEffect, useRef, useState} from 'react';
import {Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import VegaLitePreview from "../vega/VegaLitePreview";
import {prepareTimeUnits} from "../../utils/prepareTimeUnits";
import {prepareTimeNumber} from "../../utils/prepareTimeNumber";
import ButtonNumberAdder from "../common/ButtonNumberAdder";

const useStyles = makeStyles((theme: Theme) => ({}))

interface coinProps {
    data: any[],
    field: string,
    time: string,
}

const GroupedChartsVega: FC<coinProps> = ({time, data, field}) => {

    const [vega, setVega] = useState<any>()
    const widthRef = useRef<any>()
    const [step, setStep] = useState(1)

    const calculateRefWidth = () => {
        const barWidth = (widthRef?.current?.offsetWidth - 250) / prepareTimeNumber(time)
        if (barWidth > 50) {
            return barWidth
        }
        return 50
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
            "autosize": {"type": "fit", "contains": "padding"},
            "width": calculateRefWidth(),
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
                    title: "",
                    "field": "date",
                    "type": "temporal",
                    "timeUnit": {
                        unit: prepareTimeUnits(time),
                        step: step
                    },
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
    }, [data, step])


    return (
        <Grid item container xs={12}>
            <Grid style={{margin: '0 12px 8px'}} item container alignItems={'center'} xs={12}>
                <Typography color={'primary'}
                            style={{marginRight: 12, fontSize: 14, fontWeight: 800}}>Time step</Typography>
                <ButtonNumberAdder step={step} setStep={setStep}/>
            </Grid>
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

export default memo(GroupedChartsVega);
