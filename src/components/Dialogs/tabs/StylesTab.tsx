import {Grid, makeStyles} from "@material-ui/core";
import React, {FC} from "react";
import {vegaFieldType} from "../../../Types/VegaFieldType";
import MarkStylesAccordionContainer from "../../DetailsComponents/MarkStylesAccordionContainer";

const useStyles = makeStyles(() => ({}))
type StylesTabProps = {
    mark: any
    setMark: (value: any) => void
    xAxis: vegaFieldType
    yAxis: vegaFieldType
    setXAxis: (value: vegaFieldType) => void
    setYAxis: (value: vegaFieldType) => void

}
const StylesTab: FC<StylesTabProps> = ({xAxis, yAxis, setXAxis, setYAxis, mark, setMark}) => {
    const classes = useStyles()
    return (<Grid container>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12}>
            <MarkStylesAccordionContainer mark={mark} setMark={setMark} title={'Mark styles'}/>
        </Grid>
    </Grid>)
}

export default StylesTab