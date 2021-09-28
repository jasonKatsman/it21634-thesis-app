import React, {FC} from 'react';
import {Box, BoxProps, makeStyles, Theme, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        color: 'white',
        padding: '8px 12px',
        background: 'gray',
        opacity: 0.8,
        borderRadius: 8
    }
}))

type extraProps = {
    className?: any
    percentage?: number
}

const PercentageBox: FC<BoxProps & extraProps> = ({
                                                      percentage,
                                                      className,
                                                      ...props
                                                  }) => {
    const classes = useStyles();

    const prepareBackground = () => {
        return percentage && percentage > 0 ? 'green' : 'red'
    }

    return (
        <Box style={{background: prepareBackground()}} className={`${classes.root} ${className}`} {...props}>
            <Typography variant={'h6'}><strong>{percentage?.toFixed(2)}%</strong></Typography>
        </Box>
    );
}

export default PercentageBox;
