import React, {FC} from 'react';
import {Card, CardActionArea, CardContent, CardMedia, makeStyles, Theme, Typography} from "@material-ui/core";
const useStyles = makeStyles((theme: Theme) => ({
    card: {
        maxWidth: 360,
        borderRadius: 8,
        border: `3px solid ${theme.palette.primary.main}`,
        margin: 8
    },
    cardButton: {
        overflow: 'auto',
        height: 450,
        padding: 12,

    },
    media: {
        borderRadius: 8,
        height: 250,
        '& *': {
            objectFit: 'cover'

        }
    }
}))

interface homeCardProps {
    image: string,
    title: string,
    subtitle: string
    onClick: () => void
}

const HomeCard: FC<homeCardProps> = ({onClick, image, title, subtitle}) => {
    const classes = useStyles();
    return (
        <Card elevation={3} className={classes.card}>
            <CardActionArea onClick={onClick} className={classes.cardButton}>
                <CardMedia className={classes.media}
                           title={title} image={image}/>
                <CardContent>
                    <Typography color={'primary'} style={{fontWeight: "bold"}} align={'center'}
                                gutterBottom
                                variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="secondary" align={'center'} component="p">
                        {subtitle} <strong>Click
                        to
                        begin!</strong>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default HomeCard;
