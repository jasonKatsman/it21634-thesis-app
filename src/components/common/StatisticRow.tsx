import React, {FC} from 'react';
import {BoxProps, Grid, makeStyles, TableCell, TableRow, Theme, Typography} from "@material-ui/core";
import {Coin} from "../../Types/Coin";
import ArrowDropUpRoundedIcon from '@material-ui/icons/ArrowDropUpRounded';
import ArrowDropDownRounded from '@material-ui/icons/ArrowDropDownRounded';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        color: 'red',
        display: 'flex',
        alignItems: 'center',
        padding: 12
    },
    row: {
        '&:hover': {
            background: 'rgba(2, 37, 75,0.025)',

        }
    }
}))

type extraProps = {
    className?: any
    coinStart: Coin
    coinEnd: Coin
}

const StatisticRow: FC<BoxProps & extraProps> = ({
                                                     coinStart,
                                                     coinEnd,
                                                     className,
                                                     ...props
                                                 }) => {
    const classes = useStyles();

    const preparePercentage = (): number => {
        const startPrice = coinStart?.current_price
        const endPrice = coinEnd?.current_price
        if (startPrice && endPrice) {
            return (100 - (startPrice * 100 / endPrice))
        }
        return 0
    }

    const preparePercentageClass = () => {
        const percentage = preparePercentage()
        if (percentage === 0) {
            return 'gray'
        }
        if (percentage < 0) {
            return 'red'
        }
        if (percentage > 0) {
            return 'green'
        }
    }

    const prepareIcon = () => {
        const percentage = preparePercentage()
        if (percentage < 0) {
            return <ArrowDropDownRounded style={{color: 'red'}}/>
        }
        if (percentage > 0) {
            return <ArrowDropUpRoundedIcon style={{color: 'green'}}/>
        }

    }

    return (
        <TableRow className={classes.row}>
            <TableCell align={'left'}>
                <Typography>{coinEnd?.name}</Typography>
            </TableCell>
            <TableCell align="center"> <Typography>{coinEnd?.current_price} €</Typography></TableCell>
            <TableCell align="center">
                <Grid container justify={'center'}>
                    {prepareIcon()}
                    <Typography style={{color: preparePercentageClass()}}>
                        {preparePercentage().toFixed(2)}
                    </Typography>
                </Grid>
            </TableCell>
            <TableCell align="center"><Typography>{coinEnd?.market_cap} €</Typography></TableCell>
            <TableCell align="center"><Typography>{coinEnd?.total_volume} €</Typography></TableCell>
            <TableCell align="center"><Typography>{coinEnd?.circulating_supply}</Typography></TableCell>
        </TableRow>
    );
}

export default StatisticRow;
