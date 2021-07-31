import {Grid, makeStyles} from "@material-ui/core";
import React, {FC} from "react";
import AxisAccordionContainer from "../../DetailsComponents/AxisAccordionContainer";
import MarkAccordionContainer from "../../DetailsComponents/MarkAccordionContainer";
import {Transform, vegaFieldType} from "../../../Types/VegaFieldType";

const useStyles = makeStyles(() => ({}))
type DetailsTabProps = {
    mark: any
    setMark: (value: any) => void
    xAxis: vegaFieldType
    yAxis: vegaFieldType
    transform: Transform
    setTransform: (value: Transform) => void
    setXAxis: (value: vegaFieldType) => void
    setYAxis: (value: vegaFieldType) => void

}
const DetailsTab: FC<DetailsTabProps> = ({
                                             xAxis,
                                             yAxis,
                                             setXAxis,
                                             setYAxis,
                                             mark,
                                             setMark
                                         }) => {
    const classes = useStyles()
    return (<Grid container>
        {/*<Grid item xs={12}>*/}
        {/*    <FilterAccordionContainer transform={transform} setTransform={setTransform}/>*/}

        {/*</Grid>*/}
        <Grid item xs={12}>
            <MarkAccordionContainer mark={mark} setMark={setMark}/>
            {/*mark*/}
        </Grid>
        <Grid item xs={12}>
            <AxisAccordionContainer axis={xAxis} setAxis={setXAxis} title={'X Axis'}/>
            {/*  encoding.x.scale.domain[min,max]  */}

        </Grid>
        <Grid item xs={12}>
            <AxisAccordionContainer axis={yAxis} setAxis={setYAxis} title={'Y Axis'}/>
        </Grid>
    </Grid>)
}

export default DetailsTab