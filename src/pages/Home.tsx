import React, {FC, useEffect, useState} from 'react';
import {Box, List, ListItem, ListItemText} from "@material-ui/core";
import Dimensions from '../Dummy/DimensionsDummy.json'

const Home: FC = () => {
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
    return (
        <Box style={{fontSize: 50}}>
            <List>
                {dimensions.map((item, i) => {
                    return <ListItem key={i}>
                        <ListItemText primary={item.Title} secondary={item.Code}/>
                    </ListItem>
                })}
            </List>

        </Box>
    );
}

export default Home;
