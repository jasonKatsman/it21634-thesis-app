import moment from "moment";

export const prepareDate = (value: string) => {
    console.log(value)

    switch (value) {
        case 'daily': {
            return moment().format('DD/MM/YYYY')
        }
        case 'weekly': {
            const currentDate = moment().format('DD/MM/YYYY')
            const pastDate = moment().subtract(7, "days").format('DD/MM/YYYY')
            return `${pastDate}-${currentDate}`
        }
        case 'monthly': {
            const currentDate = moment().format('DD/MM/YYYY')
            const pastDate = moment().subtract(1, "month").format('DD/MM/YYYY')
            return `${pastDate}-${currentDate}`
        }
        case '6-months': {
            const currentDate = moment().format('DD/MM/YYYY')
            const pastDate = moment().subtract(6, "months").format('DD/MM/YYYY')
            return `${pastDate}-${currentDate}`
        }
        case 'yearly': {
            const currentDate = moment().format('DD/MM/YYYY')
            const pastDate = moment().subtract(1, "year").format('DD/MM/YYYY')
            return `${pastDate}-${currentDate}`
        }
        default: {
            return value
        }

    }
}
