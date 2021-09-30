import React, {FC, useState} from 'react';
import {Box, InputAdornment, List, ListItem, makeStyles, TextField, Theme, Typography} from "@material-ui/core";
import {SearchOutlined} from "@material-ui/icons";
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
        '&:hover': {
            boxShadow: `0 0 0 1px ${theme.palette.secondary.main}`,
        }
    },
    list: {
        position: 'absolute',
        top: 68,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        width: 300,
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
                console.log('haha')
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
                            <SearchOutlined/>
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
