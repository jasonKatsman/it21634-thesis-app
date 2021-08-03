import React, {ChangeEvent, FC, useState} from "react";
import {Grid, makeStyles, Tab, Typography} from "@material-ui/core";
import SelectAggregate from "./SelectAggregate";
import coins from "../../Dummy/coins.json";
import CustomTabs from "./CustomTabs";
import CustomOption from "./CustomOption";

const useStyles = makeStyles(() => ({
    root: {
        marginTop: 64
    }
}))
const RequestOptions: FC = ({children, ...props}) => {
    const classes = useStyles()
    const [selectedValue, setSelectedValue] = useState('')
    const [tabValue, setTabValue] = useState('')

    const onSelectCoinChange = (e: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
        setSelectedValue(e.target.value as string)
    }

    const prepareSelectOptions = () => {
        return coins.map((coin, i) => {
            return <CustomOption value={coin}>{coin}</CustomOption>
        })
    }

    return (
        <Grid container item className={classes.root} xs={12} justify={'center'} alignItems={'center'}>
            <Grid item xs={12}>
                <Typography align={'center'} variant={'h6'}>No coin selected!</Typography>
            </Grid>
            <Grid item container justify={'center'} xs={12}>
                <SelectAggregate selectTitle={'Select a coin'}
                                 value={selectedValue} onChange={onSelectCoinChange}
                                 id={'coin-select-22'}
                                 style={{minWidth: 300}}>
                    {prepareSelectOptions()}
                </SelectAggregate>
            </Grid>
            <Grid item container justify={'center'} style={{marginTop: 16}} xs={12}>
                <CustomTabs value={tabValue} setValue={setTabValue}>
                    <Tab label={'This week'} value={'weekly'}/>
                    <Tab label={'This month'} value={'monthly'}/>
                    <Tab label={'Last 6 months'} value={'6-months'}/>
                    <Tab label={'This Year'} value={'yearly'}/>
                </CustomTabs>
            </Grid>
        </Grid>
    )
}

export default RequestOptions