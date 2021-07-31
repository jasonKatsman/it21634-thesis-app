import {get} from "../axios";

export const getCoinById = (params:{id:string}) => {
    console.log(params)
    return get('getById',{
        params:{
            ...params
        }
    })
}