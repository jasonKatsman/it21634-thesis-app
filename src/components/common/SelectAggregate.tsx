import React, {FC} from "react";
import {FormControl, InputLabel, makeStyles, Select, SelectProps} from "@material-ui/core";

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
        maxWidth: '250px'

    }
}))

type selectAggregateProps = {
    selectTitle: string
}

const SelectAggregate: FC<SelectProps & selectAggregateProps> = ({selectTitle, children, ...props}) => {
    const classes = useStyles()

    return <FormControl>
        <InputLabel htmlFor={'aggregate-select'}>{selectTitle}</InputLabel>
        <Select id={'aggregate-select'} className={classes.select} {...props}>
            {children}
        </Select>
    </FormControl>
}

export default SelectAggregate