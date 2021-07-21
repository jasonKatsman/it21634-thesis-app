import React, {FC, useEffect} from 'react';
import {Box, Card, CardActionArea, CardContent, CardMedia, Grid, makeStyles, Typography} from "@material-ui/core";
import chartMultiple from '../images/chartMultiple.png'
import {useHistory} from "react-router";
import background from '../images/equalizer.jpg'

const useStyles = makeStyles(() => ({
    card: {
        maxWidth: 360,
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
        color:'whitesmoke',
        margin: '16px 64px',
        padding: 12,
        borderRadius: 8,
        background: 'white',
        position: 'relative',
        zIndex: 5,
        '&:after': {
            zIndex: -1,
            // borderTopRightRadius: 8,
            // borderTopLeftRadius: 8,
            //height:300,
            borderRadius:8,
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
           opacity: 0.95
        }

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
    useEffect(() => {
        const getData = async () => {
            try {
            } catch (e) {
                console.log(e)
            }
        }
        getData();

    }, [])

    return (
        <Box mt={2} className={classes.page}>
            <Grid container justify={'center'} wrap={'nowrap'}>
                <Grid item xs={12} style={{ marginTop:15}}>
                    <Typography align={'center'} gutterBottom variant="h4">
                        Welcome to OpenGraph.
                    </Typography>
                    <Typography align={'center'} gutterBottom variant="h6">
                        Chart maker using Cryptocurrency data. New data from 10 different currencies. </Typography>
                </Grid>
                <Grid item container justify={'center'} style={{marginTop: 16}}>
                    <Card elevation={3} className={classes.card}>
                        <CardActionArea onClick={() => history.push('/create')} className={classes.cardButton}>
                            <CardMedia className={classes.media}
                                       title={'Make your own custom chart!'} image={chartMultiple}/>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Make your own custom coin chart!
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    You can fetch coin data, aggregate them, make charts, and combine them. <strong>Click
                                    to
                                    begin!</strong>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item container justify={'center'} style={{ marginTop:16}}>
                    <Card elevation={3} className={classes.card}>
                        <CardActionArea onClick={() => history.push('/create')} className={classes.cardButton}>
                            <CardMedia className={classes.media}
                                       title={'Make your own custom chart!'} image={chartMultiple}/>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Make your own custom coin chart!
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    You can fetch coin data, aggregate them, make charts, and combine them. <strong>Click
                                    to
                                    begin!</strong>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Home;
