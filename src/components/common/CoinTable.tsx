import React, {FC, useState} from 'react';
import {Box, makeStyles, Table, TableBody, TableCell, TableHead, TableProps, TableRow, Theme} from "@material-ui/core";
import ArrowDropDownRounded from "@material-ui/icons/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@material-ui/icons/ArrowDropUpRounded";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        background: '#f0f0f0',
        borderRadius: 4,
        boxShadow: '0px 0px 0px 2px #02254b',
        overflow: 'hidden'
    },
    headRow: {
        background: 'rgba(2, 37, 75,0.8)',
        '& th': {
            color: 'white',
            fontWeight: 'bold'
        }
    },
    boxCell: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headCell: {
        cursor: 'pointer'
    }
}))

type extraProps = {
    className?: any
    header?: { align: any, title: string, sort: string }[]
    sort: { asc: boolean, value: string }
    setSort: (value:{asc: boolean, value: string}) => void
}

const stockHeader = [
    {align: 'left', title: 'Name', sort: 'name'},
    {align: 'center', title: 'Price', sort: 'current_price'},
    {align: 'center', title: '24h%', sort: 'price_change_24h'},
    {align: 'center', title: '7d%', sort: 'price_week_percentage'},
    {align: 'center', title: 'market cap', sort: 'market_cap'},
    {align: 'center', title: 'volume', sort: 'total_volume'},
    {align: 'center', title: 'Circulating supply', sort: 'circulating_supply'}
]

const CoinTable: FC<TableProps & extraProps> = ({
                                                    sort,
                                                    setSort,
                                                    header = stockHeader,
                                                    className,
                                                    children, ...props
                                                }) => {
    const classes = useStyles();

    const prepareIconSort = (itemSort: string) => {
        if (sort.value === itemSort) {
            return !sort.asc ? <ArrowDropDownRounded/> : <ArrowDropUpRoundedIcon/>
        }
        return <ArrowDropDownRounded style={{color: 'rgba(0,0,0,0)'}}/>
    }

    const onSortClick = (itemSort: string) => {
        if (sort.value === itemSort) {
            return setSort({asc: !sort.asc, value: itemSort})
        }
        setSort({asc: false, value: itemSort})
    }

    const prepareHeader = () => {
        return header.map((item,i) => {
            return <TableCell className={classes.headCell} onClick={() => onSortClick(item.sort)} align={item.align}>
                <Box className={classes.boxCell}>
                    {prepareIconSort(item.sort)}{item.title}
                </Box>

            </TableCell>
        })
    }

    return (
        <Table className={`${classes.root} ${className}`} {...props}>
            <TableHead>
                <TableRow className={classes.headRow}>
                    {prepareHeader()}
                </TableRow>
            </TableHead>
            <TableBody>
                {children}
            </TableBody>
        </Table>
    );
}

export default CoinTable;
