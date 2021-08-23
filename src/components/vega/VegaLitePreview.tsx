import React, {FC, useEffect} from 'react';
import {BoxProps, makeStyles} from "@material-ui/core";
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
    vegaConfig: any
    keyId: string
}
const VegaLitePreview: FC<VegaComponentProps & BoxProps> = ({vegaConfig, keyId = 'idkey', ...props}) => {
    const classes = useStyles();

    useEffect(() => {
        vegaEmbed(`#${keyId}`, vegaConfig).then(() => console.log('success')).catch((e) => console.log(e));
    }, [vegaConfig])


    return (
        <div id={keyId} {...props}/>
    );
}

export default VegaLitePreview;
