import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux";
import {persistReducer} from 'redux-persist'
import thunk from 'redux-thunk'
import vegaEntitiesSlice from "./slices/vegaEntitiesSlice";

const reducers = combineReducers({
    vegaEntities: vegaEntitiesSlice
});

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export type AppSelector = typeof store.getState
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;