import React, {FC} from 'react';
import {Box, BoxProps, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import {prepareIcon, preparePercentageClass} from "../../utils/rowPercentageColorFunctions";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: '32px 0 40px 32px',
    },
    title: {},
    icon: {
        marginLeft: 8,
        display: 'flex'
    },
    extraBox: {
        marginTop: 32
    }
}))

type extraProps = {
    className?: any
    title?: string
    value?: number
    extraTitle?: string
    firstPrercentage?: boolean
    isPercentage?: boolean
    extraValue?: number
}

const CryptoInfoBox: FC<BoxProps & extraProps> = ({
                                                      firstPrercentage,
                                                      isPercentage = true,
                                                      extraTitle,
                                                      extraValue = 0,
                                                      title,
                                                      value,
                                                      className,
                                                      ...props
                                                  }) => {
    const classes = useStyles();
    const colorDay = preparePercentageClass(extraValue)
    return (
        <Box className={`${classes.root} ${className}`} {...props}>
            <Typography className={classes.title} color={'primary'} variant={'h6'}>
                <strong>{title}</strong>
            </Typography>
            <Typography color={'primary'} variant={'body1'}>
                {firstPrercentage ?
                    <strong>{value?.toFixed(2)}%</strong>
                    :
                    <strong>€{value}</strong>}
            </Typography>
            <Grid container wrap={'nowrap'} className={classes.extraBox}>
                <Grid item>
                    <Typography color={'primary'}>
                        {extraTitle}
                    </Typography>
                </Grid>
                <Box className={classes.icon}>
                    {isPercentage && prepareIcon(extraValue)}
                    {isPercentage ? <Typography style={{color: colorDay}}>
                        {extraValue?.toFixed(2)}%
                    </Typography> : <Typography color={'secondary'}>
                        <strong>{extraValue}€</strong>
                    </Typography>}
                </Box>
            </Grid>
        </Box>
    );
}

export default CryptoInfoBox;
