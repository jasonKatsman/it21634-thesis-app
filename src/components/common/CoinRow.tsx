import React, {FC} from 'react';
import {makeStyles, TableRow, TableRowProps, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    row: {
        cursor: 'pointer',
        '&:hover': {
            background: 'rgba(2, 37, 75,0.025)',

        }
    }
}))

type extraProps = {
    className?: any

}

const CoinRow: FC<TableRowProps & extraProps> = ({

                                                     className,
                                                     children,
                                                     ...props
                                                 }) => {
    const classes = useStyles();

    return (
        <TableRow className={classes.row} {...props}>
            {children}
        </TableRow>
    );
}

export default CoinRow;
