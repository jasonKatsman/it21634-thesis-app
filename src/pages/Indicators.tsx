import React, {FC, useEffect, useState} from 'react';
import {Box, Input, List, ListItem, ListItemText, makeStyles} from "@material-ui/core";
import IndicatorDummy from '../Dummy/IndicatorsDummy.json'
import {useHistory} from "react-router";

const useStyles = makeStyles(() => ({
    list: {
        maxHeight: 500,
        overflow: 'auto'
    },
    listItem: {
        cursor: 'pointer',
        '& > :nth-child(n)': {
            pointerEvents: 'none'
        }
    }
}))

const Indicators: FC = () => {
    const classes = useStyles();
    const [search, setSearch] = useState('')
    const history = useHistory()
    const [indicators, setIndicators] = useState<{ IndicatorCode: string, IndicatorName: string, Language: string }[]>([])
    useEffect(() => {
        const getData = async () => {
            try {
                const res = IndicatorDummy
                setIndicators(res.value)
            } catch (e) {
                console.log(e)
            }
        }
        getData();

    }, [])
    const prepareDimensionItems = () => {
        return indicators.filter(item => item.IndicatorName.toLowerCase().includes(search.toLowerCase()))
            .map((item, i) => {
                return <ListItem button={true} focusRipple={true}
                                 onClick={() => history.push(`/data/${item.IndicatorCode}`)} key={i}
                                 className={classes.listItem}>
                    <ListItemText primary={item.IndicatorName}
                                  secondary={`LANG:${item.Language} - ${item.IndicatorCode}`}/>
                </ListItem>
            })
    }
    return (
        <Box style={{fontSize: 50}}>
            <Input value={search} name={'search'} onChange={e => setSearch(e.target.value)}
                   placeholder={'search dimension'}/>
            <List className={classes.list}>
                {prepareDimensionItems()}
            </List>

        </Box>
    );
}

export default Indicators;
