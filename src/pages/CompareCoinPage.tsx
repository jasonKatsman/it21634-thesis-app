import React, {FC, useEffect, useState} from 'react';
import {Box, Button, CircularProgress, Divider, Grid, makeStyles, Tab, Theme, Typography} from "@material-ui/core";
import CustomButtonBig from "../components/common/CustomButtonBig";
import CustomButtonPill from "../components/common/CustomButtonPill";
import CustomTabs from "../components/common/CustomTabs";
import frequencyOptions from "../Dummy/frequencyOptions.json";
import CoinNamesWithDetails from '../Dummy/coinNamesWithDetails.json'
import CoinDialog from "../components/Dialogs/CoinDialog";
import {multipleCoinFetch} from "../http/endpoints/multipleCoinFetch";
import CoinComparisonChart from "../components/common/CoinComparisonChart";
import CustomCalendar from "../components/common/CustomCalendar";
import moment from "moment";
import CustomTable from "../components/common/CustomTable";

const useStyles = makeStyles((theme: Theme) => ({
    headerSpace: {
        marginTop: 32
    },
    page: {
        marginBottom: 32
    },
    chart: {
        marginTop: 32
    },
    pillSpace: {
        marginTop: 12
    },
    tabGrid: {
        background: '#f0f0f0',
        marginTop: 12
    },
    buttonPosition: {
        marginLeft: 32,
        fontWeight: 'bold',
        padding: '8px 40px'
    }
}))

const CompareCoinPage: FC = () => {
    const classes = useStyles();
    const [requestValue, setRequestValue] = useState<{ coins: { name: string, abr: string }[], time: string }>({
        coins: [],
        time: 'weekly'
    })
    const [coinModal, setCoinModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [dateValue, setDateValue] = useState(new Date());
    const [coinData, setCoinData] = useState<any[]>([])

    useEffect(() => {
        if (requestValue.coins.length) onFetchClick()
    }, [requestValue, dateValue])

    const onFetchClick = async () => {
        setLoading(true)
        try {
            const dateParam = moment(dateValue).isSame(new Date(), "day") ? moment().toDate() : moment(dateValue).toDate()
            const res = await multipleCoinFetch(requestValue.coins, requestValue.time, dateParam)
            setCoinData(res)
            setLoading(false)
        } catch (e) {
            setLoading(false)
        }
    }
    const onDeleteCoin = (index: number) => {
        const newArray = [...requestValue.coins.slice(0, index), ...requestValue.coins.slice(index + 1)]
        setRequestValue({...requestValue, coins: newArray})
    }


    const prepareCoinPills = () => {
        return requestValue.coins.map((item, i) => {
            return <Grid item>
                <CustomButtonPill onDeleteClick={() => onDeleteCoin(i)} title={item.name} subtitle={item.abr}/>
            </Grid>

        })
    }

    const setCoinPick = (val: string) => {
        const foundVal = CoinNamesWithDetails.find((item) => item.name.toLowerCase() === val.toLowerCase())
        if (foundVal) {
            if (!requestValue.coins.find(item => item.name === foundVal.name)) {
                setRequestValue({...requestValue, coins: [...requestValue.coins, foundVal]})
            }
        }
    }

    const prepareCoinCharts = () => {
        if (coinData.length)
            return <CoinComparisonChart coinValue={requestValue} data={coinData}/>
    }

    return (
        <Box className={classes.page}>
            <Grid container>
                <Grid item xs={12} className={classes.headerSpace}>
                    <Typography variant={'h4'} color={'secondary'}>
                        Coin comparison
                    </Typography>
                </Grid>
                <Grid item container xs={12}>
                    <Typography variant={'body1'}>
                        Press the ADD button to insert coins. Then press get data to fetch results.
                    </Typography>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.pillSpace}>
                    <CustomButtonBig onClick={() => setCoinModal(true)}>ADD COIN</CustomButtonBig>
                    <Button disabled={!requestValue.coins.length} onClick={onFetchClick}
                            className={classes.buttonPosition}
                            variant={'contained'}
                            color={'secondary'}>REFRESH</Button>

                </Grid>
                <Grid item container spacing={2} className={classes.pillSpace} xs={12}>
                    {prepareCoinPills()}
                </Grid>
                <Grid item className={classes.tabGrid} xs={12}>
                    <Divider/>
                    <Grid item container style={{margin: '4px 16px'}}  alignItems={'center'} xs={12}>
                        <Grid item style={{margin: '0 16px'}}>
                            <CustomCalendar dateValue={dateValue} setDateValue={setDateValue}/>
                        </Grid>
                        <Grid item>
                            <CustomTabs variant="scrollable"
                                        scrollButtons="auto" value={requestValue.time}
                                        setValue={(val) => setRequestValue({...requestValue, time: val})}>
                                {frequencyOptions.map(freq => {
                                    return <Tab label={freq.title} value={freq.value}/>
                                })}
                            </CustomTabs>
                        </Grid>
                    </Grid>
                    <Divider/>
                </Grid>
                {coinData.length && !loading ?
                    <Grid item xs={12}>
                        <CustomTable   coins={requestValue.coins}/>
                    </Grid> : undefined}
                <Grid item xs={12} container justify={'center'}>
                    {loading ? <CircularProgress className={classes.chart}/> : prepareCoinCharts()}
                </Grid>
            </Grid>
            <CoinDialog open={coinModal} handleClose={() => setCoinModal(false)}
                        onSave={setCoinPick}/>
        </Box>
    )
}

export default CompareCoinPage;
