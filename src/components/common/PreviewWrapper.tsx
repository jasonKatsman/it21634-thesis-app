import React, {FC} from 'react';
import {Box, ButtonBase, ButtonBaseProps, Card, makeStyles} from "@material-ui/core";
import {RadioButtonChecked, RadioButtonUnchecked} from "@material-ui/icons";


const useStyles = makeStyles(() => ({
    root: {
        position: 'relative',
    },
    interactive: {
        // border: '2px solid black'
    },
    selected: {
        boxShadow: '0px 0px 5px 1px #3f51b5'
    },
    radioButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        '& svg': {
            width: 30,
            height: 30,
            color: '#3f51b5',
        }

    }
}))

type previewWrapperProps = {
    isInteractive?: boolean,
    selected: boolean
}

const PreviewWrapper: FC<previewWrapperProps & ButtonBaseProps> = ({
                                                                       isInteractive = false,
                                                                       selected,
                                                                       children,
                                                                       ...props
                                                                   }) => {
    const classes = useStyles();
    return (
        <Card elevation={isInteractive ? 6 : 2}
              className={`${classes.root}  ${isInteractive && classes.interactive} ${selected && isInteractive && classes.selected}`}>
            {isInteractive ? <ButtonBase {...props}>
                {children}
                <Box className={classes.radioButton}>
                    {selected ? <RadioButtonChecked/> : <RadioButtonUnchecked/>}
                </Box>
            </ButtonBase> : children}
            {children}
        </Card>
    );
}

export default PreviewWrapper;
