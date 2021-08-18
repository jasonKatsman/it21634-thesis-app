import {createSlice} from '@reduxjs/toolkit'
import {VegaType} from "../../Types/VegaType";

interface vegaEntitiesSlice {
    documents: VegaType[]
}

const initialState: vegaEntitiesSlice = {
    documents: []
}

const vegaEntitiesSlice = createSlice({
    name: 'vegaEntities',
    initialState,
    reducers: {
        addEntity(state, action) {
            state.documents = [...state.documents, action.payload]
        },
        removeEntity(state, action) {
            state.documents = [...state.documents, action.payload]
        },

    },
})

export const {addEntity, removeEntity} = vegaEntitiesSlice.actions
export default vegaEntitiesSlice.reducer