import React, {FC, useEffect, useState} from 'react';
import {
    Box,
    Button,
    CircularProgress,
    Fade,
    Grid,
    makeStyles,
    Tab,
    Theme,
    Typography,
    useMediaQuery
} from "@material-ui/core";
import {getCandleStickData} from "../../http/endpoints/coins";
import CustomButtonTabs from "../common/CustomButtonTab";
import PureCandleStickChart from "../compareCharts/PureCandleStickChart";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";
import moment from "moment";
import {theme} from "../../theme";

const useStyles = makeStyles((theme: Theme) => ({
    tabs: {
        marginTop: 16
    },
    loading: {
        margin: '290px 0'
    },
    arrowButton: {
        padding: '0px 4px',
        minWidth: 0,
        border: `2px solid ${theme.palette.primary.main}`,
        '&.Mui-disabled': {
            border: `2px solid lightgray`,
        }
    },
    arrowText: {
        margin: '0 12px'
    }
}))

type singlePriceChartType = {
    coinId: string

}

const SelectedCandleStickChartContainer: FC<singlePriceChartType> = ({coinId}) => {
    const classes = useStyles();
    const [chartData, setChartData] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [timeValue, setTimeValue] = useState('weekly')
    const [intervalValue, setIntervalValue] = useState('1')
    const smUp = useMediaQuery(theme.breakpoints.up('sm'));

    const [selectedDate, setSelectedDate] = useState(new Date())
    const getStats = async () => {
        setLoading(true)
        try {
            const res = await getCandleStickData({
                id: coinId,
                frequency: timeValue,
                interval: parseInt(intervalValue),
                date: selectedDate
            })
            if (res.data) setChartData(res.data)
            setLoading(false)
        } catch (e) {
            setLoading(false)
        }
    }

    useEffect(() => {
        getStats()
    }, [coinId, timeValue, intervalValue, selectedDate])

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
                            <PureCandleStickChart height={smUp?400:250}
                                                  timeUnit={intervalValue === '24' || intervalValue === '48' ? 'monthdate' : {
                                                      unit: 'monthdatehours',
                                                      step: parseInt(intervalValue)
                                                  }}
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

    const onAddDate = () => {
        setSelectedDate(moment(selectedDate).add(7, "days").toDate())
    }

    const onSubDate = () => {
        setSelectedDate(moment(selectedDate).subtract(7, "days").toDate())
    }

    const checkIfDisabled = () => {
        if (moment(selectedDate).add(7, "days").isAfter(moment())) {
            return true
        }
    }
    return (
        <Box>
            <Grid item container style={{marginBottom: 12}} alignItems={'center'} xs={12}>
                {/*<CustomButtonTabs variant={'scrollable'} value={timeValue} setValue={(val) => setTimeValue(val)}>*/}
                {/*    <Tab label={'1d'} value={'daily'}/>*/}
                {/*    <Tab label={'7d'} value={'weekly'}/>*/}
                {/*    <Tab label={'1m'} value={'monthly'}/>*/}
                {/*</CustomButtonTabs>*/}
                <Button onClick={onSubDate} className={classes.arrowButton}>
                    <KeyboardArrowLeft/>
                </Button>
                <Typography color={'secondary'} variant={'subtitle2'} className={classes.arrowText}>
                    {moment(selectedDate).subtract(7, 'days').format('DD/MM/YYYY')} - {moment(selectedDate).format('DD/MM/YYYY')}
                </Typography>
                <Button onClick={onAddDate} disabled={checkIfDisabled()} className={classes.arrowButton}>
                    <KeyboardArrowRight/>
                </Button>

            </Grid>
            {prepareChart()}
        </Box>
    );
}

export default SelectedCandleStickChartContainer;
