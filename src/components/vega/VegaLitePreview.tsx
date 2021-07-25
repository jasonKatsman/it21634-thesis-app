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
vegaConfig:any
    keyId:string
}
const VegaLitePreview: FC<VegaComponentProps> = ({vegaConfig,keyId='idkey'}) => {
    const classes = useStyles();

    useEffect(() => {
        vegaEmbed(`#${keyId}`, vegaConfig).then(() => console.log('success')).catch((e) => console.log(e));
    }, [vegaConfig])


    return (
        <div id={keyId}/>
    );
}

export default VegaLitePreview;
