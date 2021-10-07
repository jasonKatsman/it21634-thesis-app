
export const prepareTimeUnits =(time:string)=>{
    switch (time){
        case 'daily':return 'yearmonthdatehours'
        case 'weekly':return 'yearmonthdate'
        case 'monthly':return 'yearmonthdate'
        case 'yearly':return 'yearmonths'
        default: return 'yearmonths'
    }
}