import React, {FC, useState} from 'react';
import {Checkbox, FormControlLabel, Grid, makeStyles, Tab, Theme, Typography} from "@material-ui/core";
import VegaPerformanceComparison from "../compareCharts/VegaPerformanceComparison";
import VegaFieldsComparison from "../compareCharts/VegaFieldsComparison";
import GroupedChartsVega from "../compareCharts/GroupedChartsVega";
import WaterFallChart from "../compareCharts/WaterFallChart";
import CustomButtonTabs from "./CustomButtonTab";
import BarChart from "../compareCharts/BarChart";

const useStyles = makeStyles((theme: Theme) => ({
    headerTitle: {
        fontWeight: "bold",
        margin: '32px 0 8px 0'
    },
    coinWarning: {
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
        padding: '30px 0px 60px'
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

    const waterFallChart = () => {
        return <Grid container>
            <Grid item xs={12}>
                {coinValue.coins.map((coin, i) => {
                    return <FormControlLabel
                        control={<Checkbox color={'primary'} checked={coin.name === priceWaterFall.value}/>}
                        onClick={() => setPriceWaterFall({value: coin.name, index: i})}
                        label={<Typography className={classes.checkboxText}
                                           variant={'subtitle2'}>{coin.abr}</Typography>}
                        labelPlacement="end"
                    />
                })}
            </Grid>
            {priceWaterFall.value ? <WaterFallChart time={coinValue.time} data={data[priceWaterFall.index]}
                                                    field={'current_price'}/> :
                <Typography color={'primary'} className={classes.coinWarning}>PICK A COIN</Typography>}
        </Grid>
    }

    const preparePriceCharts = () => {
        switch (chartTabs.priceTab) {
            case "line":
                return <VegaFieldsComparison time={coinValue.time} data={data} field={'current_price'}/>
            case "bar":
                return <BarChart time={coinValue.time} data={data} field={'current_price'}/>
            case "grouped":
                return <GroupedChartsVega time={coinValue.time} data={data} field={'current_price'}/>
            case "fall":
                return waterFallChart();

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
                <CustomButtonTabs value={chartTabs.priceTab}
                                  setValue={(priceTab) => setChartTabs({...chartTabs, priceTab})}>
                    <Tab label={'Line chart'} value={'line'}/>
                    <Tab label={'Bar chart'} value={'bar'}/>
                    <Tab label={'Grouped Bar chart'} value={'grouped'}/>
                    <Tab label={'Water fall chart'} value={'fall'}/>
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
                <CustomButtonTabs value={chartTabs.marketCap}
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
                <CustomButtonTabs value={chartTabs.volume}
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
