import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Checkbox,
    Grid,
    makeStyles,
    Slider,
    Typography
} from "@material-ui/core";
import React, {ChangeEvent, FC} from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {vegaSimpleStylesType} from "../../Types/VegaFieldType";

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
type GeneralStylesAccordionContainerProps = {
    simpleStyles: vegaSimpleStylesType
    setSimpleStyles: (value: vegaSimpleStylesType) => void
    title?: string
}
const GeneralStylesAccordionContainer: FC<GeneralStylesAccordionContainerProps> = ({
                                                                                       title,
                                                                                       simpleStyles,
                                                                                       setSimpleStyles
                                                                                   }) => {
    const classes = useStyles()

    const onSlidersChange = (value: number, name: string) => {
        setSimpleStyles({...simpleStyles, [name]: value})
    }
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSimpleStyles({...simpleStyles, [e.target.name]: e.target.value})
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
                            <Typography variant={'body1'}>Canvas Width</Typography>
                        </Grid>
                        <Grid item xs={12} container alignItems={'center'} wrap={'nowrap'}>
                            <Slider name={'width'}
                                    value={simpleStyles.width}
                                    onChange={(val, newVal) => onSlidersChange(newVal as number, 'width')}
                                    min={150}
                                    max={1000}
                                    valueLabelDisplay="auto"/>
                            {/*<Checkbox className={classes.checkbox} checked={simpleStyles.width === 'container'}*/}
                            {/*          onClick={() => setSimpleStyles({...simpleStyles, width: 'container'})}/>*/}
                        </Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={12}>
                            <Typography variant={'body1'}>Canvas Height</Typography>
                        </Grid>
                        <Grid item container alignItems={'center'} wrap={'nowrap'} xs={12}>
                            <Slider name={'height'} value={simpleStyles.height}
                                    onChange={(val, newVal) => onSlidersChange(newVal as number, 'height')}
                                    min={150}
                                    max={1000}
                                    valueLabelDisplay="auto"/>
                            {/*<Checkbox className={classes.checkbox} checked={simpleStyles.height === 'container'}*/}
                            {/*          onClick={() => setSimpleStyles({...simpleStyles, height: 'container'})}/>*/}
                        </Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={12}>
                            <Typography variant={'body1'}>Canvas Background</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <input type={'color'} name={'background'} defaultValue={'red'}
                                   value={simpleStyles.background || 'white'}
                                   onChange={onInputChange}/>
                        </Grid>
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    )
}

export default GeneralStylesAccordionContainer