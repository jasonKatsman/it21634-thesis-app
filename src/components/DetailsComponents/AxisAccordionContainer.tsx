import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    FormControlLabel,
    Grid,
    makeStyles,
    Radio,
    RadioGroup,
    Slider,
    TextField,
    Typography
} from "@material-ui/core";
import React, {FC} from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import aggregateOptions from "../../Dummy/aggregateOptions.json";
import CustomOption from "../common/CustomOption";
import SelectAggregate from "../common/SelectAggregate";
import timeUnitOptions from "../../Dummy/timeUnitOptions.json";
import {vegaFieldType} from "../../Types/VegaFieldType";


const useStyles = makeStyles(() => ({
    accordionDetails: {
        borderTop: '1px solid rgba(0, 0, 0, 0.16)',
        background: 'rgba(0, 0, 0, 0.02)'
    },
    radios: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
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
type AxisAccordionContainerProps = {
    title: any
    axis: vegaFieldType
    setAxis: (value: vegaFieldType) => void
}
const AxisAccordionContainer: FC<AxisAccordionContainerProps> = ({axis, setAxis, title}) => {
    const classes = useStyles()


    const prepareOptions = () => {
        return aggregateOptions.map(option => {
            return <CustomOption value={option.value}>{option.title}</CustomOption>
        })
    }

    const prepareDateOptions = () => {
        return timeUnitOptions.map(option => {
            return <CustomOption value={option.value}>{option.title}</CustomOption>
        })
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.name, e.target.value)
        setAxis({...axis, [e.target.name]: e.target.value})
    }

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="sen-content"
                id="ts-header"
            >
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>

                <Grid container className={classes.inputs}>
                    <Grid container item xs={12}>
                        <Grid item xs={12}>
                            <Typography variant={'body1'}>Title</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField value={axis.title} name={'title'} onChange={onInputChange}/>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={12}>
                            <Typography variant={'body1'}>Aggregation</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <SelectAggregate value={axis.aggregate} name={'aggregate'}
                                             onChange={(e: any) => onInputChange(e)}>{prepareOptions()}</SelectAggregate>
                        </Grid>
                    </Grid>

                    {axis.type !== 'temporal' ? <Grid container item xs={12}>
                        <Grid item xs={12}>
                            <Typography variant={'body1'}>Bin Data</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <RadioGroup aria-label="quiz" name="bin" value={axis.bin ?? false}
                                        onChange={(event => setAxis({...axis, bin: event.target.value === 'true'}))}
                                        className={classes.radios}>
                                <FormControlLabel value={true} control={<Radio color={'primary'}/>} label="yes"/>
                                <FormControlLabel value={false} control={<Radio/>} label="no"/>
                            </RadioGroup>
                        </Grid>
                    </Grid> : undefined}

                    {axis.type === 'temporal' ? <Grid container item xs={12}>
                        <Grid item xs={12}>
                            <Typography variant={'body1'}>Time Unit</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <SelectAggregate value={axis.timeUnit} name={'timeUnit'}
                                             onChange={(e: any) => onInputChange(e)}>{prepareDateOptions()}</SelectAggregate>
                        </Grid>
                    </Grid> : undefined}
                    {axis.type === 'temporal' ? <Grid container item xs={12}>
                        <Grid item xs={12}>
                            <Typography variant={'body1'}>Band Position (shift)</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Slider name={'bandPosition'} value={axis?.bandPosition ? axis.bandPosition * 10 : 0}
                                    onChange={(val, newVal) => {
                                        console.log(newVal as number / 10)
                                        setAxis({...axis, bandPosition: newVal as number / 10})
                                    }}
                                    min={0}
                                    max={10}
                                    scale={(x) => x / 10}
                                    valueLabelDisplay="auto"/>
                        </Grid>
                    </Grid> : undefined}

                    {axis.type !== 'temporal' ? <Grid container item xs={12}>
                        <Grid item xs={12}>
                            Start at zero:
                            <RadioGroup aria-label="zero" name="zero" value={axis.scale?.zero ?? true}
                                        onChange={(event => setAxis({
                                            ...axis,
                                            scale: {zero: event.target.value === 'true'}
                                        }))}
                                        className={classes.radios}>
                                <FormControlLabel value={true} control={<Radio color={'primary'}/>} label="yes"/>
                                <FormControlLabel value={false} control={<Radio/>} label="no"/>
                            </RadioGroup>
                        </Grid>
                    </Grid> : undefined}
                </Grid>

            </AccordionDetails>
        </Accordion>
    )
}

export default AxisAccordionContainer