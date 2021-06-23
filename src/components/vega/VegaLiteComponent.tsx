import React, {FC, useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core";
import * as vegaLite from "vega-lite";
import vegaEmbed from "vega-embed"
import {vegaFieldType} from "../../Types/VegaFieldType";

const useStyles = makeStyles(() => ({
    list: {
        maxHeight: 500,
        overflow: 'auto'
    },
    listItem: {
        cursor: 'pointer',
        '& > :nth-child(n)': {
            pointerEvents: 'none'
        }
    }
}))
type VegaComponentProps = {
    data: any[]
    type?: string,
    xAxis: vegaFieldType,
    yAxis: vegaFieldType,

    basicStyling?: any
}
const VegaLiteComponent: FC<VegaComponentProps> = ({xAxis, yAxis, basicStyling, data, type}) => {
    const classes = useStyles();
    const [vlSpec, setVlSpec] = useState<any>()
    // "quantitative" if the datum is a number
    // "nominal" if the datum is a string
    // "temporal" if the datum is a date time object

    useEffect(() => {
        setVlSpec({
            data: {
                values: [...data]
            },
            ...basicStyling,
            encoding: {
                y: {
                    ...yAxis
                },
                x: {

                    ...xAxis
                }
            }
        })

    }, [data, basicStyling, xAxis, yAxis, type])
    console.log(vlSpec)

    useEffect(() => {
        vegaEmbed('#chart', vlSpec).then(() => console.log('success')).catch((e) => console.log(e));

    }, [vlSpec])


    return (
        <div id={'chart'}/>
    );
}

export default VegaLiteComponent;
