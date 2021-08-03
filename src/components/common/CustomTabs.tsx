import React, {FC} from "react";
import {makeStyles, Tabs, TabsProps, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    tabs: {
        color: 'rgba(0,0,0,0.9)',
        '& button': {
            '&:hover': {
                borderRadius: 6,
                background: 'rgba(0,0,0,0.05)'
            }
        }
    },
    indicator: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        height: 6,
        background: theme.palette.primary.main
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