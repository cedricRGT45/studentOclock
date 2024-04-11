//7 types natifs js: string, numbre, boolean, undefined, null, object, bigInt

const nickname:string = "ced";
const music:string[] =["metal", "dnb","Jazz"] 
const meals:Array<string> = ["magret","Sushi", "poutine", "falafel"]
//assigner plusieurs type à une variable
const age:number | string = 42;
//assigner plusieurs type à un tableau = union
const dwarves:(string|number|boolean)[] = [true,"gimli", 240, "thorin", 345] 
music.push("242")
console.log(music)

function getValue(numA:number, numB:number){
    return numA + numB;
};
const r = getValue(4, 2)
console.log(s)