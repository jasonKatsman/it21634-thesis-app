import {getCandleStickData, getCustomCoinById} from "./coins";

export const multipleCoinFetch = async (ids: { name: string, abr: string }[], frequency: string, date: any) => {
    return await Promise.all(
        ids.map(async (coin) => {
            const res = await getCustomCoinById({id: coin.name.toLowerCase(), frequency, date})
            return res.data
        })
    )
}

export const singleCoinCandleStickData = async (ids: { name: string, abr: string }[], frequency: string, date: any) => {
    return await Promise.all(
        ids.map(async (coin) => {
            const res = await getCandleStickData({id: coin.name.toLowerCase(), frequency, date})
            return res.data
        })
    )
}