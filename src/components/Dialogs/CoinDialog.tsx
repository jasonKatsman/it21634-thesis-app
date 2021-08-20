import React, {FC, useState} from 'react';
import {BoxProps, Button, Dialog, DialogActions, DialogContent, makeStyles, Theme} from "@material-ui/core";
import SelectAggregate from "../common/SelectAggregate";
import coins from "../../Dummy/coins.json";
import CustomOption from "../common/CustomOption";

const useStyles = makeStyles(() => ({}))

type extraProps = {
    open: boolean,
    handleClose: () => void,
    onSave: (val: string) => void
}

const CoinDialog: FC<BoxProps & extraProps> = ({
                                                   onSave,
                                                   open,
                                                   handleClose,
                                                   ...props
                                               }) => {
    const classes = useStyles();
    const [selectValue, setSelectValue] = useState('')

    const prepareSelectOptions = () => {
        return coins.map((coin) => {
            return <CustomOption value={coin}>{coin}</CustomOption>
        })
    }
    const onSaveClick = () => {
        onSave(selectValue)
        setSelectValue('')
        // handleClose()
    }
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <SelectAggregate selectTitle={'Select a coin'}
                                 value={selectValue} onChange={(event => setSelectValue(event.target.value as string))}
                                 id={'coin-select-267'}
                                 style={{minWidth: 300}}>
                    {prepareSelectOptions()}
                </SelectAggregate>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    CLOSE
                </Button>
                <Button variant={'contained'} onClick={onSaveClick} color="primary">
                    ADD
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CoinDialog;
