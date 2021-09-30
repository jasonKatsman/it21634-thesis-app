import React, {FC, useEffect, useState} from 'react';
import {Box, CircularProgress, Grid, makeStyles, Tab} from "@material-ui/core";
import background from '../images/equalizer.jpg'
import PureCandleStickChart from "../components/compareCharts/PureCandleStickChart";
import {getCandleStickData} from "../http/endpoints/coins";
import CustomButtonTabs from "../components/common/CustomButtonTab";

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
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [timeValue, setTimeValue] = useState('daily')
    const [intervalValue, setIntervalValue] = useState('1')


    const fetchCandleStickData = async () => {
        setLoading(true)
        try {
            const res = await getCandleStickData({
                id: 'bitcoin',
                frequency: timeValue,
                interval: parseInt(intervalValue),
                date: new Date()
            })
            setData(res.data)
            setLoading(false)
        } catch (e) {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCandleStickData()
    }, [intervalValue, timeValue])
    return (
        <Box mt={2}>
            <Grid item xs={12}>
                <CustomButtonTabs variant={'scrollable'} value={timeValue} setValue={(val) => setTimeValue(val)}>
                    <Tab label={'1d'} value={'daily'}/>
                    <Tab label={'7d'} value={'weekly'}/>
                    <Tab label={'1m'} value={'monthly'}/>
                    <Tab label={'6m'} value={'6-months'}/>
                    <Tab label={'1y'} value={'yearly'}/>
                </CustomButtonTabs>
            </Grid>
            <Grid item xs={12}>
                <CustomButtonTabs mini variant={'scrollable'} value={intervalValue}
                                  setValue={(val) => setIntervalValue(val)}>
                    <Tab label={'1h'} value={'1'}/>
                    <Tab label={'3h'} value={'3'}/>
                    <Tab label={'6h'} value={'6'}/>
                    <Tab label={'12h'} value={'12'}/>
                    <Tab label={'1d'} value={'24'}/>
                    <Tab label={'2d'} value={'48'}/>
                </CustomButtonTabs>
            </Grid>
            <Grid container justify={'center'}>
                {loading ? <CircularProgress/> : <PureCandleStickChart data={data}/>}
            </Grid>
        </Box>
    );
}

export default TestPage;
