import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Divider, FormControlLabel,
    Grid,
    makeStyles, Radio,
    RadioGroup, Slider,
    Typography
} from "@material-ui/core";
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

}
const CombinationSettingsAccordionContainer: FC<CombinationAccordionContainerProps> = () => {
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
                            <Typography variant={'body1'}>Width</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Slider min={200} max={1200} valueLabelDisplay="auto" />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant={'body1'}>Height</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Slider min={200} max={1200} valueLabelDisplay="auto" />
                        </Grid>
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    )
}

export default CombinationSettingsAccordionContainer