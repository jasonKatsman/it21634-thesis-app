import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Grid,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import React, {FC, useState} from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {Transform} from "../../Types/VegaFieldType";
import SelectAggregate from "../common/SelectAggregate";
import fieldTypes from "../../Dummy/fieldTypes.json";
import timeUnitOptions from "../../Dummy/timeUnitOptions.json";

import CustomOption from "../common/CustomOption";

const useStyles = makeStyles(() => ({
    accordionDetails: {
        borderTop: '1px solid rgba(0, 0, 0, 0.16)',
        background: 'rgba(0, 0, 0, 0.02)'
    },
    inputs: {
        '& *': {
            color: 'obsidian'
        },
        '&>:nth-child(n)': {
            marginBottom: 12,
            paddingBottom: 12,
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        }
    }
}))
type FilterAccordionContainerProps = {
    transform: Transform
    setTransform: (value: Transform) => void
}
const FilterAccordionContainer: FC<FilterAccordionContainerProps> = ({transform, setTransform}) => {
    const classes = useStyles()
    const [fieldType, setFieldType] = useState('')
    const prepareFieldOptions = () => {
        return fieldTypes.map((option) => <CustomOption
            value={option.field}>{option.field}</CustomOption>)
    }

    const prepareTimeUnitOptions = () => {
        return timeUnitOptions.map((option) => <CustomOption
            value={option.value}>{option.title}</CustomOption>)
    }

    const onInputChange = (value: any, index: number) => {
        let array = transform?.transform?.[0]?.filter?.range || []
        array[index] = value
        if (transform?.transform?.[0]?.filter)
            setTransform({
                transform: [{
                    filter: {
                        ...transform.transform[0].filter,
                        range: array
                    }
                }]
            })
    }


    const prepareRangeInputs = () => {
        if (fieldType === 'quantitative') {
            return <>
                <Grid item xs={6}><TextField type={'number'} onChange={(e) => onInputChange(e.target.value, 0)}
                                             placeholder={'From'}/></Grid>
                <Grid item xs={6}><TextField type={'number'} onChange={(e) => onInputChange(e.target.value, 1)}
                                             placeholder={'To'}/></Grid>

            </>
        }
        if (fieldType === 'nominal') {
            return <>
                <Grid item xs={6}><TextField onChange={(e) => onInputChange(e.target.value, 0)}
                                             placeholder={'From'}/></Grid>
                <Grid item xs={6}><TextField onChange={(e) => onInputChange(e.target.value, 1)}
                                             placeholder={'To'}/></Grid>

            </>
        }
        if (fieldType === 'temporal') {
            return <>
                <Grid item xs={12}>
                    <Typography variant={'body1'}>Time unit</Typography>
                </Grid>
                <Grid item xs={12}>
                    <SelectAggregate value={transform?.transform?.[0]?.filter?.timeUnit || ''}
                                     onChange={(event => {
                                         if (transform?.transform?.[0]?.filter)
                                             setTransform({
                                                 transform: [{
                                                     filter: {
                                                         ...transform.transform[0].filter,
                                                         timeUnit: event.target.value as string
                                                     }
                                                 }]
                                             })
                                     })}>
                        {prepareTimeUnitOptions()}
                    </SelectAggregate>
                </Grid>
                <Grid item xs={6}><TextField type={'number'} onChange={(e) => onInputChange(e.target.value, 0)}
                                             placeholder={'From'}/></Grid>
                <Grid item xs={6}><TextField type={'number'} onChange={(e) => onInputChange(e.target.value, 1)}
                                             placeholder={'To'}/></Grid>

            </>
        }
        return <>
            <Grid item xs={6}><TextField onChange={(e) => onInputChange(e.target.value, 0)} type={'number'}
                                         placeholder={'From'}/></Grid>
            <Grid item xs={6}><TextField onChange={(e) => onInputChange(e.target.value, 1)} type={'number'}
                                         placeholder={'To'}/></Grid>
        </>

    }


    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="mark-content"
                id="mark-header"
            >
                <Typography>Filter Options</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
                <Grid container className={classes.inputs}>
                    <Grid container item xs={12}>
                        <Grid item xs={12}>
                            <Typography variant={'body1'}>Field</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <SelectAggregate value={transform?.transform?.[0]?.filter?.field || ''}
                                             onChange={(event => {
                                                 const selectedField = fieldTypes.find(field => field.field === event.target.value)
                                                 if (selectedField) {
                                                     setFieldType(selectedField.type)
                                                     setTransform({transform: [{filter: {field: selectedField.field}}]})
                                                 }
                                             })}>
                                {prepareFieldOptions()}
                            </SelectAggregate>
                        </Grid>
                    </Grid>

                    {/*interpolate is for line & area marks. It finds the middle value between two data points*/}
                    {fieldType ? <Grid container item xs={12}>
                        <Grid item xs={12}>
                            <Typography variant={'body1'}>Range</Typography>
                        </Grid>
                        <Grid item container xs={12}>
                            {prepareRangeInputs()}
                        </Grid>
                    </Grid> : undefined}
                </Grid>

            </AccordionDetails>
        </Accordion>
    )
}

export default FilterAccordionContainer