import React, {FC} from 'react';
import {Box, makeStyles, Theme, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    button: {
        cursor: 'pointer',
        border: `1px solid ${theme.palette.primary.main}`,
        padding: '6px 12px',
        borderRadius: 8,
        minHeight: 0
    },
    step: {
        fontWeight: 'bold',
        padding: '0 12px'
    }
}))

type extraProps = {
    className?: any,
    step: number,
    setStep: (value: number) => void
}

const ButtonNumberAdder: FC<extraProps> = ({step, setStep, className}) => {
    const classes = useStyles();

    const onAdd = () => {
        if(step>3) return
        setStep(step + 1)
    }
    const onRemove = () => {
        if (step <= 1) return
        setStep(step - 1)
    }

    return (
        <Box className={className} style={{display: 'flex', flexWrap: 'nowrap'}} alignItems={'center'}>
            <Box className={classes.button} onClick={onRemove}>-</Box>
            <Typography variant={'subtitle2'} className={classes.step}>{step}</Typography>
            <Box onClick={onAdd} className={classes.button}>+</Box>
        </Box>
    );
}

export default ButtonNumberAdder;
