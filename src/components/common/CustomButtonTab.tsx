import React, {FC} from "react";
import {makeStyles, Tabs, TabsProps, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    tabs: {
        color: 'rgba(0,0,0,0.9)',

        '& button': {
            minWidth: (props: any) => props.mini ? 0 : undefined,
            margin: (props: any) => props.mini ? '0 6px' : '0 12px',
            padding: (props: any) => props.mini ? '6px 10px' : 6,
            fontSize: (props: any) => props.mini ? 12 : 16,
            textTransform: 'none',
            minHeight: 0,
            color: '#02254b',
            fontWeight: 'bold',
            '&:hover': {
                borderRadius: 6,
                background: 'rgba(0,0,0,0.05)'
            }
        },
        '& .Mui-selected': {
            background: "#02254b",
            borderRadius: 6,
            color: 'white',
            transition: '0.2s',
            '&:hover': {
                background: "#02254b",
            }

        }
    },
    indicator: {
        background: 'transparent'
    },
}))

type CustomButtonTabsProps = {
    value: string
    setValue: (val: string) => void,
    mini?: boolean
}

const CustomButtonTabs: FC<TabsProps & CustomButtonTabsProps> = ({
                                                                     mini = false,
                                                                     children,
                                                                     value,
                                                                     setValue,
                                                                     ...props
                                                                 }) => {
    const classes = useStyles({mini})

    return (
        <Tabs className={classes.tabs} classes={{indicator: classes.indicator}} value={value}
              onChange={(e, val) => setValue(val)} {...props}>
            {children}
        </Tabs>
    )
}

export default CustomButtonTabs