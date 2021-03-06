import React, {FC, useEffect, useState} from 'react';
import {Box, Button, Divider, Grid, makeStyles, Tab, Tabs, Theme, Typography} from "@material-ui/core";
import TextFieldsIcon from '@material-ui/icons/TextFields';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import {Mark, Transform, vegaEncodingType, vegaFieldType} from "../../Types/VegaFieldType";
import {findValueType} from "../../utils/findValueType";
import VegaLitePreview from "../vega/VegaLitePreview";
import FieldsTab from "../Dialogs/tabs/FieldsTab";
import DetailsTab from "../Dialogs/tabs/DetailsTab";
import StylesTab from "../Dialogs/tabs/StylesTab";
import CustomButtonBig from "./CustomButtonBig";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        position: 'relative',
        padding: 32,
        minHeight: 'calc( 100vh - 150px )',
    },
    tabsContainer: {
        maxHeight: 'calc( 80vh - 270px )',
        overflow: 'auto',
        width: '100%',
        '&::-webkit-scrollbar-track': {
            background: '#dfdfdf',
            borderRadius: 4,

        },
        '&::-webkit-scrollbar': {
            width: 8,
            height: 0,
            borderRadius: 4,

        },
        '&::-webkit-scrollbar-thumb': {
            background: theme.palette.primary.main,
            borderRadius: 4,

        },
    },
    indicator: {
        backgroundColor: theme.palette.primary.main
    },
    tab: {
        '&.MuiTab-root': {
            minWidth: 0,
            minHeight: 0,
            padding: 2,
            borderRadius: 4
        },
    },
    chartBox: {
        borderLeft: '12px solid #ffffff',
        width: '100%',

        height: 'calc( 90vh - 250px )'
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
    buttons: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        '&>:nth-child(n)': {
            marginLeft: 16
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

type VegaEditSectionProps = {
    coinData: any[]
    onSaveClick: (vega: any) => void
    onClose: () => void
}

const VegaEditSection: FC<VegaEditSectionProps> = ({coinData, onClose, onSaveClick}) => {
    const classes = useStyles();
    const [tabValue, setTabValue] = useState('fields')
    const [currentDrag, setCurrentDrag] = useState(false)
    const [yDrag, setYDrag] = useState(false)
    const [xDrag, setXDrag] = useState(false)
    const [xAxis, setXAxis] = useState<vegaFieldType>({
        aggregate: '',
        field: '',
        type: 'nominal',
        title: '',
        bin: false,
        scale: undefined
    })
    const [yAxis, setYAxis] = useState<vegaFieldType>({
        aggregate: '',
        field: '',
        type: 'nominal',
        title: '',
        bin: false,
        scale: undefined
    })
    const [transform, setTransform] = useState<Transform>({})
    const [encodingContent, setEncodingContent] = useState<vegaEncodingType>({
        // size: {
        //     value: '10',
        // },
        // opacity: {
        //     value: '0.4',
        // },
        // color: {
        //     value: 'blue',
        // },
    })
    const [simpleStyles, setSimpleStyles] = useState({
        width: 200,
        height: 200,
        background: 'white',
    })
    const [mark, setMark] = useState<Mark>({
        mark: {type: 'point', interpolate: ''}
    })

    const [vlSpec, setVlSpec] = useState<any>()
    // "quantitative" if the datum is a number
    // "nominal" if the datum is a string
    // "temporal" if the datum is a date time object

    useEffect(() => {
        const selection = {
            "selection": xAxis.field && yAxis.field ? {
                "grid": {
                    "type": "interval", "bind": "scales"
                }
            } : undefined
        }
        if (coinData.length)
            setVlSpec({
                data: {
                    values: [...coinData]
                },
                ...selection,
                ...simpleStyles,
                ...transform,
                ...mark,
                encoding: {
                    ...encodingContent,
                    y: {
                        ...yAxis
                    },
                    x: {

                        ...xAxis
                    },
                }
            })

    }, [coinData, simpleStyles, transform, xAxis, yAxis, mark])

    const prepareTabs = () => {
        if (tabValue === 'fields') {
            return <FieldsTab currentDrag={currentDrag} setCurrentDrag={setCurrentDrag}/>
        }
        if (tabValue === 'details') {
            return <DetailsTab setTransform={setTransform} transform={transform} xAxis={xAxis} setXAxis={setXAxis}
                               yAxis={yAxis} setYAxis={setYAxis} mark={mark}
                               setMark={setMark}/>
        }
        if (tabValue === 'styles') {
            return <StylesTab simpleStyles={simpleStyles} setSimpleStyles={setSimpleStyles} xAxis={xAxis}
                              setXAxis={setXAxis} yAxis={yAxis} setYAxis={setYAxis} mark={mark}
                              setMark={setMark}/>
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
            const coin: any = coinData[0]
            const type = findValueType(coin[data])
            setXAxis({...xAxis, type: type, field: data})
        }
        if (event.target.id === 'y') {
            const coin: any = coinData[0]
            const type = findValueType(coin[data])
            setYAxis({...yAxis, type: type, field: data})
        }
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
                </>
                : undefined}
        </Box>
        </Box>
    }

    return (
        <Grid container>
            <Grid item xs={3}>
                <Tabs classes={{indicator: classes.indicator}} variant={'fullWidth'}
                      value={tabValue}
                      onChange={(e, val) => setTabValue(val)}>
                    <Tab label={'Fields'} value={'fields'} className={classes.tab}
                         icon={<TextFieldsIcon/>}/>
                    <Tab disabled={!xAxis.field && !yAxis.field} label={'Details'} value={'details'}
                         className={classes.tab}
                         icon={<SettingsApplicationsIcon/>}/>
                    <Tab disabled={!xAxis.field && !yAxis.field} label={'Styles'} value={'styles'}
                         className={classes.tab} icon={<ColorLensIcon/>}/>
                </Tabs>
                <Box className={classes.tabsContainer}>

                    {prepareTabs()}
                </Box>
            </Grid>
            <Grid item xs={9} className={classes.chartBox} container justify={'center'}
                  alignItems={'center'}>
                <Box>
                    <VegaLitePreview vegaConfig={vlSpec} keyId={"vegaLite-create"}/>
                </Box>
                {prepareChartArea()}
            </Grid>
            <Box className={classes.buttons}>
                <Button color={'secondary'} onClick={onClose}>cancel</Button>
                <CustomButtonBig variant={'contained'} style={{padding: '6px 48px'}}
                                 onClick={() => onSaveClick(vlSpec)} color={'primary'}>
                    <Typography>SAVE</Typography>
                </CustomButtonBig>
            </Box>
        </Grid>
    )
}

export default VegaEditSection;
