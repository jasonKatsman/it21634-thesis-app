import moment from "moment";

export const prepareCoinSeparation = (coin: any[]) => {
    if (coin) {
        let data: any[][] = []
        let index = 0

        coin.forEach((item: any, i: number) => {
            let hourIndex = i === 0 ? i : i - 1
            if (item.hour === coin[hourIndex]?.hour) {
                if (data[index]?.length) {
                    data[index].push(item)
                } else {
                    data[index] = []
                    data[index].push(item)
                }
            } else {
                index++
                data[index] = []
                data[index].push(item)
            }
        })

        const candleData: { date: any; low: number; high: number; open: number; close: number; }[] = []

        data.forEach((hourItem, i) => {
            hourItem.forEach((item, j) => {
                if (j === 0) {
                    candleData[i] = {
                        date: moment(item.date).startOf('hour').toDate(),
                        low: i == 0 ? item.current_price : candleData[i - 1].close,
                        high: i == 0 ? item.current_price : candleData[i - 1].close,
                        open: i == 0 ? item.current_price : candleData[i - 1].close,
                        close: i == 0 ? item.current_price : candleData[i - 1].close
                    }
                }
                if (item.current_price < candleData[i].low) {
                    candleData[i] = {...candleData[i], low: item.current_price}
                }
                if (item.current_price > candleData[i].high) {
                    candleData[i] = {...candleData[i], high: item.current_price}
                }
                if (j === hourItem.length - 1) {
                    candleData[i] = {...candleData[i], close: item.current_price}
                }
            })
        })
        return candleData
    }
    return []
}