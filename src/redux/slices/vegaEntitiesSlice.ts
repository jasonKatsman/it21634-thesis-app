import {createSlice} from '@reduxjs/toolkit'
import {VegaType} from "../../Types/VegaType";

interface vegaEntitiesType {
    documents: { vega: VegaType, coin: string, time: string }[]
}

const initialState: vegaEntitiesType = {
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
            const index = action.payload
            state.documents = [...state.documents.slice(0, index), ...state.documents.slice(index + 1)]
        }
    },
})

export const {addEntity, removeEntity} = vegaEntitiesSlice.actions
export default vegaEntitiesSlice.reducer