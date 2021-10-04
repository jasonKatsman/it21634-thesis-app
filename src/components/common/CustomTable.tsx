import React, {FC, useEffect, useState} from 'react';
import {CircularProgress, Fade, Grid, makeStyles, TableCell, Theme, Typography} from "@material-ui/core";
import {useHistory} from "react-router";
import {getOverviewStats} from "../../http/endpoints/overviewCoins";
import {prepareIcon, preparePercentageClass} from "../../utils/rowPercentageColorFunctions";
import CoinRow from "./CoinRow";
import CoinTable from "./CoinTable";


const useStyles = makeStyles((theme: Theme) => ({
    page: {
        marginBottom: 32
    },
    regularSpacing: {
        marginTop: 16
    },
    pageTitle: {
        marginTop: 32
    },
    loading: {
        margin: '80px 0 500px 0'
    },
    overflow: {
        overflow: 'auto',
        borderRadius: 4,
        border: '1px solid #02254b'
    }
}))
type customTableProps = {
    coins: { name: string, abr: string }[]
}
const CustomTable: FC<customTableProps> = ({coins}) => {
    const classes = useStyles();
    const history = useHistory()
    const [sort, setSort] = useState({value: '', asc: false})

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const getStats = async () => {
        setLoading(true)
        try {
            const res = await getOverviewStats({
                coins: coins.map(item => item.name.toLowerCase()).toString(),
                date: new Date()
            })
            setData(res.data)
            setLoading(false)
        } catch (e) {
            setLoading(false)
        }
    }

    useEffect(() => {
        getStats()
    }, [coins.length])

    const prepareTableRows = () => {

        const sortedData = sort.value ? data.sort((a: any, b: any) => {
            if (a[sort.value] > b[sort.value]) {
                return sort.asc ? -1 : 1
            }
            if (a[sort.value] < b[sort.value]) {
                return sort.asc ? 1 : -1
            }
            return 0
        }) : data

        return sortedData.map((coin: any) => {
            const colorDay = preparePercentageClass(coin?.price_change_percentage_24h)
            const colorWeek = preparePercentageClass(coin?.price_week_percentage)

            return <CoinRow onClick={() => history.push(`/preview/${coin?.id}`)}>
                <TableCell align={'left'}>
                    <Typography>{coin?.name}</Typography>
                </TableCell>
                <TableCell align="center"> <Typography>{coin?.current_price} €</Typography></TableCell>
                <TableCell align="center">
                    <Grid container justify={'center'}>
                        {prepareIcon(coin?.price_change_percentage_24h)}
                        <Typography style={{color: colorDay}}>
                            {coin?.price_change_percentage_24h.toFixed(2)}%
                        </Typography>
                    </Grid>
                </TableCell>
                <TableCell align="center">
                    <Grid container justify={'center'}>
                        {prepareIcon(coin?.price_week_percentage)}
                        <Typography style={{color: colorWeek}}>
                            {coin?.price_week_percentage.toFixed(2)}%
                        </Typography>
                    </Grid>
                </TableCell>
                <TableCell align="center"><Typography>{coin?.market_cap}€</Typography></TableCell>
                <TableCell align="center"><Typography>{coin?.total_volume} €</Typography></TableCell>
                <TableCell align="center"><Typography>{coin?.circulating_supply}</Typography></TableCell>
            </CoinRow>
        })
    }

    const prepareTable = () => {
        if (loading && !data.length) {
            return <Grid className={classes.loading} item container justify={'center'} alignItems={'center'} xs={12}>
                <CircularProgress size={45}/>
            </Grid>
        }
        if (data.length) {
            return (
                <Fade in={true} timeout={1000}>
                    <Grid item xs={12} className={`${classes.regularSpacing} ${classes.overflow}`}>
                        <CoinTable sort={sort} setSort={setSort}>
                            {prepareTableRows()}
                        </CoinTable>
                    </Grid>
                </Fade>
            )
        }
    }

    return <>{prepareTable()}</>;
}

export default CustomTable;
