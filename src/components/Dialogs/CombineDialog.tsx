import React, {FC, useEffect, useState} from 'react';
import {Box, Button, Grid, makeStyles, Typography,} from "@material-ui/core";
import CombinationAccordionContainer from "../DetailsComponents/CombinationAccordionContainer";
import CombinationSettingsAccordionContainer from "../DetailsComponents/CombinationSettingsAccordionContainer";
import VegaLitePreview from "../vega/VegaLitePreview";
import CustomButtonBig from "../common/CustomButtonBig";


const useStyles = makeStyles(() => ({
    root: {
        position: 'relative',
        padding: 32,
        minHeight: 'calc( 100vh - 150px )',
    },
    introBox: {
        display: 'flex',
        flexDirection: 'column',
        borderBottom: '1px solid lightgray',
        paddingBottom: 8

    },
    vegaLocation: {
        minHeight: 'calc( 90vh - 150px )',
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
        if (vegaConfigs) {
            setVegaCombination({
                vconcat: [
                    ...vegaConfigs
                ]
            })
        }
    }, [vegaConfigs])

    return (
        <Box className={classes.root}>
            <Box className={classes.introBox}>
                <Typography variant={'h5'} color={'primary'} style={{fontWeight: 'bold'}}>
                    Combine multiple charts!
                </Typography>
                <Typography variant={'body1'} color={'secondary'}>
                    Select the type of combination you want to occur!
                </Typography>
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
                            <Grid item xs={12} container justify={'flex-end'} alignItems={'center'}>
                                <Grid item>
                                    <Box>
                                        <Button onClick={onClose} color={'secondary'}>CANCEL</Button>
                                    </Box>
                                </Grid>
                                <Grid item>

                                    <Box marginY={2} marginX={2}>
                                        <CustomButtonBig padding={'6px 32px'}
                                                         onClick={() => onSaveClick({
                                                             vega: vegaCombination,
                                                             coin: 'combination',
                                                             time: 'combination'
                                                         })}>
                                            SAVE</CustomButtonBig>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid className={classes.vegaLocation} item xs={9} container justify={'center'}
                              alignItems={'center'}>
                            <VegaLitePreview vegaConfig={vegaCombination} keyId={'combination-1'}/>
                        </Grid>

                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default CombineDialog;
