import React, {FC} from 'react';
import {Box, BoxProps, Grid, makeStyles, Theme, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        color: 'white',
        background: theme.palette.primary.main,
        padding: '12px 18px',
        borderRadius: 8
    },
    name: {
        marginRight: 12
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
    console.log(data)
    return (
        <Box className={`${classes.root} ${className}`} {...props}>
            <Grid container alignItems={'center'}>
                <Grid item xs={12} container alignItems={'center'} wrap={'nowrap'}>
                    <img height={45} width={45} src={data.image}/>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={'h5'}>price:<strong> {data.current_price}</strong></Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={'h5'}>market_cap: <strong>{data.market_cap}</strong></Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        variant={'h5'}>price_day_percentage: <strong>{data.price_day_percentage}</strong></Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        variant={'h5'}>price_week_percentage: <strong>{data.price_week_percentage}</strong></Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={'h5'}>total_supply: <strong>{data.total_supply}</strong></Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        variant={'h5'}>circulating_supply: <strong>{data.circulating_supply}</strong></Typography>
                </Grid>
            </Grid>
        </Box>
    );
}

export default CoinCard;
