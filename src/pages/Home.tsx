import React, {FC} from 'react';
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Fade,
    Grid,
    makeStyles,
    Theme,
    Typography
} from "@material-ui/core";
import chartMultiple from '../images/chartMultiple.png'
import {useHistory} from "react-router";
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
        boxShadow: `0 0 0 6px ${theme.palette.primary.main}`,
        color: 'whitesmoke',
        marginTop: '64px',
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
            <Grid container justify={'center'} className={classes.page} wrap={'nowrap'}>
                <Fade in={true} timeout={1500}>
                    <Grid item xs={12} style={{marginTop: 80}}>
                        <Typography align={'center'} color={'primary'} style={{fontWeight: 'bold'}} gutterBottom
                                    variant="h2">
                            Welcome to OpenGraph.
                        </Typography>
                        <Typography align={'center'} color={'secondary'} gutterBottom variant="h5">
                            Chart maker using Cryptocurrency data. New data from 10 different currencies. </Typography>
                    </Grid>
                </Fade>
                <Grid item container justify={'center'} style={{marginTop: 16}}>
                    <Fade in={true} timeout={2000}>
                        <Card elevation={3} className={classes.card}>
                            <CardActionArea onClick={() => history.push('/create')} className={classes.cardButton}>
                                <CardMedia className={classes.media}
                                           title={'Make your own custom chart!'} image={chartMultiple}/>
                                <CardContent>
                                    <Typography color={'primary'} style={{fontWeight: "bold"}} align={'center'}
                                                gutterBottom
                                                variant="h5" component="h2">
                                        Make your own custom coin chart!
                                    </Typography>
                                    <Typography variant="body2" color="secondary" align={'center'} component="p">
                                        You can fetch coin data, aggregate them, make charts, and combine them. <strong>Click
                                        to
                                        begin!</strong>
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Fade>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Home;
