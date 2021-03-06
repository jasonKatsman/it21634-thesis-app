import React, {FC} from 'react';
import {
    Box,
    ButtonBase,
    ButtonBaseProps,
    Card,
    IconButton,
    makeStyles,
    Theme,
    Tooltip,
    Typography
} from "@material-ui/core";
import {DeleteForeverOutlined, EditOutlined, RadioButtonChecked, RadioButtonUnchecked} from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        position: 'relative',
    },
    interactive: {
        // border: '2px solid black'
    },
    selected: {
        boxShadow: `0px 0px 5px 1px ${theme.palette.primary.main}`
    },
    childWrapper: {
        '& #deleteButton': {
            display: 'none'
        },
        '& #editButton': {
            display: 'none'
        },
        '&:hover': {
            '& #deleteButton': {
                display: 'block'
            },
            '& #editButton': {
                display: 'block'
            },
        },
    },
    deleteIcon: {
        boxShadow: `0 0 2px 1px ${theme.palette.error.light}`,
        color: theme.palette.error.light,
        position: 'absolute',
        padding: 4,
        right: 4,
        bottom: 4,
        zIndex: 10,
        "&:hover": {
            display: 'block'
        }
    },
    editIcon: {
        boxShadow: `0 0 2px 1px ${theme.palette.primary.main}`,
        color: theme.palette.primary.main,
        position: 'absolute',
        right: 4,
        padding: 4,
        bottom: 42,
        zIndex: 10,
        "&:hover": {
            display: 'block'
        }
    },
    radioButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        '& svg': {
            width: 30,
            height: 30,
            color: theme.palette.primary.main,
        }
    }
}))

type previewWrapperProps = {
    isInteractive?: boolean,
    selected: boolean,
    onDeleteClick?: () => void
    onEditClick?: () => void
    title?: any
}

const PreviewWrapper: FC<previewWrapperProps & ButtonBaseProps> = ({
                                                                       title,
                                                                       onDeleteClick,
                                                                       onEditClick,
                                                                       isInteractive = false,
                                                                       selected,
                                                                       children,
                                                                       ...props
                                                                   }) => {
    const classes = useStyles();
    return (
        <Card elevation={isInteractive ? 6 : 2}
              className={`${classes.root}  ${isInteractive && classes.interactive} ${selected && isInteractive && classes.selected}`}>
            <Typography variant={'subtitle2'} style={{margin: '0 0 4px 8px'}} color={'secondary'}>{title}</Typography>
            {isInteractive ?
                <ButtonBase {...props}>
                    {children}
                    <Box className={classes.radioButton}>
                        {selected ? <RadioButtonChecked/> : <RadioButtonUnchecked/>}
                    </Box>
                </ButtonBase> :
                <Box className={classes.childWrapper}>
                    {onDeleteClick ?
                        <Tooltip arrow title={'Delete Chart!'} placement={'top-end'}>
                            <IconButton onClick={onDeleteClick}
                                        id={'deleteButton'}
                                        className={classes.deleteIcon}>
                                <DeleteForeverOutlined/>
                            </IconButton></Tooltip> :
                        undefined}

                    {onEditClick ?
                        <Tooltip arrow title={'Edit Chart!'} placement={'top-end'}>
                            <IconButton onClick={onEditClick}
                                        id={'editButton'}
                                        className={classes.editIcon}>
                                <EditOutlined/>
                            </IconButton></Tooltip> : undefined}
                    {children}
                </Box>
            }
        </Card>
    );
}

export default PreviewWrapper;
