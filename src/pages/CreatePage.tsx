import React, {FC, useState} from 'react';
import {Box, Button, Dialog, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import CreateDialog from "../components/Dialogs/CreateDialog";
import VegaLitePreview from "../components/vega/VegaLitePreview";
import PreviewWrapper from "../components/common/PreviewWrapper";
import CombineDialog from "../components/Dialogs/CombineDialog";

const useStyles = makeStyles((theme: Theme) => ({
    drawer: {
        'z-index': '-1 !important'
    },
    buttonContainer: {
        marginTop: 32
    },

    button: {
        margin:12,
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
    const [combineModal, setCombineModal] = useState(false)

    const [vegaConfigs, setVegaConfigs] = useState<any[]>([])
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
        return vegaConfigs?.map((vega, i) => {
            return <Grid item key={i}>
                <PreviewWrapper isInteractive={interactiveCharts}
                                selected={selectedIndex.findIndex(value => value === i) > -1}
                                onClick={() => setSelectedVega(i)}>
                    <VegaLitePreview vegaConfig={vega} keyId={`preview-${i}`}/>
                </PreviewWrapper>
            </Grid>
        })
    }

    const prepareTopContainer = () => {
        if (vegaConfigs.length) {
            return <Grid item xs={12} className={classes.headerSpace}>
                <Typography variant={'h4'} color={'secondary'}>
                    Create a Chart
                </Typography>
                <Grid item xs={12}>
                    <Typography variant={'body1'}>
                        You can combine charts by pressing the following buttons, and then picking your charts.
                    </Typography>
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

    return (
        <Box>
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
                <Dialog open={createModal} fullWidth maxWidth={'xl'} onClose={() => setCreateModal(false)}>
                    <CreateDialog onClose={() => setCreateModal(false)}
                                  onSaveClick={(val) => {
                                      setVegaConfigs([...vegaConfigs, val])
                                      setCreateModal(false)
                                  }}/>
                </Dialog>

                <Dialog open={combineModal} fullWidth maxWidth={'xl'} onClose={() => {
                    setSelectedIndex([])
                    setInteractiveCharts(!interactiveCharts)
                    setCombineModal(false)
                }}>
                    <CombineDialog
                        vegaConfigs={vegaConfigs.filter((item, i) => {
                            if (selectedIndex.includes(i)) {
                                return item
                            }
                        })}
                        selectedIndex={selectedIndex}
                        onClose={() => {
                            setSelectedIndex([])
                            setInteractiveCharts(!interactiveCharts)
                            setCombineModal(false)
                        }}
                        onSaveClick={(val) => {
                            setVegaConfigs([...vegaConfigs, val])
                            setSelectedIndex([])
                            setInteractiveCharts(!interactiveCharts)
                            setCombineModal(false)
                        }}/>
                </Dialog>
            </Grid>
        </Box>
    );
}

export default CreatePage;
