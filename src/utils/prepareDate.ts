import moment from "moment";

export const prepareDate = (value: string, date?:Date) => {
    console.log(value)

    switch (value) {
        case 'daily': {
            return moment(date).format('DD/MM/YYYY')
        }
        case 'weekly': {
            const currentDate = moment(date).format('DD/MM/YYYY')
            const pastDate = moment(date).subtract(7, "days").format('DD/MM/YYYY')
            return `${pastDate}-${currentDate}`
        }
        case 'monthly': {
            const currentDate = moment(date).format('DD/MM/YYYY')
            const pastDate = moment(date).subtract(1, "month").format('DD/MM/YYYY')
            return `${pastDate}-${currentDate}`
        }
        case '6-months': {
            const currentDate = moment(date).format('DD/MM/YYYY')
            const pastDate = moment(date).subtract(6, "months").format('DD/MM/YYYY')
            return `${pastDate}-${currentDate}`
        }
        case 'yearly': {
            const currentDate = moment(date).format('DD/MM/YYYY')
            const pastDate = moment(date).subtract(1, "year").format('DD/MM/YYYY')
            return `${pastDate}-${currentDate}`
        }
        default: {
            return value
        }

    }
}
