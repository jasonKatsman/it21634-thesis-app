import React, {FC, useState} from 'react';
import {Box, InputAdornment, List, ListItem, makeStyles, TextField, Theme, Typography} from "@material-ui/core";
import {CloseOutlined, SearchOutlined} from "@material-ui/icons";
import coins from "../../Dummy/coinNamesWithDetails.json";
import {useHistory} from "react-router";

const useStyles = makeStyles((theme: Theme) => ({
    input: {
        border: 'none',
        boxShadow: '0 0 0 1px lightgray',
        position: 'relative',
        padding: 8,
        borderRadius: 8,
        width: 300,
        [theme.breakpoints.down('sm')]: {
            marginLeft: 32
        },
        [theme.breakpoints.down('xs')]: {
            width: 200,
            minWidth: 100,
            marginLeft: 16,
            padding: 4,
        },
        '&:hover': {
            boxShadow: `0 0 0 1px ${theme.palette.secondary.main}`,
        }
    },
    list: {
        position: 'absolute',
        top: 66,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        width: 315,
        [theme.breakpoints.down('sm')]: {
            marginLeft: 32
        },
        [theme.breakpoints.down('xs')]: {
            marginLeft: 0,
            width: 250
        },
        boxShadow: '3px 0px 6px 3px lightgray',
        background: 'white',
        '&>:nth-child(n)': {
            cursor: 'pointer',
            padding: '4px 12px',
            justifyContent: 'flex-start',
            '&:hover': {
                background: 'whitesmoke',
            }
        }
    },
    cursor: {
        cursor: 'pointer'
    }

}))

const SearchComponent: FC = () => {
    const classes = useStyles();
    const history = useHistory()
    const [inputValue, setInputValue] = useState('')
    const [focused, setFocused] = useState(false)

    const prepareCoins = () => {
        const filtered = coins.filter((item) => item.name.toLowerCase().includes(inputValue.toLowerCase()))
        if (filtered.length) {
            return filtered.map((item) => <ListItem onClick={(e: any) => {
                setInputValue(item.name.toLowerCase())
                history.push('/preview/' + item.name.toLowerCase())
            }}>
                <Typography
                    color={'primary'}
                    variant={'body1'}
                >
                    <strong>{item.name}</strong>
                </Typography>
                <Typography
                    style={{marginLeft: 3}}
                    variant={'caption'}
                    color={'secondary'}
                >
                    {item.abr}
                </Typography>
            </ListItem>)
        }

        return <ListItem alignItems={'center'}><Typography
            color={'primary'}
            variant={'body1'}
            align={"center"}
        >
            <strong>no available results</strong>
        </Typography></ListItem>

    }

    const clearInput = () => {
        setInputValue('')
    }

    return (
        <Box>
            <TextField
                onBlur={() => setTimeout(() => setFocused(false), 150)}
                onFocus={() => setFocused(true)}
                className={classes.input}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={'Search coins'}
                InputProps={{
                    disableUnderline: true,
                    endAdornment: (
                        <InputAdornment position="end">
                            {inputValue ? <CloseOutlined className={classes.cursor} onClick={clearInput}/> :
                                <SearchOutlined/>}
                        </InputAdornment>
                    ),
                }}
            >
            </TextField>
            <List style={{display: !focused ? 'none' : 'block'}} className={classes.list}>
                {prepareCoins()}
            </List>
        </Box>
    );
}

export default SearchComponent;
