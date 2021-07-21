import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {
    Accordion, AccordionDetails, AccordionSummary,
    Box,
    Button, Divider,
    FormControl,
    Grid, InputLabel, List, ListItem,
    makeStyles,
    Select, Tab, Tabs,
    Typography
} from "@material-ui/core";
import coins from '../../Dummy/coins.json'
import coinFields from '../../Dummy/coinFields.json'
import TextFieldsIcon from '@material-ui/icons/TextFields';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import {vegaEncodingType, vegaFieldType} from "../../Types/VegaFieldType";
import VegaLiteComponent from "../vega/VegaLiteComponent";
import dummyCoin from '../../Dummy/dummyCoin.json'
import SelectAggregate from "../common/SelectAggregate";
import {findValueType} from "../../utils/findValueType";
import aggregateOptions from "../../Dummy/aggregateOptions.json";
import markOptions from "../../Dummy/markOptions.json";
import CustomOption from "../common/CustomOption";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FieldsTab from "./tabs/FieldsTab";
import DetailsTab from "./tabs/DetailsTab";

const useStyles = makeStyles(() => ({
    root: {
        position: 'relative',
        padding: 32,
        minHeight: 'calc( 100vh - 220px )',
    },
    inputBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    coinBox: {
        marginTop: 16,
    },
    indicator: {
        backgroundColor: '#323232'
    },
    tab: {
        '&.MuiTab-root': {
            minWidth: 0,
            minHeight: 0,
            padding: 2,
            borderRadius: 4
        },
    },
    buttons: {
        position: 'absolute',
        bottom: 24,
        right: 24
    },
    chartBox: {
        borderLeft: '12px solid #ffffff',
        width: '100%',

        height: 'calc( 80vh - 200px )'
    },
    options: {
        cursor: 'pointer',
        margin: '2px 16px',
        padding: '4px 4px',

        '&:hover': {
            background: 'lightgray',
            borderRadius: 4
        }
    },
    list: {
        maxHeight: 'calc( 80vh - 270px )',
        overflow: 'auto',
        '& > *': {
            padding: '12px 12px',
            width: 'calc( 100% - 8px )'
        },
        '&::-webkit-scrollbar-track': {
            background: '#dfdfdf',
            borderRadius: 4,

        },
        '&::-webkit-scrollbar': {
            width: 8,
            borderRadius: 4,

        },
        '&::-webkit-scrollbar-thumb': {
            background: '#686868',
            borderRadius: 4,
        },
    },
    creationBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 200
    },
    noPointerEvents: {
        pointerEvents: 'none'
    },
    chartText: {
        position: 'absolute',
        inset: 0,
        height: 20,
        margin: 'auto',
        textAlign: 'center',
        color: 'gray'
    },
    chartArea: {
        boxShadow: '0 0 0 1px rgba(63, 81, 181, 0.5)',
        position: 'relative',
        marginTop: 'auto',
        height: '15%', width: '100%', display: 'flex', borderRadius: 8, overflow: 'hidden',
        backgroundColor: '#f8f8f8',
    },
    leftBox: {
        width: '50%',
        height: '100%',
        transition: '0.5s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        '&:hover': {
            background: '#eeeeee',
        }
    },
    rightBox: {
        width: '50%',
        height: '100%',
        transition: '0.5s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        '&:hover': {
            background: '#eeeeee',
        }
    }

}))

