import {get} from "../axios";


export const getOverviewStats = (params: { date?: any }) => {
    console.log(params)
    return get('getOverviewStats', {
        params: {
            ...params
        }
    })
}