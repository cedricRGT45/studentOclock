"use strict";
//7 types natifs js: string, numbre, boolean, undefined, null, object, bigInt
const nickname = "ced";
const music = ["metal", "dnb", "Jazz"];
const meals = ["magret", "Sushi", "poutine", "falafel"];
const age = 42; //assigner plusieurs type à une variable
const dwarves = [true, "gimli", 240, "thorin", 345]; //assigner plusieurs type à un tableau = union
music.push("242");
console.log(music);
function getValue(numA, numB) {
    return numA + numB;
}
;
const r = getValue(4, 2);
console.log(r);
