import {createSlice} from '@reduxjs/toolkit'

interface vegaCombinedEntitiesType {
    documents: any[]
}

const initialState: vegaCombinedEntitiesType = {
    documents: []
}

const vegaCombinedEntitiesSlice = createSlice({
    name: 'vegaCombinedEntities',
    initialState,
    reducers: {
        addCombinedEntity(state, action) {
            state.documents = [...state.documents, action.payload]
        },
        removeCombinedEntity(state, action) {
            const index = action.payload
            state.documents = [...state.documents.slice(0, index), ...state.documents.slice(index + 1)]
        }
    },
})

export const {addCombinedEntity, removeCombinedEntity} = vegaCombinedEntitiesSlice.actions
export default vegaCombinedEntitiesSlice.reducer