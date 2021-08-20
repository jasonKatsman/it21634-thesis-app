import React, {FC} from 'react';
import {Box, BoxProps, ButtonBase, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import {CancelSharp as CancelIcon} from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
    button: {
        display: 'flex',
        alignItems: 'flex-end',
        textTransform: 'none',
        color: 'white',
        textDecoration: 'none',
        background: '#ededed',
        borderTopRightRadius: 8,
        borderTopLeftRadius: 0,
        padding: (props: any) => props.padding ? props.padding : '10px 8px 10px 28px',
        border: `2px solid ${theme.palette.primary.main}`,
    },
    deleteButton: {
        marginLeft: 24,
        borderRadius: 8,
        transform: 'scale(1.2)',
        color: theme.palette.error.light
    }
}))

type extraProps = {
    className?: any,
    padding?: string,
    title: string,
    subtitle: string
    onDeleteClick: () => void
}

const CustomButtonPill: FC<BoxProps & extraProps> = ({
                                                         onDeleteClick,
                                                         title,
                                                         subtitle,
                                                         padding,
                                                         className,
                                                         children,
                                                         ...props
                                                     }) => {
    const classes = useStyles({padding});

    return (

        <Box className={`${classes.button} ${className}`} {...props}>
            <Grid container alignItems={'flex-end'}>
                <Typography style={{fontWeight: 'bold'}} color={'primary'} variant={'subtitle2'}>{title}</Typography>
                <Typography style={{marginLeft: 3}} variant={'caption'} color={'secondary'}>{subtitle}</Typography>
            </Grid>
            <ButtonBase onClick={onDeleteClick} className={classes.deleteButton}>
                <CancelIcon/>
            </ButtonBase>
        </Box>
    );
}

export default CustomButtonPill;
