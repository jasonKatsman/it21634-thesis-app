import React, {FC} from "react";
import {makeStyles, Tabs, TabsProps, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    tabs: {
        color: 'rgba(0,0,0,0.9)',

        '& button': {
            margin:'0 12px',
            padding:6,
            textTransform:'none',
            minHeight:0,
            color:'#02254b',
            fontSize:16,
            fontWeight:'bold',
            '&:hover': {
                borderRadius: 6,
                background: 'rgba(0,0,0,0.05)'
            }
        },
        '& .Mui-selected':{
            background:"#02254b",
            borderRadius:6,
            color: 'white',
            transition:'0.2s',
            '&:hover':{
                background:"#02254b",
            }

        }
    },
    indicator: {
        background: 'transparent'
    },
}))

type CustomButtonTabsProps = {
    value: string
    setValue: (val: string) => void
}

const CustomButtonTabs: FC<TabsProps & CustomButtonTabsProps> = ({children, value, setValue, ...props}) => {
    const classes = useStyles()

    return (
        <Tabs className={classes.tabs} classes={{indicator: classes.indicator}} value={value}
              onChange={(e, val) => setValue(val)} {...props}>
            {children}
        </Tabs>
    )
}

export default CustomButtonTabs