import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Checkbox,
    FormControlLabel,
    Grid,
    makeStyles,
    Radio,
    RadioGroup,
    Slider,
    Typography
} from "@material-ui/core";
import React, {FC} from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {Mark} from "../../Types/VegaFieldType";

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
type MarkStylesAccordionContainerProps = {
    mark: Mark
    setMark: (value: Mark) => void
    title?: string
}
const MarkStylesAccordionContainer: FC<MarkStylesAccordionContainerProps> = ({title, mark, setMark}) => {
    const classes = useStyles()
    const onValuesChange = (e: any) => {
        setMark({...mark, mark: {...mark.mark, [e.target.name]: e.target.value}})
    }

    const onPointChange = (e: any) => {
        setMark({
            ...mark,
            mark: {...mark.mark, point: {...mark.mark.point, [e.target.name]: e.target.value}}
        })
    }

    const preparePointSettings = () => {
        return (
            <Grid container item xs={12}>
                <Grid item container alignItems={'center'} xs={12}>
                    <Typography variant={'body1'}>Points</Typography>
                    <Checkbox checked={!!mark.mark?.point}
                              onClick={() => setMark({
                                  ...mark,
                                  mark: {
                                      ...mark.mark,
                                      point: mark.mark.point ? undefined : {
                                          filled: false,
                                          fill: 'white',
                                          color: 'black',
                                          opacity: 0.6
                                      }
                                  }
                              })}
                    />
                </Grid>
                {mark.mark.point ?
                    <Grid item container xs={12}>
                        <Grid item xs={12}>
                            Inner color:
                        </Grid>
                        <Grid item xs={12}>
                            <input type={'color'} name={'fill'} defaultValue={'rgb(76, 120, 168)'}
                                   value={mark.mark?.point?.fill || 'red'}
                                   onChange={onPointChange}/>
                        </Grid>
                        <Grid item xs={12}>
                            Border color:
                        </Grid>
                        <Grid item xs={12}>
                            <input type={'color'} name={'color'} defaultValue={'red'}
                                   value={mark.mark?.point?.color || 'red'}
                                   onChange={onPointChange}/>
                        </Grid>
                        <Grid item xs={12}>
                            opacity:
                        </Grid>
                        <Grid item xs={12}>
                            <Slider value={mark?.mark?.point?.opacity ? mark.mark.point.opacity * 10 : 0}
                                    onChange={(val, newVal) => {
                                        setMark({
                                            ...mark,
                                            mark: {
                                                ...mark.mark,
                                                point: {...mark.mark.point, opacity: newVal as number / 10}
                                            }
                                        })
                                    }}
                                    min={0}
                                    max={10}
                                    scale={(val) => val / 10}
                                    valueLabelDisplay="auto"/>
                        </Grid>
                    </Grid> : undefined}
            </Grid>)
    }

    const prepareSlider = () => {
        if (mark.mark.type === 'line') {
            return <Slider value={mark.mark.strokeWidth ?? 1}
                           onChange={(val, newVal) => {
                               setMark({...mark, mark: {...mark.mark, strokeWidth: newVal as number}})
                           }}
                           min={1}
                           max={10}
                           valueLabelDisplay="auto"/>
        }
        if (mark.mark.type === 'bar') {
            return <Slider value={mark.mark.width ?? 1}
                           onChange={(val, newVal) => {
                               setMark({...mark, mark: {...mark.mark, width: newVal as number}})
                           }}
                           min={5}
                           max={100}
                           valueLabelDisplay="auto"/>
        }
        return <Slider value={mark.mark.size ?? 1}
                       onChange={(val, newVal) => {
                           setMark({...mark, mark: {...mark.mark, size: newVal as number}})
                       }}
                       min={1}
                       max={1000}
                       valueLabelDisplay="auto"/>
    }
console.log(mark.mark.type)
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
                            <Typography variant={'body1'}>{mark.mark.type} color</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <input type={'color'} name={'color'} defaultValue={'rgb(76, 120, 168)'}
                                   value={mark.mark?.color || 'red'}
                                   onChange={onValuesChange}/> {mark.mark?.color}</Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={12}>
                            <Typography variant={'body1'}>{mark.mark.type} size</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            {prepareSlider()}
                        </Grid>
                    </Grid>

                    {mark.mark.type === 'bar' || mark.mark.type === 'square' ? <Grid container item xs={12}>
                        <Grid item xs={12}>
                            <Typography variant={'body1'}>{mark.mark.type} Radius</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Slider value={mark.mark.cornerRadius ?? 0}
                                    onChange={(val, newVal) => {
                                        setMark({...mark, mark: {...mark.mark, cornerRadius: newVal as number}})
                                    }}
                                    min={1}
                                    max={10}
                                    valueLabelDisplay="auto"/>
                        </Grid>
                    </Grid> : undefined}

                    <Grid container item xs={12}>
                        <Grid item xs={12}>
                            <Typography variant={'body1'}>{mark.mark.type} opacity</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Slider value={mark.mark?.opacity ? mark.mark.opacity * 10 : 0}
                                    onChange={(val, newVal) => {
                                        setMark({...mark, mark: {...mark.mark, opacity: newVal as number / 10}})
                                    }}
                                    min={1}
                                    scale={(x) => x / 10}

                                    max={10}
                                    valueLabelDisplay="auto"/>
                        </Grid>
                    </Grid>
                    {mark.mark.type === 'line' ? preparePointSettings() : undefined}

                    <Grid container item xs={12}>
                        <Grid item xs={12}>
                            <Typography variant={'body1'}>Tooltip</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <RadioGroup aria-label="tooltip" name="tooltip" value={mark.mark?.tooltip ?? false}
                                        onChange={(event => setMark(
                                            {...mark, mark: {...mark.mark, tooltip: event.target.value === 'true'}}))}
                            >
                                <FormControlLabel value={true} control={<Radio color={'primary'}/>} label="yes"/>
                                <FormControlLabel value={false} control={<Radio/>} label="no"/>
                            </RadioGroup>
                        </Grid>
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    )
}

export default MarkStylesAccordionContainer