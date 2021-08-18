import {Mark, Transform, vegaFieldType, vegaSimpleStylesType} from "./VegaFieldType";

export type VegaType = {
    data: {
        values: any[]
    },
    transform: Transform,
    encoding: {
        y: vegaFieldType,
        x: vegaFieldType,
    }
    selection?: {
        grid: {
            type: string,
            bind: string,
        }
    }
} & vegaSimpleStylesType & Mark