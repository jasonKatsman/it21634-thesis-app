import {get} from "../axios";

export const getDimensions = () => {
    return get('Dimension')
}
export const getIndicators = () => {
    return get('Indicator')
}

export const getDataById = (id: string) => {
    return get(`${id}`)
}