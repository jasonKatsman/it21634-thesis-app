



        type Customer = {
            fullName: string;
            age: number;
            phone?: number;
        }

        const customerA: Customer = {
         fullName: "Jason K.",
         age: 25
        }

console.log(customerA)
export const prepareTimeUnits = (time: string) => {
    switch (time) {
        case 'daily':
            return 'yearmonthdatehours'
        case 'weekly':
            return 'yearmonthdate'
        case 'monthly':
            return 'yearmonthdate'
        case 'yearly':
            return 'yearmonths'
        default:
            return 'yearmonths'
    }
}