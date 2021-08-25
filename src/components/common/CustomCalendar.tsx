import React, {FC} from 'react';
import {BoxProps, Button, makeStyles, Popover, Theme} from "@material-ui/core";
import moment from "moment";
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';

const useStyles = makeStyles((theme: Theme) => ({
    popover: {
        marginTop: 32,
        maxWidth: 450
    }
}))

type extraProps = {
    dateValue: any,
    setDateValue: any
}

const CustomCalendar: FC<BoxProps & extraProps> = ({
                                                       dateValue,
                                                       setDateValue,
                                                   }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    );
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <Button onClick={(event) => setAnchorEl(event.currentTarget)} color={'primary'} variant={'outlined'}>
                {moment(dateValue).format('DD/MM/YYYY')}
            </Button>
            <Popover
                className={classes.popover}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <Calendar value={dateValue}
                          onChange={setDateValue}/>
            </Popover>
        </div>
    );
}

export default CustomCalendar
