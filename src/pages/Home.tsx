import React, {FC} from 'react';
import {Box, Fade, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import chartMultiple from '../images/chartMultiple.png'
import customChart from '../images/customChart.svg'

import {useHistory} from "react-router";
import HomeCard from "../components/common/HomeCard";
// import background from '../images/equalizer.jpg'

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        maxWidth: 360,
        borderRadius: 8,
        border: `3px solid ${theme.palette.secondary.main}`,
        margin: 8
    },
    backgroundImage: {
        position: 'absolute',
        height: 400,
        width: '100%',
        objectFit: 'cover'
    },
    cardButton: {
        padding: 12,

    },
    page: {
        marginBottom: 32,
        boxShadow: `0 0 0 6px ${theme.palette.primary.main}`,
        color: 'whitesmoke',
        marginTop: '32px',
        padding: 24,
        borderRadius: 8,
        background: 'white',
        position: 'relative',
        zIndex: 5,
        // '&:after': {
        //     zIndex: -1,
        //     // borderTopRightRadius: 8,
        //     // borderTopLeftRadius: 8,
        //     //height:300,
        //     borderRadius:8,
        //     content: '""',
        //     position: 'absolute',
        //     top: 0,
        //     right: 0,
        //     left: 0,
        //     bottom: 0,
        //     backgroundImage: `url(${background})`,
        //     backgroundSize: 'cover',
        //    opacity: 0.95
        // }
    },
    media: {
        height: 250,
        '& *': {
            objectFit: 'cover'

        }
    }
}))

const Home: FC = () => {
    const classes = useStyles();
    const history = useHistory()
    return (
        <Box>
            <Grid container justify={'space-around'} className={classes.page}>
                <Fade in={true} timeout={1500}>
                    <Grid item xs={12} style={{marginTop: 20}}>
                        <Typography align={'center'} color={'primary'} style={{fontWeight: 'bold'}} gutterBottom
                                    variant="h2">
                            Welcome to OpenGraph.
                        </Typography>
                        <Typography align={'center'} color={'secondary'} gutterBottom variant="h5">
                            Chart maker using Cryptocurrency data. New data from 10 different
                            currencies. </Typography>

                    </Grid>
                </Fade>
                <Fade in={true} timeout={2000}>
                    <Grid item xs={12} sm={'auto'} container justify={'center'} style={{marginTop: 16}}>
                        <Grid item xs={12} sm={'auto'}>
                            <HomeCard onClick={() => history.push('/compare')} image={chartMultiple} title={'Compare crypto statistics!'}
                                      subtitle={'Pick the coins, time and statistic element you want to compare.'}/>
                        </Grid>
                        <Grid item xs={12} sm={'auto'}>
                            <HomeCard onClick={() => history.push('/create')} image={customChart} title={'Make your own chart!'}
                                      subtitle={'Make a chart from scratch. Pick a coin, the fields of the axes, then customize the chart depending your needs!'}/>
                        </Grid>
                    </Grid>
                </Fade>
            </Grid>
        </Box>
    );
}

export default Home;
