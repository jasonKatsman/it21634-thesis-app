import ArrowDropDownRounded from "@material-ui/icons/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@material-ui/icons/ArrowDropUpRounded";
import React from "react";

export const preparePercentage = (prevPrice: number, currentPrice: number): number => {
    const startPrice = prevPrice
    const endPrice = currentPrice
    if (startPrice && endPrice) {
        return (100 - (startPrice * 100 / endPrice))
    }
    return 0
}

export const prepareDiffPercentage = (maxPrice: number, currentPrice: number): number => {
    return (currentPrice / maxPrice) * 100
}

export const preparePercentageClass = (percentage: number) => {
    if (percentage === 0) {
        return 'gray'
    }
    if (percentage < 0) {
        return 'red'
    }
    if (percentage > 0) {
        return 'green'
    }
}

export const prepareIcon = (percentage: number) => {
    if (percentage < 0) {
        return <ArrowDropDownRounded style={{color: 'red'}}/>
    }
    if (percentage > 0) {
        return <ArrowDropUpRoundedIcon style={{color: 'green'}}/>
    }

}