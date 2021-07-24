import React, {FC, useState} from 'react';
import {Box, Grid, makeStyles} from "@material-ui/core";
import background from '../images/equalizer.jpg'

const useStyles = makeStyles(() => ({

    page: {
        color: 'whitesmoke',
        margin: '16px 64px',
        padding: 12,
        borderRadius: 8,
        background: 'white',
        position: 'relative',
        zIndex: 5,
        '&:after': {
            zIndex: -1,
            // borderTopRightRadius: 8,
            // borderTopLeftRadius: 8,
            //height:300,
            borderRadius: 8,
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            opacity: 0.95
        }

    },
}))

const TestPage: FC = () => {
    const classes = useStyles();
    const [yAxis, setYAxis] = useState({
        aggregate: '',
        field: 'current_price',
        type: 'quantitative',
        title: 'title',
        bin: false,
        timeUnit: '',
        scale: {domain:[20000,40000]},
        axis: {}
    })
    const [xAxis, setXAxis] = useState({
        aggregate: '',
        field: 'date',
        type: 'temporal',
        title: 'title',
        bin: false,
        timeUnit: 'day',
        scale: {},
        axis: {}
    })

    const [basicStyling, setBasicStyling] = useState({
        width: 200,
        height: 200,
        background: 'white',
        mark: 'line',
    })
    const [encoding, setEncoding] = useState({
        size: {
            value: '1',
        },
        opacity: {
            value: '1',
        },
        color: {
            value: 'orange',
        },
    })
    const [encodingColor, setEncodingColor] = useState({
        color: {
            value: 'orange',
            field: '',
            type: '',
            scale: {
                domain: [],
                range: []
            }
        },
    })
    return (
        <Box mt={2}>
            <Grid container justify={'center'}>
                {/*<VegaLiteComponent*/}
                {/*    data={dummy}*/}
                {/*    basicStyling={basicStyling}*/}
                {/*    yAxis={yAxis}*/}
                {/*    xAxis={xAxis}*/}
                {/*    encoding={encoding}*/}
                {/*/>*/}
            </Grid>
        </Box>
    );
}

export default TestPage;