const CreateDialog: FC = () => {
    const classes = useStyles();
    const [selectedValue, setSelectedValue] = useState('')
    const [tabValue, setTabValue] = useState('fields')
    const [currentDrag, setCurrentDrag] = useState(false)
    const [yDrag, setYDrag] = useState(false)
    const [xDrag, setXDrag] = useState(false)
    const [xAxis, setXAxis] = useState<vegaFieldType>({
        aggregate: '',
        field: '',
        type: 'nominal',
        title: '',
        bin: false
    })
    const [yAxis, setYAxis] = useState<vegaFieldType>({
        aggregate: '',
        field: '',
        type: 'nominal',
        title: '',
        bin: false
    })
    const [encodingContent, setEncodingContent] = useState<vegaEncodingType>({
        size: {
            value: '10',
        },
        opacity: {
            value: '0.4',
        },
        color: {
            value: 'blue',
        },
    })
    const [simpleStyles, setSimpleStyles] = useState({
        width: 200,
        height: 200,
        background: 'white',
        mark: 'point',
    })
    useEffect(() => {
        if (selectedValue) {
            console.log('fetching coin')
        }
    }, [selectedValue])

    const prepareSelectOptions = () => {
        return coins.map((coin, i) => {
            return <option className={classes.options} value={coin}>{coin}</option>
        })
    }
    const onSelectCoinChange = (e: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
        setSelectedValue(e.target.value as string)
    }

    const prepareTabs = () => {
        if (tabValue === 'fields') {
            return <FieldsTab currentDrag={currentDrag} setCurrentDrag={setCurrentDrag}/>
        }
        if (tabValue === 'details') {
            return <DetailsTab simpleStyles={simpleStyles} setSimpleStyles={setSimpleStyles}/>

        }
    }

    const onDragOver = (e: any) => {
        e.preventDefault()
    }
    const onDrop = (event: any) => {
        event.preventDefault()
        setXDrag(false)
        setYDrag(false)
        let data = event.dataTransfer.getData("text");
        if (event.target.id === 'x') {
            const coin: any = dummyCoin[0]
            const type = findValueType(coin[data])
            setXAxis({...xAxis, type: type, field: data})
        }
        if (event.target.id === 'y') {
            const coin: any = dummyCoin[0]
            const type = findValueType(coin[data])
            setYAxis({...yAxis, type: type, field: data})
        }
    }

    const prepareOptions = () => {
        return aggregateOptions.map(option => {
            return <CustomOption value={option.value}>{option.title}</CustomOption>
        })
    }
    const prepareChartArea = () => {
        return <Box className={classes.chartArea}>
            {!currentDrag && !xAxis.field && !yAxis.field ?
                <Typography className={classes.chartText} variant={'subtitle2'}>No fields selected. Please drag fields
                    in
                    the chart
                    area!</Typography> : undefined}
            <Box onDragOver={onDragOver}
                 onDrop={onDrop}
                 id={'x'}
                 onDragEnter={() => setXDrag(true)}
                 onDragLeave={() => setXDrag(false)}
                 style={{background: xDrag ? 'lightgray' : undefined}}
                 className={classes.leftBox}>
                {currentDrag || xAxis.field || yAxis.field ?
                    <>
                        <Typography variant={'h6'} className={classes.noPointerEvents}>
                            {xAxis.field ? xAxis.field.replaceAll('_', ' ') : 'X'}
                        </Typography>
                        <SelectAggregate selectTitle={'Aggregation'} value={xAxis.aggregate}
                                         onChange={(e) => setXAxis({
                                             ...xAxis,
                                             aggregate: e.target.value as string
                                         })}>{prepareOptions()}</SelectAggregate>
                    </>
                    : undefined}
            </Box>
            {currentDrag || xAxis.field || yAxis.field ? <Divider orientation={'vertical'}/> : undefined
            } <Box onDragOver={onDragOver}
                   onDragEnter={() => setYDrag(true)}
                   onDragLeave={() => setYDrag(false)}
                   id={'y'}
                   onDrop={onDrop} className={classes.rightBox}
                   style={{background: yDrag ? 'lightgray' : undefined}}>
            {currentDrag || yAxis.field || xAxis.field ?
                <><Typography variant={'h6'}
                              className={classes.noPointerEvents}>
                    {yAxis.field ? yAxis.field.replaceAll('_', ' ') : 'Y'}</Typography>
                    <SelectAggregate selectTitle={'Aggregation'} value={yAxis.aggregate}
                                     onChange={(e) => setYAxis({
                                         ...yAxis,
                                         aggregate: e.target.value as string
                                     })}>{prepareOptions()}</SelectAggregate></>
                : undefined}
        </Box>
        </Box>
    }

    return (
        <Box className={classes.root}>
            <Box style={{height: '100%'}}>
                <Typography variant={'h6'}>
                    Create a custom chart!
                </Typography>
                <Box className={classes.inputBox}>
                    <Typography variant={'body1'}>
                        {!selectedValue ? 'First, select a coin from the input.' : 'Drag fields in the boxes'}
                    </Typography>
                    <FormControl>
                        <InputLabel htmlFor={'coin-select'}>Select a coin</InputLabel>
                        <Select value={selectedValue} onChange={onSelectCoinChange} id={'coin-select'}
                                style={{width: 250}}>
                            {prepareSelectOptions()}
                        </Select>
                    </FormControl>
                </Box>
                <Divider/>


                <Box className={classes.coinBox}>
                    {selectedValue ? <Grid container>
                            <Grid item xs={3}>
                                <Tabs classes={{indicator: classes.indicator}} variant={'fullWidth'} value={tabValue}
                                      onChange={(e, val) => setTabValue(val)}>
                                    <Tab label={'Fields'} value={'fields'} className={classes.tab}
                                         icon={<TextFieldsIcon/>}/>
                                    <Tab label={'Details'} value={'details'} className={classes.tab}
                                         icon={<SettingsApplicationsIcon/>}/>
                                    <Tab label={'Styles'} value={'styles'} className={classes.tab} icon={<ColorLensIcon/>}/>
                                </Tabs>
                                {prepareTabs()}
                            </Grid>
                            <Grid item xs={9} className={classes.chartBox} container justify={'center'}
                                  alignItems={'center'}>
                                <Box>

                                    <VegaLiteComponent data={dummyCoin} xAxis={xAxis} yAxis={yAxis}
                                                        encoding={encodingContent}
                                                        basicStyling={simpleStyles}/>

                                </Box>
                                {prepareChartArea()}
                            </Grid>
                        </Grid> :
                        <Grid container justify={'center'} alignItems={'center'} style={{minHeight: 200}}>
                            <Typography>No coin selected</Typography>
                        </Grid>}
                </Box>
                <Box className={classes.buttons}>
                    <Button>cancel</Button>
                    <Button variant={'outlined'} color={'primary'}>SAVE</Button>
                </Box>
            </Box>
        </Box>
    );
}

export default CreateDialog;
