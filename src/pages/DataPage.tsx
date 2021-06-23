import React, {FC, useEffect, useState} from 'react';
import {Box, Grid, List, ListItem, ListItemText, makeStyles, Typography} from "@material-ui/core";
import {useParams} from "react-router";
import DataDummy from '../Dummy/DataDummy.json'
import DataChoices from '../Dummy/DataChoices.json'
import DropComponent from "../components/common/DropComponent";
import VegaLiteComponent from "../components/vega/VegaLiteComponent";
import {vegaFieldType} from "../Types/VegaFieldType";

const useStyles = makeStyles(() => ({
    list: {
        maxHeight: 500,
        overflow: 'auto'
    },
    cordBox: {
        padding: 32,
        border: '1px solid red',
    },
    listItem: {
        padding: 0,
        cursor: 'pointer',
        '& > :nth-child(n)': {
            pointerEvents: 'none'
        }
    }

}))

interface dataType {
    Comments: string | null,
    DataSourceDim: string | null,
    DataSourceDimType: string | null,
    Date: string,
    Dim1: string | null,
    Dim1Type: string | null,
    Dim2: string | null,
    Dim2Type: string | null,
    Dim3: string | null,
    Dim3Type: string | null,
    High: number | null,
    Id: number,
    IndicatorCode: string | null,
    Low: number | null,
    NumericValue: number,
    SpatialDim: string | null,
    SpatialDimType: string | null,
    TimeDim: number,
    TimeDimType: string | null,
    TimeDimensionBegin: string,
    TimeDimensionEnd: string,
    TimeDimensionValue: string | null
}

const DataPage: FC = () => {
    const classes = useStyles();
    const {id} = useParams<{ id: string }>()
    const [simpleStyles, setSimpleStyles] = useState({
        width: 200,
        height: 200,
        background: 'white',
        mark: 'bar',
    })
    const [dataValues, setDataValues] = useState<dataType[]>([])

    const [xAxis, setXAxis] = useState<vegaFieldType>({
        aggregate: 'average',
        field: '',
        type: '',
        title: ''
    })
    const [yAxis, setYAxis] = useState<vegaFieldType>({
        field: '',
        type: '',
        title: ''

    })

    const onSimpleStylesChange = (e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
        setSimpleStyles({...simpleStyles, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        const getData = async () => {
            try {
//                setDimensions(res.value)
//                 const res = await getDataById(id)
                const res = DataDummy
                setDataValues(res.value)
            } catch (e) {
                console.log(e)
            }
        }
        getData();

    }, [id])
    const prepareFieldView = () => {
        const dataNames: any = Object.keys(DataChoices)
        return dataNames.map((item: any, i: number) => {
            return <ListItem
                id={item}
                onClick={() => console.log('click')}
                draggable
                onDragStart={(ev: any) => {
                    console.log('I DRAG')
                    ev.dataTransfer.setData("text", ev.target.id);

                }
                }
                button={true} focusRipple={true}
                key={i}
                className={classes.listItem}>
                <ListItemText primary={`${item}`}
                              secondary={`example
                                  value: ${dataNames[item] as unknown as string}`}/>
            </ListItem>
        })
    }
    return (
        <Box style={{fontSize: 50}}>
            <Grid container>
                <Grid item xs={2}>
                    <List className={classes.list}>
                        {prepareFieldView()}
                    </List>
                </Grid>

                <Grid item xs={10}>
                    <Grid item container spacing={2} justify={'flex-start'} alignItems={'center'}
                          xs={12}>
                        <Grid item>
                            <Typography variant={'subtitle1'}>Width</Typography>
                            <input min={200}
                                   value={simpleStyles.width}
                                   max={1050} name={'width'} onChange={onSimpleStylesChange}
                                   type={'range'}/>
                        </Grid>
                        <Grid item>
                            <Typography variant={'subtitle1'}>Height</Typography>

                            <input min={200}
                                   value={simpleStyles.height}
                                   max={1050} name={'height'} onChange={onSimpleStylesChange}
                                   type={'range'}/>
                        </Grid>
                        <Grid item>
                            <Typography variant={'subtitle1'}>background color</Typography>

                            <input placeholder={'choose color'} value={simpleStyles.background} name={'background'}
                                   type="color"
                                   onChange={onSimpleStylesChange}/>
                        </Grid>
                        <Grid item>
                            <Typography variant={'subtitle1'}>Mark Type</Typography>

                            <select id="mark" value={simpleStyles.mark} name="mark" onChange={onSimpleStylesChange}>
                                <option value="rect">rect</option>
                                <option value="trail">trail</option>
                                <option value="arc">arc</option>
                                <option value="area">area</option>
                                <option value="image">image</option>
                                <option value="group">group</option>
                                <option value="line">line</option>
                                <option value="path">path</option>

                                <option value="rule">rule</option>
                                <option value="shape">shape</option>
                                <option value="symbol">symbol</option>
                                <option value="text">text</option>
                            </select>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        {!xAxis.field && !yAxis.field ?
                            <Typography>Please put X and Y axis Fields</Typography> :
                            <VegaLiteComponent basicStyling={simpleStyles} data={dataValues}
                                               xAxis={xAxis} yAxis={yAxis}/>
                            // <MyVega fieldData={dataValues} selectedFields={selectedFields}/>
                            // <VegaComponent2 data={dataValues} selectedFields={selectedFields}/>
                        }
                    </Grid>

                </Grid>
                <Grid item container xs={12}>
                    <DropComponent
                        topLabel={'X AXIS'}
                        onDrop={(event) => {
                            event.preventDefault()
                            let data = event.dataTransfer.getData("text");
                            setXAxis({...xAxis, field: data, title: data, type: 'quantitative'})
                        }}
                        onInputChange={(e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
                            setXAxis({...xAxis, [e.target.name]: e.target.value})
                        }}
                        value={xAxis}
                    />

                    <DropComponent
                        topLabel={'Y AXIS'}

                        onDrop={(event) => {
                            event.preventDefault()
                            let data = event.dataTransfer.getData("text");
                            setYAxis({...yAxis, field: data, title: data, type: 'nominal'})
                        }}
                        value={yAxis}
                        onInputChange={(e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
                            setYAxis({...yAxis, [e.target.name]: e.target.value})
                        }}
                    />


                </Grid>
            </Grid>
        </Box>
    );
}

export default DataPage;
