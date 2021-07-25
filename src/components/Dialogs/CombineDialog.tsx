import React, {FC, useEffect, useState} from 'react';
import {Box, Button, Divider, Grid, makeStyles, Typography,} from "@material-ui/core";
import CombinationAccordionContainer from "../DetailsComponents/CombinationAccordionContainer";
import CombinationSettingsAccordionContainer from "../DetailsComponents/CombinationSettingsAccordionContainer";
import VegaLitePreview from "../vega/VegaLitePreview";


const useStyles = makeStyles(() => ({
    root: {
        position: 'relative',
        padding: 32,
        minHeight: 'calc( 100vh - 220px )',
    },
    introBox: {
        display: 'flex',
        flexDirection: 'column'
    },
    settingsBox: {
        maxHeight: 'calc( 90vh - 170px )',
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
            background: '#686868',
            borderRadius: 4,

        },
    }


}))

type CombineDialogType = {
    onSaveClick: (vega: any) => void
    onClose: () => void
    vegaConfigs: any[]
    selectedIndex: number[]
}

const CombineDialog: FC<CombineDialogType> = ({vegaConfigs, selectedIndex, onClose, onSaveClick}) => {
    const classes = useStyles()
    const [vegaCombination, setVegaCombination] = useState<any>({
        vconcat: [
            ...vegaConfigs
        ]
    })

    useEffect(() => {
        const temp = vegaConfigs.filter((item, i) => {
            if (selectedIndex.includes(i)) {
                return item
            }
        })
        setVegaCombination({
            vconcat: [
                ...temp
            ]
        })
    }, [vegaConfigs])

    return (
        <Box className={classes.root}>
            <Box className={classes.introBox}>
                <Typography variant={'h6'}>
                    Combine multiple charts!
                </Typography>
                <Typography variant={'body1'}>
                    Select the type of combination you want to occur!
                </Typography>
                <Divider/>
            </Box>
            <Box>
                <Grid container>
                    <Grid item xs={12} container>
                        <Grid item xs={3} className={classes.settingsBox}>
                            <Grid item xs={12}>
                                <CombinationAccordionContainer vegaConfigs={vegaConfigs}
                                                               vegaCombination={vegaCombination}
                                                               setVegaCombination={setVegaCombination}/>
                            </Grid>
                            <Grid item xs={12}>
                                <CombinationSettingsAccordionContainer/>
                            </Grid>
                        </Grid>
                        <Grid item xs={9} container justify={'center'} alignItems={'center'}>
                            <VegaLitePreview vegaConfig={vegaCombination} keyId={'combination-1'}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Button onClick={() => onSaveClick(vegaCombination)} variant={'outlined'} color={'primary'}>SAVE</Button>
        </Box>
    );
}

export default CombineDialog;
