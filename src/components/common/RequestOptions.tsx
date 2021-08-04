import React, {ChangeEvent, FC} from "react";
import {Button, Divider, Grid, makeStyles, Tab, Typography} from "@material-ui/core";
import SelectAggregate from "./SelectAggregate";
import coins from "../../Dummy/coins.json";
import frequencyOptions from "../../Dummy/frequencyOptions.json";

import CustomTabs from "./CustomTabs";
import CustomOption from "./CustomOption";

const useStyles = makeStyles(() => ({
    root: {
        marginTop: 50
    },
    button: {
        width: 300,
        padding: 12
    }
}))
type RequestOptionsProps = {
    requestValue: { time: string, coin: string }
    setRequestValue: (val: { time: string, coin: string }) => void
    onButtonClick: () => void

}
const RequestOptions: FC<RequestOptionsProps> = ({
                                                     children,
                                                     onButtonClick,
                                                     requestValue,
                                                     setRequestValue,
                                                     ...props
                                                 }) => {
    const classes = useStyles()

    const onSelectCoinChange = (e: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
        setRequestValue({...requestValue, coin: e.target.value as string})
    }

    const prepareSelectOptions = () => {
        return coins.map((coin) => {
            return <CustomOption value={coin}>{coin}</CustomOption>
        })
    }

    return (
        <Grid container item className={classes.root} xs={12} justify={'center'} alignItems={'center'}>
            <Grid item container justify={'center'} xs={12}>
                <Typography variant={'h5'} color={'secondary'} style={{fontWeight: 'bold'}}>Please pick a coin and the desired duration!</Typography>
            </Grid>
            <Grid item xs={6} style={{margin: '10px'}}>
                <Divider/>
            </Grid>
            <Grid item container justify={'center'} style={{marginTop: '12px'}} xs={12}>
                <SelectAggregate selectTitle={'Select a coin'}
                                 value={requestValue.coin} onChange={onSelectCoinChange}
                                 id={'coin-select-22'}
                                 style={{minWidth: 300}}>
                    {prepareSelectOptions()}
                </SelectAggregate>
            </Grid>
            <Grid item container justify={'center'} style={{margin: '24px 0'}} xs={12}>
                <CustomTabs variant={'scrollable'} value={requestValue.time} setValue={(val) => setRequestValue({...requestValue, time: val})}>
                    {frequencyOptions.map(freq=>{
                        return <Tab label={freq.title} value={freq.value}/>
                    })}
                </CustomTabs>
            </Grid>
            <Grid item container justify={'center'} xs={12}>
                <Button onClick={onButtonClick} disabled={!requestValue.coin} variant={'contained'} color={'primary'}
                        className={classes.button}><Typography variant={'body1'}>APPLY</Typography></Button>
            </Grid>
        </Grid>
    )
}

export default RequestOptions