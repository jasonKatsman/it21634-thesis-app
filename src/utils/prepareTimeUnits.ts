
export const prepareTimeUnits =(time:string)=>{
    switch (time){
        case 'daily':return 'hours'
        case 'weekly':return 'days'
        case 'monthly':return 'days'
        case 'yearly':return 'months'
        default: return 'months'
    }
}