import React, {FC, useState} from 'react';
import {Checkbox, FormControlLabel, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import SelectedCandleStickChartContainer from "../SelectedCoins/SelectedCandleStickChartContainer";

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

const CandleStickContainer: FC<coinProps> = ({data, coinValue}) => {
    const classes = useStyles();
    const [priceWaterFall, setPriceWaterFall] = useState({value: '', index: 0})

    const prepareCandleStick = () => {
        if (priceWaterFall.value) {
            return <SelectedCandleStickChartContainer coinId={priceWaterFall.value.toLowerCase()}/>
            // <CandleStickChart data={prepareCoinSeparation(data[priceWaterFall.index])}/>
        }

        return <Typography color={'secondary'} className={classes.coinWarning}>
            No coin selected! Please pick a coin!
        </Typography>

    }

    return (
        <Grid container>
            <Grid item container alignItems={'center'} xs={12}>
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
            <Grid item xs={12}>
                {prepareCandleStick()}
            </Grid>
        </Grid>)
}

export default CandleStickContainer;
