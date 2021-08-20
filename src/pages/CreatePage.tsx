import React, {FC, useState} from 'react';
import {Box, Button, Dialog, Divider, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import CreateDialog from "../components/Dialogs/CreateDialog";
import VegaLitePreview from "../components/vega/VegaLitePreview";
import PreviewWrapper from "../components/common/PreviewWrapper";
import CombineDialog from "../components/Dialogs/CombineDialog";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {addEntity, removeEntity} from "../redux/slices/vegaEntitiesSlice";
import EditDialog from "../components/Dialogs/EditDialog";
import {VegaType} from "../Types/VegaType";
import {addCombinedEntity, removeCombinedEntity} from "../redux/slices/vegaCombinedEntitiesSlice";

const useStyles = makeStyles((theme: Theme) => ({
    drawer: {
        'z-index': '-1 !important'
    },
    buttonContainer: {
        marginTop: 16
    },

    button: {
        margin: 12,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: `0px 0px 0px 2px ${theme.palette.primary.main}`,
        padding: 32,
        borderRadius: 12,
        '&:hover': {
            boxShadow: `0px 0px 0px 2px ${theme.palette.primary.main}`,
            background: 'white',
            color: 'red !important',
            '& :nth-child(n)': {
                color: `${theme.palette.primary.main} !important`,
            }
        }
    },
    image: {
        color: "white",
        width: '50px',
        height: '50px'
    },
    headerSpace: {
        marginTop: 32
    }
}))

const CreatePage: FC = () => {
    const classes = useStyles();
    const [createModal, setCreateModal] = useState(false)
    const [editModal, setEditModal] = useState<{ vega: VegaType, coin: string, time: string, description: string, index: number } | undefined>(undefined)
    const [combineModal, setCombineModal] = useState(false)
    const dispatch = useAppDispatch()
    const documents = useAppSelector(state => state.vegaEntities.documents)
    const combinedDocuments = useAppSelector(state => state.vegaCombinedEntities.documents)
    console.log(documents, combinedDocuments)
    const [interactiveCharts, setInteractiveCharts] = useState<boolean>(false)
    const [selectedIndex, setSelectedIndex] = useState<number[]>([])

    const setSelectedVega = (i: number) => {
        const index = selectedIndex.findIndex(value => value === i)
        if (index > -1) {
            setSelectedIndex([...selectedIndex.slice(0, index), ...selectedIndex.slice(index + 1)])
            return
        }
        setSelectedIndex([...selectedIndex, i])
    }

    const prepareVegaInstances = () => {
        return documents?.map((vega, i) => {
            return <Grid item key={i}>
                <PreviewWrapper title={`${vega.coin}: ${vega.description}`}
                                onEditClick={() => setEditModal({index: i, ...vega})}
                                onDeleteClick={() => dispatch(removeEntity(i))} isInteractive={interactiveCharts}
                                selected={selectedIndex.findIndex(value => value === i) > -1}
                                onClick={() => setSelectedVega(i)}>
                    <VegaLitePreview vegaConfig={vega.vega} keyId={`preview-${i}`}/>
                </PreviewWrapper>
            </Grid>
        })
    }

    const prepareCombinedVegaInstances = () => {
        return combinedDocuments?.map((vega, i) => {
            return <Grid item key={i}>
                <PreviewWrapper
                    title={vega.description}
                    onDeleteClick={() => dispatch(removeCombinedEntity(i))} isInteractive={false}
                    selected={selectedIndex.findIndex(value => value === i) > -1}
                    onClick={() => setSelectedVega(i)}>
                    <VegaLitePreview vegaConfig={vega.vega} keyId={`preview-${i}-COMBINED`}/>
                </PreviewWrapper>
            </Grid>
        })
    }

    const prepareTopContainer = () => {
        if (documents.length) {
            return <Grid item xs={12} className={classes.headerSpace}>
                <Typography variant={'h4'} color={'secondary'}>
                    Create a Chart
                </Typography>
                <Grid item xs={12}>
                    <Typography variant={'body1'}>
                        You can combine charts by pressing the following buttons, and then picking your charts.
                    </Typography>
                    <Divider/>
                </Grid>
                <Grid xs={12} style={{marginTop: 16}} item container>
                    <Button variant={"contained"} color={interactiveCharts ? "secondary" : 'primary'}
                            onClick={() => {
                                setSelectedIndex([])
                                setInteractiveCharts(!interactiveCharts)
                            }}>
                        {interactiveCharts ? 'CANCEL COMBINATION' : 'COMBINE CHARTS'}
                    </Button>
                    {interactiveCharts ?
                        <Button style={{marginLeft: 32}} variant={"contained"} color={'primary'}
                                onClick={() => {
                                    setCombineModal(true)
                                }}>
                            COMBINE
                        </Button>
                        : undefined}
                </Grid>
            </Grid>
        }

        return <Grid item xs={12}>
            <Typography variant={'h4'} color={'secondary'} className={classes.headerSpace}>
                Create a Chart
            </Typography>
            <Grid item xs={12}>
                <Typography variant={'body1'} style={{fontWeight: 'bold'}} color={'primary'}>
                    Click the add button to get started!
                </Typography>
            </Grid>
        </Grid>
    }

    const prepareSelectedConfigs = () => {
        return documents.filter((item, i) => {
            if (selectedIndex.includes(i)) {
                return item
            }
        }).map(item => item.vega)
    }

    return (
        <Box style={{marginBottom: 32}}>
            <Grid container>
                {prepareTopContainer()}
                <Grid item container xs={12} spacing={4} justify={'flex-start'} alignItems={'center'}
                      className={classes.buttonContainer}>
                    <Grid item>
                        <Button variant={'contained'} color={'primary'} className={classes.button}
                                onClick={() => setCreateModal(true)}>
                            <Box>
                                <Typography color={'primary'} variant={'h6'}
                                            style={{fontWeight: 'bold', color: 'white'}}>Add
                                    Chart</Typography>
                                <Box>
                                    <InsertChartIcon className={classes.image}/>
                                    <AddIcon className={classes.image}/>
                                </Box>
                            </Box>
                        </Button>
                    </Grid>
                    {prepareVegaInstances()}
                </Grid>
                {combinedDocuments.length ?
                    <Grid item container xs={12} spacing={4} justify={'flex-start'} alignItems={'center'}
                          className={classes.buttonContainer}>
                        <Grid item xs={12}>
                            <Typography variant={'h6'} color={'secondary'}>Combined Charts!</Typography>
                            <Divider/>
                        </Grid>
                        {prepareCombinedVegaInstances()}
                    </Grid> : undefined}
                <Dialog open={createModal} fullWidth maxWidth={'xl'} onClose={() => setCreateModal(false)}>
                    <CreateDialog onClose={() => setCreateModal(false)}
                                  onSaveClick={(val) => {
                                      dispatch(addEntity(val))
                                      setCreateModal(false)
                                  }}/>
                </Dialog>

                <Dialog open={combineModal} fullWidth maxWidth={'xl'} onClose={() => {
                    setSelectedIndex([])
                    setInteractiveCharts(!interactiveCharts)
                    setCombineModal(false)
                }}
                >
                    <CombineDialog
                        vegaConfigs={prepareSelectedConfigs()}
                        onClose={() => {
                            setSelectedIndex([])
                            setInteractiveCharts(!interactiveCharts)
                            setCombineModal(false)
                        }}
                        onSaveClick={(val) => {
                            dispatch(addCombinedEntity({
                                vega: val,
                                coin: 'combination',
                                time: 'combination',
                                description: 'combination'
                            }))
                            setSelectedIndex([])
                            setInteractiveCharts(!interactiveCharts)
                            setCombineModal(false)
                        }}/>
                </Dialog>
                <Dialog open={!!editModal} fullWidth maxWidth={'xl'} onClose={() => setEditModal(undefined)}>
                    {editModal ? <EditDialog vegaInstance={editModal} onClose={() => setEditModal(undefined)}
                                             onEditClick={(val, index) => {
                                                 dispatch(removeEntity(index))
                                                 dispatch(addEntity(val))
                                                 setEditModal(undefined)
                                             }}/>
                        : undefined}
                </Dialog>
            </Grid>
        </Box>
    );
}

export default CreatePage;
