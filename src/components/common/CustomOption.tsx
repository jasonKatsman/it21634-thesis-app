import React, {FC, OptionHTMLAttributes} from "react";
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
    }
}))
const CustomOption: FC<OptionHTMLAttributes<HTMLOptionElement>> = ({children, ...props}) => {
    const classes = useStyles()

    return <option className={classes.option} {...props}>{children}</option>
}

export default CustomOption