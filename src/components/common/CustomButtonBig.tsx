import React, {FC} from 'react';
import {Button, ButtonProps, makeStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    button: {
        textTransform: 'none',
        color: 'white',
        fontWeight: 600,
        textDecoration: 'none',
        padding: (props: any) => props.padding ? props.padding : '6px 16px',
        boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
        '&:hover': {
            boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,

            background: 'white',
            color: theme.palette.primary.main,
        }
    },
}))

type extraProps = {
    className?: any,
    padding?: string
}

const CustomButtonBig: FC<ButtonProps & extraProps> = ({padding, className, children, ...props}) => {
    const classes = useStyles({padding});

    return (

        <Button className={`${classes.button} ${className}`} variant={'contained'} color={'primary'} {...props}>
            {children}
        </Button>
    );
}

export default CustomButtonBig;
