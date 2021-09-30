import React, {FC, useState} from 'react';
import {Box, Grid, makeStyles, Tab, Theme} from "@material-ui/core";
import {useHistory} from "react-router";
import CustomButtonTabs from "./CustomButtonTab";
import SelectedPriceChartContainer from "../SelectedCoins/SelectedPriceChartContainer";
import SelectedPerformanceChartContainer from "../SelectedCoins/SelectedPerformanceChartContainer";
import SelectedMarketCapChartContainer from "../SelectedCoins/SelectedMarketCapChartContainer";
import SelectedCandleStickChartContainer from "../SelectedCoins/SelectedCandleStickChartContainer";


const useStyles = makeStyles((theme: Theme) => ({
    tabs: {
        marginTop: 32
    },
    loading: {
        margin: '40px 0'
    }
}))

type selectedCpomChartsContainerType = {
    coinId: string
}

const SelectedCoinChartsContainer: FC<selectedCpomChartsContainerType> = ({coinId}) => {
    const classes = useStyles();
    const history = useHistory();
    const [tabValue, setTabValue] = useState('price')

    const prepareTabContent = () => {
        switch (tabValue) {
            case 'price':
                return (
                    <Grid item xs={12}>
                        <SelectedPriceChartContainer coinId={coinId}/>
                    </Grid>
                )
            case 'performance':
                return (
                    <Grid item xs={12}>
                        <SelectedPerformanceChartContainer coinId={coinId}/>
                    </Grid>
                )
            case 'cap':
                return (
                    <Grid item xs={12}>
                        <SelectedMarketCapChartContainer coinId={coinId}/>
                    </Grid>
                )
            case 'candle':
                return (
                    <Grid item xs={12}>
                        <SelectedCandleStickChartContainer coinId={coinId}/>
                    </Grid>
                )
        }
    }

    return (
        <Box>
            <Grid container>
                <Grid item className={classes.tabs} xs={12}>
                    <CustomButtonTabs variant={'scrollable'} value={tabValue} setValue={(val) => setTabValue(val)}>
                        <Tab label={'Price'} value={'price'}/>
                        <Tab label={'Performance'} value={'performance'}/>
                        <Tab label={'Market Cap'} value={'cap'}/>
                        <Tab label={'Candle Stick Chart'} value={'candle'}/>
                    </CustomButtonTabs>
                </Grid>
                {prepareTabContent()}
            </Grid>
        </Box>
    );
}

export default SelectedCoinChartsContainer;
