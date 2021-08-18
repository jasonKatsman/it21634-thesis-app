import {Grid, makeStyles} from "@material-ui/core";
import React, {FC} from "react";
import {Mark, vegaFieldType, vegaSimpleStylesType} from "../../../Types/VegaFieldType";
import MarkStylesAccordionContainer from "../../DetailsComponents/MarkStylesAccordionContainer";
import AxisStylesAccordionContainer from "../../DetailsComponents/AxisStylesAccordionContainer";
import GeneralStylesAccordionContainer from "../../DetailsComponents/GeneralStylesAccordionContainer";
import ExtraCanvasAxisStyles from "../../DetailsComponents/ExtraCanvasAxisStyles";

const useStyles = makeStyles(() => ({}))
type StylesTabProps = {
    mark: Mark
    setMark: (value: Mark) => void
    xAxis: vegaFieldType
    yAxis: vegaFieldType
    setXAxis: (value: vegaFieldType) => void
    setYAxis: (value: vegaFieldType) => void
    simpleStyles: vegaSimpleStylesType
    setSimpleStyles: (value: vegaSimpleStylesType) => void

}
const StylesTab: FC<StylesTabProps> = ({
                                           simpleStyles,
                                           setSimpleStyles,
                                           xAxis,
                                           yAxis,
                                           setXAxis,
                                           setYAxis,
                                           mark,
                                           setMark
                                       }) => {
    const classes = useStyles()
    return (<Grid container>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12}>
            <GeneralStylesAccordionContainer simpleStyles={simpleStyles} setSimpleStyles={setSimpleStyles}
                                             title={'General styles'}/>
        </Grid>
        <Grid item xs={12}>
            <MarkStylesAccordionContainer mark={mark} setMark={setMark} title={'Mark styles'}/>
        </Grid>
        <Grid item xs={12}>
            <AxisStylesAccordionContainer axis={xAxis} setAxis={setXAxis} title={'X AXIS styles'}/>
        </Grid>
        <Grid item xs={12}>
            <AxisStylesAccordionContainer axis={yAxis} setAxis={setYAxis} title={'Y AXIS styles'}/>
        </Grid>
        <Grid item xs={12}>
            <ExtraCanvasAxisStyles axisX={xAxis} setAxisX={setXAxis} axisY={yAxis} setAxisY={setYAxis}
                                   title={'Canvas Axis styles'}/>
        </Grid>
    </Grid>)
}

export default StylesTab