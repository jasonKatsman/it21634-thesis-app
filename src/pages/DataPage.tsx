import React, {FC, useEffect, useState} from 'react';
import {Box, Grid, List, ListItem, ListItemText, makeStyles, Typography} from "@material-ui/core";
import {useParams} from "react-router";
import DropComponent from "../components/common/DropComponent";
import VegaLiteComponent from "../components/vega/VegaLiteComponent";
import {vegaEncodingType, vegaFieldType} from "../Types/VegaFieldType";
import {findValueType} from "../utils/findValueType";

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

const DataPage: FC = () => {
    const classes = useStyles();
    const {id} = useParams<{ id: string }>()
    const [simpleStyles, setSimpleStyles] = useState({
        width: 200,
        height: 200,
        background: 'white',
        mark: 'point',
    })
    const [dataValues, setDataValues] = useState<any[]>([])

    const [xAxis, setXAxis] = useState<vegaFieldType>({
        aggregate: '',
        field: '',
        type: '',
        title: '',
        bin: false
    })
    const [yAxis, setYAxis] = useState<vegaFieldType>({
        aggregate: '',
        field: '',
        type: '',
        title: '',
        bin: false
    })
    const [encodingContent, setEncodingContent] = useState<vegaEncodingType>({
        size: {
            value: '30',
        },
        opacity: {
            value: '0.4',
        },
        color: {
            value: 'blue',
        },
    })


    const onSimpleStylesChange = (e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
        setSimpleStyles({...simpleStyles, [e.target.name]: e.target.value})
    }
    const onEncodingChange = (e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
        console.log(e.target.value)
        const value = {value: e.target.value}
        setEncodingContent({...encodingContent, [e.target.name]: value})
    }
    console.log(encodingContent)

    useEffect(() => {
        const getData = async () => {
            try {
//                setDimensions(res.value)
//                 const res = await getDataById(id)
                const res = [{one: 1, two: 2}]
                setDataValues(res)
            } catch (e) {
                console.log(e)
            }
        }
        getData();

    }, [id])
    const prepareFieldView = () => {
        const dataNames: any = Object.keys([{one: 1, two: 2}])
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
                            <Typography variant={'subtitle1'}>color</Typography>
                            <input placeholder={'choose color'} value={encodingContent.color?.value}
                                   name={'color'}
                                   type="color"
                                   onChange={onEncodingChange}/>
                        </Grid>

                        <Grid item>
                            <Typography variant={'subtitle1'}>Mark Type</Typography>

                            <select id="mark" value={simpleStyles.mark} name="mark" onChange={onSimpleStylesChange}>
                                <option value="bar">bar</option>
                                <option value="line">line</option>
                                <option value="circle">circle</option>
                                <option value="square">square</option>
                                <option value="tick">tick</option>
                                <option value="area">area</option>
                                <option value="point">point</option>
                                <option value="text">text</option>
                            </select>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        {!xAxis.field && !yAxis.field ?
                            <Typography>Please put X and Y axis Fields</Typography> :
                            undefined
                            // <VegaLiteComponent basicStyling={simpleStyles} data={dataValues}
                            //                    xAxis={xAxis} yAxis={yAxis} encoding={encodingContent}/>
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
                        setValue={setXAxis}

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
                        setValue={setYAxis}
                    />


                </Grid>
            </Grid>
        </Box>
    );
}

export default DataPage;
