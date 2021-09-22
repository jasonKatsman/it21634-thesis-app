import React, {FC, useState} from 'react';
import {Grid, makeStyles, Tab, Theme, Typography} from "@material-ui/core";
import VegaPerformanceComparison from "../compareCharts/VegaPerformanceComparison";
import VegaFieldsComparison from "../compareCharts/VegaFieldsComparison";
import GroupedChartsVega from "../compareCharts/GroupedChartsVega";
import CustomButtonTabs from "./CustomButtonTab";
import BarChart from "../compareCharts/BarChart";
import CandleStickContainer from "./CandleStickContainer";

const useStyles = makeStyles((theme: Theme) => ({
    headerTitle: {
        fontWeight: "bold",
        margin: '32px 0 8px 0'
    },
    coinWarning: {
        width: '100%',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        margin: '50px 0px 80px'
    },
    checkboxText: {
        fontWeight: 'bold'
    }
}))

interface coinProps {
    data: any[],
    coinValue: { coins: { name: string, abr: string }[], time: string },
}

const CoinComparisonChart: FC<coinProps> = ({data, coinValue}) => {
    const classes = useStyles();
    const [chartTabs, setChartTabs] = useState({priceTab: 'line', marketCap: 'line', volume: 'line'})
    const [priceWaterFall, setPriceWaterFall] = useState({value: '', index: 0})

    const preparePriceCharts = () => {
        switch (chartTabs.priceTab) {
            case "line":
                return <VegaFieldsComparison time={coinValue.time} data={data} field={'current_price'}/>
            case "bar":
                return <BarChart time={coinValue.time} data={data} field={'current_price'}/>
            case "grouped":
                return <GroupedChartsVega time={coinValue.time} data={data} field={'current_price'}/>
            case "fall":
                return <CandleStickContainer coinValue={coinValue} data={data}/>

            default:
                return <VegaFieldsComparison time={coinValue.time} data={data} field={'current_price'}/>
        }
    }

    const prepareCapCharts = () => {
        switch (chartTabs.marketCap) {
            case "line":
                return <VegaFieldsComparison time={coinValue.time} data={data} field={'market_cap'}/>
            case "bar":
                return <BarChart time={coinValue.time} data={data} field={'market_cap'}/>
            case "grouped":
                return <GroupedChartsVega time={coinValue.time} data={data} field={'market_cap'}/>
            default:
                return <VegaFieldsComparison time={coinValue.time} data={data} field={'market_cap'}/>
        }
    }

    const prepareVolumeCharts = () => {
        switch (chartTabs.volume) {
            case "line":
                return <VegaFieldsComparison time={coinValue.time} data={data} field={'total_volume'}/>
            case "bar":
                return <BarChart time={coinValue.time} data={data} field={'total_volume'}/>
            case "grouped":
                return <GroupedChartsVega time={coinValue.time} data={data} field={'total_volume'}/>
            default:
                return <VegaFieldsComparison time={coinValue.time} data={data} field={'total_volume'}/>
        }
    }

    return (
        <Grid item container xs={12}>
            <Grid item xs={12}>
                <Typography className={classes.headerTitle} variant={'body1'} color={'primary'}>
                    Performance of coins (%)
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <VegaPerformanceComparison data={data}/>
            </Grid>
            <Grid item xs={12}>
                <Typography className={classes.headerTitle} variant={'body1'} color={'primary'}>
                    Price in euro
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <CustomButtonTabs variant={"scrollable"} scrollButtons={"auto"} value={chartTabs.priceTab}
                                  setValue={(priceTab) => setChartTabs({...chartTabs, priceTab})}>
                    <Tab label={'Line chart'} value={'line'}/>
                    <Tab label={'CandleStick chart'} value={'fall'}/>
                    <Tab label={'Bar chart'} value={'bar'}/>
                    <Tab label={'Grouped Bar chart'} value={'grouped'}/>

                </CustomButtonTabs>
                {preparePriceCharts()}
            </Grid>
            <Grid item xs={12}>
                <Typography className={classes.headerTitle} variant={'body1'} style={{fontWeight: "bold"}}
                            color={'primary'}>
                    Market cap in euro
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <CustomButtonTabs variant={"scrollable"} scrollButtons={"auto"} value={chartTabs.marketCap}
                                  setValue={(marketCap) => setChartTabs({...chartTabs, marketCap})}>
                    <Tab label={'Line chart'} value={'line'}/>
                    <Tab label={'Bar chart'} value={'bar'}/>
                    <Tab label={'Grouped Bar chart'} value={'grouped'}/>
                </CustomButtonTabs>
                {prepareCapCharts()}
            </Grid>
            <Grid item xs={12}>
                <Typography className={classes.headerTitle} variant={'body1'} style={{fontWeight: "bold"}}
                            color={'primary'}>
                    Total volume in euro
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <CustomButtonTabs variant={"scrollable"} scrollButtons={"auto"} value={chartTabs.volume}
                                  setValue={(volume) => setChartTabs({...chartTabs, volume})}>
                    <Tab label={'Line chart'} value={'line'}/>
                    <Tab label={'Bar chart'} value={'bar'}/>
                    <Tab label={'Grouped Bar chart'} value={'grouped'}/>
                </CustomButtonTabs>
                {prepareVolumeCharts()}
            </Grid>
        </Grid>
    )
}

export default CoinComparisonChart;
