import {getCustomCoinById} from "./coins";

export const multipleCoinFetch = async (ids: { name: string, abr: string }[], frequency: string) => {
    return await Promise.all(
        ids.map(async (coin) => {
            const res = await getCustomCoinById({id: coin.name.toLowerCase(), frequency})
            return res.data
        })
    )
}