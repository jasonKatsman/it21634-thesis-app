import React, {FC} from "react";
import {Box, BoxProps, Input, makeStyles, Paper, PaperProps, Typography} from "@material-ui/core";
import {vegaFieldType} from "../../Types/VegaFieldType";

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
    value: vegaFieldType
    topLabel: string
    onInputChange: (e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void

}

const DropComponent: FC<DropComponentProps & PaperProps> = ({onInputChange, value, topLabel, ...props}) => {
    const classes = useStyles();
    return <Paper
        elevation={3}
        onDragOver={(e) => e.preventDefault()}
        className={classes.cordBox}
        {...props}

    ><Typography variant={'h6'}>{value.field}</Typography>
        <Box className={classes.label}><Typography variant={'subtitle2'}>{topLabel}</Typography></Box>
        <Input name={'title'} value={value.title} onChange={onInputChange}/>
        <select name={'type'} value={value.type} onChange={onInputChange}>
            <option value={'nominal'}>Nominal(string)</option>
            <option value={'quantitative'}>quantitative(number)</option>
        </select>
    </Paper>
    // return React.createElement("div", {ref: chartRef});
}

export default DropComponent