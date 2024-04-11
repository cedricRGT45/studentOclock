//7 types natifs/primitif js: string, numbre, boolean, undefined, null, object, bigInt
//type composite/scalaire/non scalaire => object

const nickname:string = "ced";
const music:string[] =["metal", "dnb","Jazz"] 
const meals:Array<string> = ["magret","Sushi", "poutine", "falafel"]
//assigner plusieurs type à une variable
const age:number | string = 42;
//assigner plusieurs type à un tableau = union
const dwarves:(string|number|boolean)[] = [true,"gimli", 240, "thorin", 345] 
music.push("242")


//user=>type composite
interface User {
    name: string,
    age:number;
    favMusicStyles:? string[]
}

function createUser(firstname:string, lastname:string, age:number, favMusicStyles:string[]:User)