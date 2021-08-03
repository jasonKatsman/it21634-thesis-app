import React, {FC} from "react";
import {makeStyles, Tabs, TabsProps} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    tabs: {
        color: 'rgba(0,0,0,0.9)',
        '& button': {
            '&:hover': {
                borderRadius:6,
                background: 'rgba(0,0,0,0.05)'
            }
        }
    },
    indicator: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        height: 7,
        background: '#343434'
    },
}))

type CustomTabsProps = {
    value: string
    setValue: (val: string) => void
}

const CustomTabs: FC<TabsProps & CustomTabsProps> = ({children, value, setValue, ...props}) => {
    const classes = useStyles()

    return (
        <Tabs className={classes.tabs} classes={{indicator: classes.indicator}} value={value}
              onChange={(e, val) => setValue(val)} {...props}>
            {children}
        </Tabs>
    )
}

export default CustomTabs