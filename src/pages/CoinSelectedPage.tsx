import React, {FC, useEffect, useState} from 'react';
import {Box, CircularProgress, Fade, Grid, makeStyles, Theme, Typography} from "@material-ui/core";

import {useHistory, useParams} from "react-router";
import {getOverviewStats} from "../http/endpoints/overviewCoins";
import CoinCard from "../components/common/CoinCard";
import SelectedCoinChartsContainer from "../components/common/SelectedCoinChartsContainer";

const useStyles = makeStyles((theme: Theme) => ({
    page: {
        marginBottom: 32,
        marginTop: 24,
        //padding: 24,
        borderRadius: 8
    },
    loading: {
        marginTop: 140
    }
}))

const CoinSelectedPage: FC = () => {
    const classes = useStyles();
    const {id} = useParams<{ id: string }>();
    const history = useHistory()
    const [overviewData, setOverviewData] = useState<any>()
    const [loading, setLoading] = useState(false)

    const getStats = async () => {
        setLoading(true)
        try {
            const res = await getOverviewStats({coins: id, date: new Date()})
            if (res.data[0]) setOverviewData(res.data[0])
            setLoading(false)
        } catch (e) {
            setLoading(false)
        }
    }

    useEffect(() => {
        getStats()
    }, [id])

    const prepareOverview = () => {
        if (loading) {
            return (
                <Grid item xs={12} className={classes.loading} container justify={'center'}>
                    <CircularProgress size={64}/>
                </Grid>
            )
        }
        if (overviewData) {
            return (
                <Fade in={true} timeout={250}>
                    <Grid container justify={'flex-start'} alignItems={'center'}>
                        <Grid item xs={12} container alignItems={'center'} wrap={'nowrap'}>
                            <Typography style={{marginRight: 12}} variant={'h2'} color={'primary'}>
                                <strong>{overviewData?.name}</strong>
                            </Typography>
                            <img height={45} width={45} src={overviewData?.image}/>
                        </Grid>
                        <Grid item xs={12}>
                            <CoinCard data={overviewData}/>
                        </Grid>
                        <Grid item xs={12}>
                            <SelectedCoinChartsContainer coinId={overviewData.id}/>
                        </Grid>
                    </Grid>
                </Fade>
            )
        }
    }

    return (
        <Box>
            <Grid container className={classes.page}>
                {prepareOverview()}
            </Grid>
        </Box>
    );
}

export default CoinSelectedPage;
