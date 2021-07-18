export type vegaFieldType = {
    aggregate?: string,
    field: string,
    type: string,
    title: string
    bin?:boolean // discretize VALUES (approximate a set of values) prettified set of values
}

export type vegaEncodingType = {
    size?: {
        value:string
    },
    opacity?: {
        value:string
    },
    color?: {
        value:string
    },

}