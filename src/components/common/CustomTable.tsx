import React, {FC} from 'react';
import {BoxProps, makeStyles, Table, TableBody, TableCell, TableHead, TableRow, Theme} from "@material-ui/core";
import StatisticRow from "./StatisticRow";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        background: '#f0f0f0',
        marginTop: 40,
        borderRadius: 4,
        boxShadow: '0px 0px 0px 2px #02254b',
        overflow:'hidden'
    },
    headRow: {
        background: 'rgba(2, 37, 75,0.8)',
        '& th': {
            color: 'white',
            fontWeight: 'bold'
        }
    }
}))

type extraProps = {
    className?: any
    coins: any[]
    time: string
}

const CustomTable: FC<BoxProps & extraProps> = ({
                                                    time,
                                                    coins,
                                                    className
                                                }) => {
    const classes = useStyles();

    return (
        <Table className={classes.root}>
            <TableHead>
                <TableRow className={classes.headRow}>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">{time} change (%)</TableCell>
                    <TableCell align="center">market cap</TableCell>
                    <TableCell align="center">volume</TableCell>
                    <TableCell align="center">Circulating supply</TableCell>

                </TableRow>
            </TableHead>
            <TableBody>
                {coins.map((coin) => {
                    return <StatisticRow coinStart={coin[0]} coinEnd={coin[coin.length - 1]}/>
                })}
            </TableBody>
        </Table>
    );
}

export default CustomTable;
