import React, {FC, useEffect, useState} from 'react';
import {Box, Input, List, ListItem, Checkbox, ListItemText, makeStyles} from "@material-ui/core";
import Dimensions from '../Dummy/DimensionsDummy.json'

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

const Home: FC = () => {
    const classes = useStyles();
    const [selectedDimension, setSelectedDimension] = useState('')
    const [search, setSearch] = useState('')
    const [dimensions, setDimensions] = useState<{ Code: string, Title: string }[]>([])
    useEffect(() => {
        const getData = async () => {
            try {
                const res = Dimensions
                setDimensions(res.value)
                //const res = await getDimensions()
                console.log(res.value)
            } catch (e) {
                console.log(e)
            }
        }
        getData();

    }, [])
    const prepareDimensionItems = () => {
        return dimensions.filter(item => item.Title.toLowerCase().includes(search.toLowerCase()))
            .map((item, i) => {
                return <ListItem button={true} focusRipple={true} key={i}
                                 onClick={() => setSelectedDimension(item.Code)}
                                 className={classes.listItem}>

                    <Checkbox checked={item.Code === selectedDimension}/>
                    <ListItemText primary={item.Title} secondary={item.Code}/>
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

export default Home;
