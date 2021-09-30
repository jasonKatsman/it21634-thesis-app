import React, {FC, useEffect, useState} from 'react';
import {Box, CircularProgress, Fade, Grid, makeStyles, Tab, Theme} from "@material-ui/core";
import {getCandleStickData} from "../../http/endpoints/coins";
import CustomButtonTabs from "../common/CustomButtonTab";
import PureCandleStickChart from "../compareCharts/PureCandleStickChart";


const useStyles = makeStyles((theme: Theme) => ({
    tabs: {
        marginTop: 16
    },
    loading: {
        margin: '290px 0'
    }
}))

type singlePriceChartType = {
    coinId: string

}

const SelectedCandleStickChartContainer: FC<singlePriceChartType> = ({coinId}) => {
    const classes = useStyles();
    const [chartData, setChartData] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [timeValue, setTimeValue] = useState('daily')
    const [intervalValue, setIntervalValue] = useState('1')
    const getStats = async () => {
        setLoading(true)
        try {
            const res = await getCandleStickData({
                id: coinId,
                frequency: timeValue,
                interval: parseInt(intervalValue),
                date: new Date()
            })
            if (res.data) setChartData(res.data)
            setLoading(false)
        } catch (e) {
            setLoading(false)
        }
    }

    useEffect(() => {
        getStats()
    }, [coinId, timeValue, intervalValue])

    const prepareChart = () => {
        if (loading) {
            return (
                <Grid item container justify={'center'} className={classes.loading} xs={12}>
                    <CircularProgress/>
                </Grid>
            )
        }
        if (chartData.length) {
            return (
                <Fade in={true} timeout={250}>
                    <Grid container>
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
                        <Grid item xs={12}>
                            <PureCandleStickChart height={500}
                                                  extraStyle={{
                                                      borderRadius: 4,
                                                      boxShadow: '2px 2px 6px 3px lightgray',
                                                      border: '1px solid gray'
                                                  }} data={chartData}/>
                        </Grid>
                    </Grid>
                </Fade>
            )
        }
    }

    return (
        <Box>
            <Grid item xs={12}>
                <CustomButtonTabs variant={'scrollable'} value={timeValue} setValue={(val) => setTimeValue(val)}>
                    <Tab label={'1d'} value={'daily'}/>
                    <Tab label={'7d'} value={'weekly'}/>
                    <Tab label={'1m'} value={'monthly'}/>
                </CustomButtonTabs>
            </Grid>
            {prepareChart()}
        </Box>
    );
}

export default SelectedCandleStickChartContainer;
