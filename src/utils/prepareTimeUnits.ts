
export const prepareTimeUnits =(time:string)=>{
    switch (time){
        case 'daily':return 'hours'
        case 'weekly':return 'days'
        case 'monthly':return 'date'
        case 'yearly':return 'months'
        default: return 'months'
    }
}