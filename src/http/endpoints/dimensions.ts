import {get} from "../axios";

export const getDimensions = () => {
    return get('Dimension')
}