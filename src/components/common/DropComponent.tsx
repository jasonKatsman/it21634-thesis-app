import React, {FC} from "react";
import {Box, BoxProps, makeStyles, Paper, PaperProps, Typography} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    cordBox: {
        position: 'relative',
        padding: 32,
        border: '1px solid lightblue',
        minWidth: 100,
        minHeight: 40
    },
    label: {
        position: "absolute",
        top: 0,
        left: 0,
        padding: 8
    }


}))
type DropComponentProps = {
    value: string
    topLabel: string
}

const DropComponent: FC<DropComponentProps & PaperProps> = ({value, topLabel, ...props}) => {
    const classes = useStyles();
    return <Paper
        elevation={3}
        onDragOver={(e) => e.preventDefault()}
        className={classes.cordBox}
        {...props}

    ><Typography variant={'h6'}>{value}</Typography>
        <Box className={classes.label}><Typography variant={'subtitle2'}>{topLabel}</Typography></Box></Paper>
    // return React.createElement("div", {ref: chartRef});
}

export default DropComponent