export const findValueType = (value: any) => {
    if (typeof value === 'number') {
        return 'quantitative' //number
    }
    if (typeof value === 'string') {
        const isDate = new Date(value).valueOf()
        if (isDate > 0) {
            return 'temporal' //date
        }
        return 'nominal' //string
    }
    return 'nominal'
}


