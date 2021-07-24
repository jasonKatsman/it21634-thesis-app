export type vegaFieldType = {
    aggregate?: string,
    field: string,
    type: string,
    timeUnit?: string,
    title: string
    bandPosition?:number
    bin?: boolean // discretize VALUES (approximate a set of values) prettified set of values
    scale?: { domain?: any[], domainMax?: any, domainMin?: any, domainMid?: any } // Scales are functions that transform a domain of data values to a range of visual values
}

export type vegaEncodingType = {
    size?: {
        value: string
    },
    opacity?: {
        value: string
    },
    color?: {
        value: string
    },

}

export type Mark = {
    mark: {
        type: string;
        interpolate: string
        color?:string
        width?:number
        strokeWidth?:number
        cornerRadius?:number
        size?:number
        opacity?:number
    },


}