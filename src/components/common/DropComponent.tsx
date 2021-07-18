import React, {FC} from "react";
import {Box, Checkbox, Grid, Input, makeStyles, Paper, PaperProps, Typography} from "@material-ui/core";
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
    },
    aggregateSelect: {
        maxWidth: 100
    }


}))
type DropComponentProps = {
    value: vegaFieldType
    setValue: (values: vegaFieldType) => void
    topLabel: string
    onInputChange: (e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement & any>) => void

}

const DropComponent: FC<DropComponentProps & PaperProps> = ({onInputChange, setValue, value, topLabel, ...props}) => {
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
        <select name={'aggregate'} className={classes.aggregateSelect} value={value.aggregate} placeholder={'aggregate'}
                onChange={onInputChange}>
            <option value={''}>none</option>
            <option value={'valid'}>VALID (COUNT OF field values that are Valid)</option>
            <option value={'average'}>AVERAGE (the mean (average) field value)</option>
            <option value={'count'}>COUNT (Total count of data in group)</option>
            <option value={'values'}>VALUES (a list of data objects in the group)</option>
            <option value={'missing'}>MISSING (the count of missing values)</option>
            <option value={'distinct'}>DISTINCT (the count of distinct values)</option>
            <option value={'sum'}>SUM (the sum of field values)</option>
            <option value={'product'}>Product (the product of field values)</option>
            <option value={'mean'}>MEAN (the mean (average) field value)</option>
            <option value={'variance'}>VARIANCE (variance of field values)</option>
            <option value={'variancep'}>POPULATION VARIANCE (variance of field values)</option>
            <option value={'stdev'}>STANDARD DEVIATION (of field values)</option>
            <option value={'stderr'}>STANDARD ERROR (standard error of field values)</option>
            <option value={'median'}>MEDIAN</option>
            <option value={'q1'}>LOWER QUARTILE BOUNDARY</option>
            <option value={'q3'}>UPPER QUARTILE BOUNDARY</option>
            <option value={'ci0'}>LOWER QUARTILE BOUNDARY 95%</option>
            <option value={'ci1'}>UPPER QUARTILE BOUNDARY 95%</option>
            <option value={'min'}>MINIMUM VALUE</option>
            <option value={'max'}>MAXIMUM VALUE</option>
            <option value={'argmin'}>ARG MIN</option>
            <option value={'argmax'}>ARG MAX</option>
        </select>
        <Grid container alignItems={'center'}>
            <Typography variant={'subtitle2'}>DISCRETIZE</Typography> <Checkbox disabled={value.type !== 'quantitative'}
                                                                                checked={value.bin} name={'bin'}
                                                                                onChange={event => setValue({
                                                                                    ...value,
                                                                                    [event.target.name]: event.target.checked
                                                                                })}/>
        </Grid>
    </Paper>
    // return React.createElement("div", {ref: chartRef});
}

export default DropComponent