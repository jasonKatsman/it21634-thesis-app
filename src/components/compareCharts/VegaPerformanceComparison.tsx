import React, {FC, useEffect, useState} from 'react';
import {Grid, makeStyles, Theme} from "@material-ui/core";
import VegaLitePreview from "../vega/VegaLitePreview";

const useStyles = makeStyles((theme: Theme) => ({}))

interface coinProps {
    data: any[],
}

const VegaPerformanceComparison: FC<coinProps> = ({data}) => {

    const [vega, setVega] = useState<any>()

    useEffect(() => {
        let dataArray: any[] = []
        data.forEach((coin) => {
            coin.forEach((item: any) => {
                const initialPrice = coin[0].current_price
                const pricePercentage = (100 - (initialPrice * 100 / item.current_price)).toFixed(3)
                dataArray = [...dataArray, {percentage: pricePercentage, date: item.date, name: item.name, price:item.current_price}]
            })
        })
        setVega({
            "selection": {"grid": {"type": "interval", "bind": "scales"}},
            "width": "container",
            "height": "200",
            background: '#f0f0f0',
            "data": {"values": dataArray},
            "mark": {
                "type": "line",
                "point": {
                    "filled": false,
                    "fill": "white",
                    "opacity": 0.5
                },
                "tooltip": true
            },
            "encoding": {
                "tooltip": [
                    {"field": "name", "type": "nominal"},
                    {"field": "percentage", "type": "quantitative"},
                    {"field": "price", "type": "quantitative"},
                    {"timeUnit": "yearmonthdate", "field": "date","title":"date"}
                ],
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
                    "field": "percentage", "title": "percentage %", "type": "quantitative", "axis": {
                        "gridColor": "lightgray",
                        "labelColor": "#02254b",
                        "titleColor": "#02254b"
                    }
                },
                "color": {"field": "name", "type": "nominal"}
            }
        })
        console.log(dataArray)
    }, [data])

    return (
        <Grid item container xs={12}>
            <Grid item xs={12}>
                <VegaLitePreview
                    style={{width: '100%', background: '#f0f0f0', boxShadow: '0 0 0 2px #72621d', borderRadius: 4}}
                    vegaConfig={vega} keyId={'vega-comp-performance'}/>
            </Grid>
        </Grid>
    )
}

export default VegaPerformanceComparison;
