import React, {FC} from 'react';
import {Box, BoxProps, Grid, makeStyles, Slider, Theme, Typography} from "@material-ui/core";
import PercentageBox from "./PercentageBox";
import CryptoInfoBox from "./CryptoInfoBox";
import {prepareDiffPercentage} from "../../utils/rowPercentageColorFunctions";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        // color: 'white',
        // background: theme.palette.primary.main,
        marginTop: 8,
        borderRadius: 8
    },
    name: {
        marginRight: 12
    },
    textSpace: {
        marginRight: 32
    },
    textSpaceTop: {
        marginTop: 24
    },
    gridInfo: {
        padding: '32px 32px 40px 32px',
    },
    sliderItem: {
        display: 'flex',
        alignItems: 'center'

    },
    slider: {
        padding: 6,
        '& .MuiSlider-rail': {
            height: 12,
        },
        '& .MuiSlider-track': {
            height: 12,
        },
        '& .MuiSlider-thumb': {
            height: 0,
            width: 0
        },
    },
    gridItems: {
        marginTop: 56,
        borderRadius: 8,
        overflow: 'hidden',
        boxShadow: '0px 0px 0px 1px lightgray',
        '&>:nth-child(n)': {
            background: '#f0f0f0',
            boxShadow: '0px 0px 0px 1px lightgray',
        }
    }
}))

type extraProps = {
    className?: any
    data?: any
}

const CoinCard: FC<BoxProps & extraProps> = ({
                                                 data,
                                                 className,
                                                 ...props
                                             }) => {
    const classes = useStyles();
    return (
        <Box className={`${classes.root} ${className}`} {...props}>
            <Grid container alignItems={'center'}>
                <Grid item alignItems={'center'} container xs={12}>
                    <Typography color={'primary'} variant={'h4'} className={classes.textSpace}>
                        Price <strong>€{data.current_price}</strong>
                    </Typography>
                    <PercentageBox percentage={data.price_day_percentage}/>
                </Grid>

                <Grid item container className={classes.gridItems} justify={'space-around'}>



                    <Grid item xs={12} md={4}>
                        <CryptoInfoBox isPercentage={false} title={'24h High Price'} value={data.high_24h}
                                       extraTitle={'24h low Price'}
                                       extraValue={data.low_24h}/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <CryptoInfoBox title={'Market Cap'} value={data.market_cap}
                                       extraTitle={'24h Change'}
                                       extraValue={data.market_cap_change_percentage_24h}/>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <CryptoInfoBox title={'All Time High'} value={data.ath}
                                       extraTitle={'All Time High Change'}
                                       extraValue={data.ath_change_percentage}/>
                    </Grid>

                    <Grid item xs={12} md={12} className={classes.gridInfo}>
                        <Typography color='primary' variant={'h6'}><strong>Circulating Supply</strong></Typography>
                        <Typography align={'right'} variant={'body1'}>
                            <strong>
                                {prepareDiffPercentage(data.total_supply, data.circulating_supply).toFixed(1)}%
                            </strong>
                        </Typography>
                        <Box className={classes.sliderItem}>
                            <Slider className={classes.slider}
                                    min={0}
                                    max={data.total_supply}
                                    value={data.circulating_supply}
                            />

                        </Box>
                        <Typography color='primary' className={classes.textSpaceTop} variant={'h6'}>Current
                            supply: <strong>{data.circulating_supply}</strong></Typography>
                        <Typography color='primary' variant={'h6'}>Total
                            supply: <strong>{data.total_supply}</strong></Typography>
                    </Grid>

                </Grid>
            </Grid>
        </Box>
    );
}

export default CoinCard;
