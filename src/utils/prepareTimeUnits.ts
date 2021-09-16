
export const prepareTimeUnits =(time:string)=>{
    switch (time){
        case 'daily':return 'monthdatehours'
        case 'weekly':return 'monthdate'
        case 'monthly':return 'monthdate'
        case 'yearly':return 'yearmonths'
        default: return 'yearmonths'
    }
}