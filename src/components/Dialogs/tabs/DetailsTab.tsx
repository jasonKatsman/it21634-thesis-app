import {Accordion, AccordionDetails, AccordionSummary, Grid, makeStyles, Typography} from "@material-ui/core";
import React, {FC} from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SelectAggregate from "../../common/SelectAggregate";
import markOptions from "../../../Dummy/markOptions.json";
import CustomOption from "../../common/CustomOption";

const useStyles = makeStyles(() => ({}))
type DetailsTabProps = {
    simpleStyles: any
    setSimpleStyles: (value: any) => void
}
const DetailsTab: FC<DetailsTabProps> = ({simpleStyles, setSimpleStyles}) => {
    const classes = useStyles()
    return (<Grid container>
        <Grid item xs={12}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="mark-content"
                    id="mark-header"
                >
                    <Typography>Mark options</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <SelectAggregate selectTitle={'Mark type'} value={simpleStyles.mark}
                                     onChange={(e => setSimpleStyles({
                                         ...simpleStyles,
                                         mark: e.target.value as string
                                     }))}>
                        {markOptions.map((option) => <CustomOption
                            value={option.value}>{option.title}</CustomOption>)}
                    </SelectAggregate>
                </AccordionDetails>
            </Accordion>
        </Grid>
        <Grid item xs={12}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="mark-content"
                    id="mark-header"
                >
                    <Typography>Mark styles</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <SelectAggregate selectTitle={'Mark type'} value={simpleStyles.mark}
                                     onChange={(e => setSimpleStyles({
                                         ...simpleStyles,
                                         mark: e.target.value as string
                                     }))}>
                        {markOptions.map((option) => <CustomOption
                            value={option.value}>{option.title}</CustomOption>)}
                    </SelectAggregate>
                </AccordionDetails>
            </Accordion>
        </Grid>
        <Grid item xs={12}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="sen-content"
                    id="ts-header"
                >
                    <Typography>Position options</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <SelectAggregate selectTitle={'Mark type'} value={simpleStyles.mark}
                                     onChange={(e => setSimpleStyles({
                                         ...simpleStyles,
                                         mark: e.target.value as string
                                     }))}>
                        {markOptions.map((option) => <CustomOption
                            value={option.value}>{option.title}</CustomOption>)}
                    </SelectAggregate>
                </AccordionDetails>
            </Accordion>
        </Grid>
    </Grid>)
}

export default DetailsTab