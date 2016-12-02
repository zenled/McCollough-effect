export class stringValidator{
    public static isValidInt(value: string, min= 0, max=99):boolean {
        try{
            let num = stringValidator.filterInt(value)
            if (num < 0){
                throw new Error("value is < 0");
            }
        }
        catch (err){
            return false;
        }
        return true;
    }

    private static filterInt (value:string) {
    if(value.match(/^[0-9]+$/) != null )
        return parseInt(value);
    throw new Error("Not a Number");
    }
}