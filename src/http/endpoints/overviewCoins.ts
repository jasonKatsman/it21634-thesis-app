import {get} from "../axios";


export const getOverviewStats = (params: { coins?: any, date?: any }) => {
    console.log(params)
    return get('getOverviewStats', {
        params: {
            ...params
        }
    })
}