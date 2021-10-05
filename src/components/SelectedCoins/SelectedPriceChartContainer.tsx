import React, {FC, useEffect, useState} from 'react';
import {CircularProgress, Fade, Grid, makeStyles, Tab, Theme, useMediaQuery} from "@material-ui/core";
import {getCustomCoinById} from "../../http/endpoints/coins";
import VegaFieldsComparison from "../compareCharts/VegaFieldsComparison";
import CustomButtonTabs from "../common/CustomButtonTab";
import {theme} from "../../theme";


const useStyles = makeStyles((theme: Theme) => ({
    tabs: {
        marginTop: 16
    },
    loading: {
        margin: '220px 0'
    }
}))

type singlePriceChartType = {
    coinId: string
}

const SelectedPriceChartContainer: FC<singlePriceChartType> = ({coinId}) => {
    const classes = useStyles();
    const [chartData, setChartData] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [timeValue, setTimeValue] = useState('daily')
    const smUp = useMediaQuery(theme.breakpoints.up('sm'));
    const getStats = async () => {
        setLoading(true)
        try {
            const res = await getCustomCoinById({id: coinId, date: new Date(), frequency: timeValue})
            if (res.data) setChartData(res.data)
            setLoading(false)
        } catch (e) {
            setLoading(false)
        }
    }

    useEffect(() => {
        getStats()
    }, [coinId, timeValue])

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
                    <Grid item xs={12}>
                        <VegaFieldsComparison
                            hasPoints={false}
                            extraStyle={{
                                height: smUp ? 400 : 250,
                                borderRadius: 4,
                                boxShadow: '2px 2px 6px 3px lightgray',
                                border: '1px solid gray'
                            }}
                            data={[chartData]}
                            field={'current_price'}/>
                    </Grid>
                </Fade>
            )
        }
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <CustomButtonTabs mini variant={'scrollable'} value={timeValue} setValue={(val) => setTimeValue(val)}>
                    <Tab label={'1d'} value={'daily'}/>
                    <Tab label={'7d'} value={'weekly'}/>
                    <Tab label={'1m'} value={'monthly'}/>
                    <Tab label={'6m'} value={'6-months'}/>
                    <Tab label={'1y'} value={'yearly'}/>
                </CustomButtonTabs>
            </Grid>
            {prepareChart()}
        </Grid>
    );
}

export default SelectedPriceChartContainer;
