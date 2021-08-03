import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Divider,
    FormControlLabel,
    Grid,
    makeStyles,
    Radio,
    RadioGroup,
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
    vegaConfigs:any[]
    vegaCombination: any
    setVegaCombination: (value: any) => void
}
const CombinationAccordionContainer: FC<CombinationAccordionContainerProps> = ({vegaConfigs,
                                                                                   vegaCombination,
                                                                                   setVegaCombination
                                                                               }) => {
    const classes = useStyles()

    const getValue = () => {
        const key = Object.keys(vegaCombination)
        return key[0]
    }

    const changeCombineTechnique = (e: any) => {
        const key = Object.keys(vegaCombination)
        const newValue = e.target.value
        if (newValue === 'layer') {
            let selected = false
            let preparedVega = vegaConfigs.map((item: any, i: number) => {
                if (!selected && item?.selection) {
                    selected = true
                    return {...item, name: `chart-COMBINED-${i}`}
                }
                return {...item, selection: undefined, name: `chart-COMBINED-${i}`}
            })
            setVegaCombination({[e.target.value]: [...preparedVega]})
            return
        }
        setVegaCombination({[e.target.value]: [...vegaCombination[key[0]]]})
    }

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="mark-content"
                id="mark-header"
            >
                <Typography>Combination Method</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
                <Grid container className={classes.inputs}>
                    <Grid container item xs={12}>
                        <Grid item xs={12}>
                            <Typography variant={'body1'}>Choose combination method</Typography>
                            <Divider/>
                        </Grid>
                        <Grid item xs={12}>
                            <RadioGroup aria-label="combine" name="combine" value={getValue()}
                                        onChange={changeCombineTechnique}>
                                <FormControlLabel value="vconcat" control={<Radio color={'primary'}/>}
                                                  label="vertical concat"/>
                                <FormControlLabel value="hconcat" control={<Radio color={'primary'}/>}
                                                  label="horizontal concat"/>
                                <FormControlLabel value="layer" control={<Radio color={'primary'}/>}
                                                  label="layer chart"/>
                            </RadioGroup>
                        </Grid>
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    )
}

export default CombinationAccordionContainer