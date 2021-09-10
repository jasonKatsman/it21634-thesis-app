export const prepareTimeNumber =(time:string)=>{
    switch (time){
        case 'daily':return 25
        case 'weekly':return 7
        case 'monthly':return 7
        case 'yearly':return 12
        default: return 12
    }
}