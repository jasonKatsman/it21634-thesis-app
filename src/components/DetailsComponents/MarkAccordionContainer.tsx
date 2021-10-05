import {Accordion, AccordionDetails, AccordionSummary, Grid, makeStyles, Typography} from "@material-ui/core";
import React, {FC} from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SelectAggregate from "../common/SelectAggregate";
import interpolateOptions from "../../Dummy/interpolateOptions.json";
import CustomOption from "../common/CustomOption";
import markOptions from "../../Dummy/markOptions.json";
import {Mark, vegaFieldType} from "../../Types/VegaFieldType";

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
type DetailsTabProps = {
    mark: Mark
    setMark: (value: Mark) => void
    axisX: vegaFieldType
    setAxisX: (value: vegaFieldType) => void
    axisY: vegaFieldType
    setAxisY: (value: vegaFieldType) => void
}
const MarkAccordionContainer: FC<DetailsTabProps> = ({axisX, setAxisX, setAxisY, axisY, mark, setMark}) => {
    const classes = useStyles()
    const prepareMarkOptions = () => {
        return markOptions.map((option) => <CustomOption
            value={option.value}>{option.title}</CustomOption>)
    }
    const prepareInterpolateOptions = () => {
        return interpolateOptions.map((option) => <CustomOption
            value={option.value}>{option.title}</CustomOption>)
    }
    const onMarkChange = (e: any) => {
        if (e.target.value === 'bar') {
            if (axisX.type !== 'temporal') {
                setAxisX({...axisX, aggregate: 'average'})
                if (axisY.type === 'temporal') {
                    setAxisY({...axisY, timeUnit: 'monthdatehours'})
                }
            }
            if (axisY.type !== 'temporal') {
                setAxisY({...axisY, aggregate: 'average'})
                if (axisX.type === 'temporal') {
                    setAxisX({...axisX, timeUnit: 'monthdatehours'})
                }
            }
        }
        setMark({
            mark: {...mark.mark, type: e.target.value as string}
        })
    }
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="mark-content"
                id="mark-header"
            >
                <Typography>Mark options</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
                <Grid container className={classes.inputs}>
                    <Grid container item xs={12}>
                        <Grid item xs={12}>
                            <Typography variant={'body1'}>Aggregation</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <SelectAggregate selectTitle={'Mark type'} value={mark.mark.type}
                                             onChange={onMarkChange}>
                                {prepareMarkOptions()}
                            </SelectAggregate> </Grid>
                    </Grid>

                    {/*interpolate is for line & area marks. It finds the middle value between two data points*/}
                    {mark.mark.type === 'line' ? <Grid container item xs={12}>
                        <Grid item xs={12}>
                            <Typography variant={'body1'}>Interpolate</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <SelectAggregate disabled={mark.mark.type !== 'line' && mark.mark.type !== 'area'}
                                             value={mark.mark.interpolate}
                                             onChange={(e => setMark({
                                                 mark: {...mark.mark, interpolate: e.target.value as string}
                                             }))}>
                                {prepareInterpolateOptions()}
                            </SelectAggregate> </Grid>
                    </Grid> : undefined}
                </Grid>

            </AccordionDetails>
        </Accordion>
    )
}

export default MarkAccordionContainer