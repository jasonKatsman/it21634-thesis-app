import coinFields from "../../../Dummy/coinFields.json";
import {List, ListItem, makeStyles} from "@material-ui/core";
import React, {FC} from "react";

const useStyles = makeStyles(() => ({
    list: {
        // maxHeight: 'calc( 80vh - 270px )',
        // overflow: 'auto',
        '& > *': {
            padding: '12px 12px',
            width: 'calc( 100% - 8px )'
        },
        // '&::-webkit-scrollbar-track': {
        //     background: '#dfdfdf',
        //     borderRadius: 4,
        //
        // },
        // '&::-webkit-scrollbar': {
        //     width: 8,
        //     borderRadius: 4,
        //
        // },
        // '&::-webkit-scrollbar-thumb': {
        //     background: '#686868',
        //     borderRadius: 4,
        // },
    },
}))
type FieldsTabProps = {
    currentDrag: boolean
    setCurrentDrag: (value: boolean) => void
}
const FieldsTab: FC<FieldsTabProps> = ({currentDrag, setCurrentDrag}) => {
    const classes = useStyles()
    const prepareFields = () => {
        return coinFields.map((field, i) => {
            return <ListItem
                draggable
                onDragStart={(ev: any) => {
                    setCurrentDrag(true)
                    ev.dataTransfer.setData("text", ev.target.id);
                }}
                onDragEnd={() => setCurrentDrag(false)}
                button id={field} key={i}>
                {field.replaceAll('_', ' ')}
            </ListItem>
        })
    }


    return (<List className={`${classes.list}`}>
        {prepareFields()}
    </List>)
}

export default FieldsTab