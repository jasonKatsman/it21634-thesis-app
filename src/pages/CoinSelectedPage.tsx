import React, {FC, useEffect, useState} from 'react';
import {Box, CircularProgress, Grid, makeStyles, Theme, Typography} from "@material-ui/core";

import {useHistory, useParams} from "react-router";
import {getOverviewStats} from "../http/endpoints/overviewCoins";
import CoinCard from "../components/common/CoinCard";
// import background from '../images/equalizer.jpg'

const useStyles = makeStyles((theme: Theme) => ({
    page: {
        marginBottom: 32,
        marginTop: 16,
        //padding: 24,
        borderRadius: 8
    },
    loading: {
        marginTop: 64
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
    return (
        <Box>
            <Grid container className={classes.page}>
                {loading ?
                    <Grid item xs={12} className={classes.loading} container justify={'center'}>
                        <CircularProgress size={64}/>
                    </Grid> :
                    <Grid container justify={'flex-start'} alignItems={'center'}>
                        <Grid item xs={12} container alignItems={'center'} wrap={'nowrap'}>
                            <Typography style={{marginRight: 16}} variant={'h2'} color={'primary'}>
                                <strong>{overviewData?.name}</strong>
                            </Typography>
                            <img height={55} width={55} src={overviewData?.image}/>
                        </Grid>
                        <Grid item xs={12}>
                            {overviewData ? <CoinCard data={overviewData}/> : undefined}
                        </Grid>
                    </Grid>}
            </Grid>
        </Box>
    );
}

export default CoinSelectedPage;
