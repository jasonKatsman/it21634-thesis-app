
import React, {FC} from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
const useStyles = makeStyles((theme: Theme) => ({
    card: {
        maxWidth: 560,
        borderRadius: 8,
        border: `3px solid ${theme.palette.primary.main}`,
        margin: 8,
        maxHeight:250
    },
    cardButton: {
        overflow: 'auto',
        padding: 12,

    },
    media: {
        borderRadius: 8,
        height: 50,
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

const RowHomeCard: FC<homeCardProps> = ({onClick, image, title, subtitle}) => {
    const classes = useStyles();
    return (
        <Card elevation={3} className={classes.card}>
            <CardActionArea onClick={onClick} className={classes.cardButton}>
                <CardContent>
                    <Grid container spacing={1}>
                       <Grid item xs={5}>
                        <img width={'100%'} height={'100%'} src={image}/>
                       </Grid>
                        <Grid item  xs={7}>
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
                        </Grid>
                    </Grid>

                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default RowHomeCard;
