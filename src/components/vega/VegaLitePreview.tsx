import React, {FC, useEffect} from 'react';
import {BoxProps, makeStyles} from "@material-ui/core";
import vegaEmbed from "vega-embed"

const useStyles = makeStyles(() => ({
    root: {
        '&.vega-embed.has-actions': {
            padding: 0
        },
        '& summary': {
            border: '10px solid red',
            background: 'red',
            opacity: '0.2 !important',
            transform: 'scale(0.7)',
            '&:hover': {
                opacity: '0.5 !important',
                transform: 'scale(0.7)'
            },

        }
    }
}))
type VegaComponentProps = {
    className?: any
    vegaConfig: any
    keyId: string
}
const VegaLitePreview: FC<VegaComponentProps & BoxProps> = ({className, vegaConfig, keyId = 'idkey', ...props}) => {
    const classes = useStyles();

    useEffect(() => {
        vegaEmbed(`#${keyId}`, vegaConfig).then(() => console.log('success')).catch((e) => console.log('e'));
    }, [vegaConfig])


    return (
        <div className={`${classes.root} ${className}`} id={keyId} {...props}/>
    );
}

export default VegaLitePreview;
