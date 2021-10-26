import {get} from "../axios";

export const getCustomCoinById = (params: { id: string, frequency: string, date?: any, extraFields?:boolean }) => {
    console.log(params)
    return get('getByIdCustom', {
        params: {
            ...params
        }
    })
}

export const getCandleStickData = (params: { id: string, frequency: string, interval: number, date: any }) => {
    console.log(params)
    return get('getCandleStickDataById', {
        params: {
            ...params
        }
    })
}