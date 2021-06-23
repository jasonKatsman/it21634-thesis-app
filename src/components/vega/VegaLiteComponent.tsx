import React, {FC, useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core";
import * as vegaLite from "vega-lite";
import vegaEmbed from "vega-embed"

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
    selectedFields: { x: string, xType: string, y: string, yType: string }
    basicStyling?: any
}
const VegaLiteComponent: FC<VegaComponentProps> = ({basicStyling, data, type, selectedFields}) => {
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
                y: {field: selectedFields.y, type: selectedFields.yType},
                x: {
                    aggregate: 'average',
                    field: selectedFields.x,
                    type: selectedFields.xType,
                }
            }
        })

    }, [data, basicStyling, selectedFields, type])
    console.log(vlSpec)

    useEffect(() => {
        vegaEmbed('#chart', vlSpec).then(() => console.log('success')).catch((e) => console.log(e));

    }, [vlSpec])


    return (
        <div id={'chart'}/>
    );
}

export default VegaLiteComponent;
