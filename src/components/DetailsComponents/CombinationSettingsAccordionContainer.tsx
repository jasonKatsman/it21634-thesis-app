import {Accordion, AccordionDetails, AccordionSummary, Grid, makeStyles, Typography} from "@material-ui/core";
import React, {FC} from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


const useStyles = makeStyles(() => ({
    accordionDetails: {
        borderTop: '1px solid rgba(0, 0, 0, 0.16)',
        background: 'rgba(0, 0, 0, 0.02)'
    },
    inputs: {
        '& *': {
            color: 'obsidian'
        },
    }
}))
type CombinationAccordionContainerProps = {
    vegaCombination: any
    setVegaCombination: (value: any) => void
}
const CombinationSettingsAccordionContainer: FC<CombinationAccordionContainerProps> = ({
                                                                                           vegaCombination,
                                                                                           setVegaCombination
                                                                                       }) => {
    const classes = useStyles()

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="mark-content"
                id="mark-header"
            >
                <Typography>Settings</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
                <Grid container className={classes.inputs}>
                    <Grid container item xs={12}>
                        <Grid item xs={12}>
                            <Typography variant={'body1'}>background color</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <input value={vegaCombination.background} type={'color'}
                                   onChange={(e) => setVegaCombination({
                                       ...vegaCombination,
                                       background: e.target.value
                                   })}/>
                        </Grid>
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    )
}

export default CombinationSettingsAccordionContainer