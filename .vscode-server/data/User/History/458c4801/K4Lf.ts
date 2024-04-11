//7 types natifs js: string, numbre, boolean, undefined, null, object, bigInt

const nickname:string = "ced";
const music:string[] =["metal", "dnb","Jazz"] 
const age:number | string = 42;//assigner plusieurs type à une variable
const meals:Array<string> = ["magret","Sushi", "poutine", "falafel"]
const dwarves:(string|number|boolean)[] = [true,"gimli", 240, "thorin", 345] //assigner plusieurs type à un tableau = union
music.push("242")
console.log(music)