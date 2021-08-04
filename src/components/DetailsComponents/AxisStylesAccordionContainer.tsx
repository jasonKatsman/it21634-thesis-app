import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    FormControlLabel,
    Grid,
    makeStyles,
    Radio,
    RadioGroup,
    Typography
} from "@material-ui/core";
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
    axis: vegaFieldType
    setAxis: (value: vegaFieldType) => void
    title?: string
}
const AxisStylesAccordionContainer: FC<AxisStylesAccordionContainerProps> = ({title, axis, setAxis}) => {
    const classes = useStyles()

    const onAxisInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAxis({...axis, axis: {...axis.axis, [e.target.name]: e.target.value}})
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
                        <Grid item xs={12}>
                            <Typography variant={'body1'}>Grid</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <RadioGroup aria-label="zero" name="zero" value={axis.axis?.grid ?? true}
                                        onChange={(event => setAxis({
                                            ...axis,
                                            axis: {...axis.axis, grid: event.target.value === 'true'}
                                        }))}
                            >
                                <FormControlLabel value={true} control={<Radio color={'primary'}/>} label="yes"/>
                                <FormControlLabel value={false} control={<Radio/>} label="no"/>
                            </RadioGroup>
                        </Grid>
                        {axis.axis?.grid ?
                            <Grid item xs={12} container>
                                <Grid item xs={12}>
                                    <Typography variant={'body1'}>Grid color</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <input type={'color'} name={'gridColor'} defaultValue={'gray'}
                                           value={axis.axis?.gridColor || 'white'}
                                           onChange={onAxisInputChange}/>
                                </Grid>
                            </Grid> : undefined}
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    )
}

export default AxisStylesAccordionContainer