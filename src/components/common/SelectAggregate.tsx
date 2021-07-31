import React, {FC} from "react";
import {FormControl, InputLabel, makeStyles, Select, SelectProps} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(() => ({
    option: {
        cursor: 'pointer',
        margin: '2px 16px',
        padding: '4px 4px',

        '&:hover': {
            background: 'lightgray',
            borderRadius: 4
        }
    },
    select: {
        minWidth: '150px',
        padding: '4px 8px',
        width: '100% !important',
        boxShadow: '0 1px 4px 2px #E8E8E8',
        border: '1px solid #C0C0C0',
        borderRadius: 4,
        transition: '0.2s',
        background: 'white',
        '&:hover': {
            background: 'whitesmoke',
        },
        '& :focus': {
            background: 'none'
        }
    },
    formControl: {}
}))

type selectAggregateProps = {
    selectTitle?: string
}

const SelectAggregate: FC<SelectProps & selectAggregateProps> = ({selectTitle, children, ...props}) => {
    const classes = useStyles()

    return <FormControl className={classes.formControl}>
        {selectTitle ? <InputLabel htmlFor={'aggregate-select'}>{selectTitle}</InputLabel> : undefined}
        <Select MenuProps={{
            anchorOrigin: {
                vertical: "bottom",
                horizontal: "left"
            },
            transformOrigin: {
                vertical: "top",
                horizontal: "left"
            },
            getContentAnchorEl: null
        }} disableUnderline={true} IconComponent={ExpandMoreIcon} id={'aggregate-select'}
                className={classes.select} {...props}>
            {children}
        </Select>
    </FormControl>
}

export default SelectAggregate