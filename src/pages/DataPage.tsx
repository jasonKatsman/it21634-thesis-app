import React, {FC, useEffect} from 'react';
import {Box, makeStyles} from "@material-ui/core";
import {useParams} from "react-router";
import {getDataById} from "../http/endpoints/dimensions";

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

const DataPage: FC = () => {
    const classes = useStyles();
    const {id} = useParams<{ id: string }>()
    useEffect(() => {
        const getData = async () => {
            try {
//                setDimensions(res.value)
                const res = await getDataById(id)
                console.log(res)
            } catch (e) {
                console.log(e)
            }
        }
        getData();

    }, [id])


    return (
        <Box style={{fontSize: 50}}>

        </Box>
    );
}

export default DataPage;
