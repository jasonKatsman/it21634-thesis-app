import React, {FC, useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core";
import vegaEmbed from "vega-embed"
import {Mark, Transform, vegaEncodingType, vegaFieldType} from "../../Types/VegaFieldType";

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
    encoding: vegaEncodingType,
    basicStyling?: any,
    mark: Mark
    transform: Transform
}
const VegaLiteComponent: FC<VegaComponentProps> = ({
                                                       transform,
                                                       mark,
                                                       encoding,
                                                       xAxis,
                                                       yAxis,
                                                       basicStyling,
                                                       data,
                                                       type
                                                   }) => {
    const classes = useStyles();
    const [vlSpec, setVlSpec] = useState<any>()
    // "quantitative" if the datum is a number
    // "nominal" if the datum is a string
    // "temporal" if the datum is a date time object
    useEffect(() => {
        const selection = {
            "selection": xAxis.field && yAxis.field ? {
                "grid": {
                    "type": "interval", "bind": "scales"
                }
            } : undefined
        }
        setVlSpec({
            data: {
                values: [...data]
            },
            ...selection,
            ...basicStyling,
            ...transform,
            ...mark,
            encoding: {
                ...encoding,
                y: {
                    ...yAxis
                },
                x: {

                    ...xAxis
                },
            }
        })

    }, [data, basicStyling, transform, xAxis, yAxis, type, mark])
    console.log(vlSpec)

    useEffect(() => {
        vegaEmbed('#chart', vlSpec).then(() => console.log('success')).catch((e) => console.log(e));

    }, [vlSpec])


    return (
        <div id={'chart'}/>
    );
}

export default VegaLiteComponent;
