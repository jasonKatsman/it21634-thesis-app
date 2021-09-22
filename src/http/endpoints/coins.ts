import {get} from "../axios";

export const getCoinById = (params: { id: string }) => {
    console.log(params)
    return get('getById', {
        params: {
            ...params
        }
    })
}

export const getCustomCoinById = (params: { id: string, frequency: string, date?: any }) => {
    console.log(params)
    return get('getByIdCustom', {
        params: {
            ...params
        }
    })
}

export const getCandleStickData = (params: { id: string, frequency: string, date?: any }) => {
    console.log(params)
    return get('getCandleStickDataById', {
        params: {
            ...params
        }
    })
}