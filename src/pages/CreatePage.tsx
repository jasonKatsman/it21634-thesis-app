import React, {FC, useState} from 'react';
import {Box, Button, Dialog, Grid, makeStyles, Typography} from "@material-ui/core";
import {useHistory} from "react-router";
import AddIcon from '@material-ui/icons/Add';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import CreateDialog from "../components/Dialogs/CreateDialog";
import VegaLitePreview from "../components/vega/VegaLitePreview";

const useStyles = makeStyles(() => ({
    drawer: {
        'z-index': '-1 !important'
    },
    buttonContainer: {
        marginTop: 32
    },

    button: {
        display: 'flex',
        flexDirection: 'column',
        background: 'white',
        boxShadow: '0 0 0 1px #363636',
        padding: 32,
        borderRadius: 8
    },
    image: {
        width: '50px',
        height: '50px'
    }
}))

const CreatePage: FC = () => {
    const classes = useStyles();
    const history = useHistory()
    const [createModal, setCreateModal] = useState(false)
    const [vegaConfigs, setVegaConfigs] = useState<any[]>([])
    const [vegaConcat, setVegaConcat] = useState<any>()
    const prepareVegaInstances = () => {
        return vegaConfigs?.map((vega, i) => {
            return <Grid item key={i}><VegaLitePreview vegaConfig={vega} keyId={`preview-${i}`}/></Grid>
        })
    }

    const concatInstances=()=>{
        let preparedVega=vegaConfigs.map((item,i)=>{
            if(i) return{...item,  name:`chart-${i}`}

            return{...item, selection:undefined, name:`chart-${i}`}
        })
        console.log(preparedVega)
setVegaConcat({
    layer: [
        ...preparedVega
    ]
})
    }
    console.log(vegaConcat)
return (
    <Box mt={2}>
        <Grid container>
            <Grid item xs={12}>
                <Typography variant={'h5'}>
                    Create a Chart
                </Typography>
                <Grid item xs={12}>
                    <Typography variant={'body1'}>
                        Click the add button to get started!
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container xs={12} spacing={2} justify={'flex-start'} alignItems={'center'} className={classes.buttonContainer}>
                {prepareVegaInstances()}
                <Grid item>
                    <Button className={classes.button} onClick={() => setCreateModal(true)}>
                        <Box>
                            <Typography>Add Chart</Typography>
                            <Box>
                                <InsertChartIcon className={classes.image}/>
                                <AddIcon className={classes.image}/>
                            </Box>
                        </Box>
                    </Button>
                </Grid>
            </Grid>
            <Button variant={'outlined'} onClick={concatInstances}>VCONCAT</Button>
            {vegaConcat?<VegaLitePreview vegaConfig={vegaConcat} keyId={`concat-preview`}/>:undefined}
            <Dialog open={createModal} fullWidth maxWidth={'xl'} onClose={() => setCreateModal(false)}>
                <CreateDialog onClose={() => setCreateModal(false)}
                              onSaveClick={(val) => {
                                  console.log(val)
                                  setVegaConfigs([...vegaConfigs, val])
                                  // setCreateModal(false)

                              }}/>
            </Dialog>
        </Grid>
    </Box>
);
}

export default CreatePage;
