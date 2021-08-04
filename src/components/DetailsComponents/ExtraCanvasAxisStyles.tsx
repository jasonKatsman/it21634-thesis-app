import {Accordion, AccordionDetails, AccordionSummary, Grid, makeStyles, Typography} from "@material-ui/core";
import React, {ChangeEvent, FC} from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {vegaFieldType} from "../../Types/VegaFieldType";

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
type AxisStylesAccordionContainerProps = {
    axisY: vegaFieldType
    setAxisY: (value: vegaFieldType) => void
    axisX: vegaFieldType
    setAxisX: (value: vegaFieldType) => void
    title?: string
}
const ExtraCanvasAxisStyles: FC<AxisStylesAccordionContainerProps> = ({title, axisX, setAxisX,axisY, setAxisY}) => {
    const classes = useStyles()

    const onAxisInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAxisX({...axisX, axis: {...axisX.axis, [e.target.name]: e.target.value}})
        setAxisY({...axisY, axis: {...axisY.axis, [e.target.name]: e.target.value}})

    }

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="mark-content"
                id="mark-header"
            >
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
                <Grid container className={classes.inputs}>
                    <Grid container item xs={12}>
                        <Grid item xs={12} container>
                            <Grid item xs={12}>
                                <Typography variant={'body1'}>Domain color</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <input type={'color'} name={'domainColor'} defaultValue={'gray'}
                                       value={axisX.axis?.domainColor || 'gray'}
                                       onChange={onAxisInputChange}/>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container>
                            <Grid item xs={12}>
                                <Typography variant={'body1'}>Label color</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <input type={'color'} name={'labelColor'} defaultValue={'gray'}
                                       value={axisX.axis?.labelColor || 'black'}
                                       onChange={onAxisInputChange}/>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container>
                            <Grid item xs={12}>
                                <Typography variant={'body1'}>Domain color</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <input type={'color'} name={'titleColor'} defaultValue={'gray'}
                                       value={axisX.axis?.titleColor || 'black'}
                                       onChange={onAxisInputChange}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    )
}

export default ExtraCanvasAxisStyles