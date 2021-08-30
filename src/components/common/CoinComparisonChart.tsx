import React, {FC} from 'react';
import {Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import VegaPerformanceComparison from "../compareCharts/VegaPerformanceComparison";
import VegaFieldsComparison from "../compareCharts/VegaFieldsComparison";

const useStyles = makeStyles((theme: Theme) => ({
    headerTitle: {
        margin: '18px 0 8px 0',
    }
}))

interface coinProps {
    data: any[],
    coinValue: { coins: { name: string, abr: string }[], time: string },
}

const CoinComparisonChart: FC<coinProps> = ({data, coinValue}) => {
    const classes = useStyles()
    return (
        <Grid item container xs={12}>
            <Grid item xs={12} className={classes.headerTitle}>
                <Typography variant={'body1'} style={{fontWeight: "bold"}} color={'primary'}>
                    Performance of coins (%)
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <VegaPerformanceComparison data={data}/>
            </Grid>
            <Grid item xs={12} className={classes.headerTitle}>
                <Typography variant={'body1'} style={{fontWeight: "bold"}} color={'primary'}>
                    Price in euro
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <VegaFieldsComparison time={coinValue.time} data={data} field={'current_price'}/>
            </Grid>
            <Grid item xs={12} className={classes.headerTitle}>
                <Typography variant={'body1'} style={{fontWeight: "bold"}} color={'primary'}>
                    Market cap in euro
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <VegaFieldsComparison time={coinValue.time} data={data} field={'market_cap'}/>
            </Grid>
            <Grid item xs={12} className={classes.headerTitle}>
                <Typography variant={'body1'} style={{fontWeight: "bold"}} color={'primary'}>
                    Total volume in euro
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <VegaFieldsComparison time={coinValue.time} data={data} field={'total_volume'}/>
            </Grid>
        </Grid>
    )
}

export default CoinComparisonChart;
