import React, {FC} from 'react';
import {Box, BoxProps, makeStyles, Theme, Typography} from "@material-ui/core";
import {prepareIcon, preparePercentageClass} from "../../utils/rowPercentageColorFunctions";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        padding: '8px 12px 8px 6px',
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

    return (
        <Box style={{background: preparePercentageClass(percentage??0)}} className={`${classes.root} ${className}`} {...props}>
            {percentage && prepareIcon(percentage, true)}<Typography
            variant={'h6'}><strong>{percentage?.toFixed(2)}%</strong></Typography>
        </Box>
    );
}

export default PercentageBox;
