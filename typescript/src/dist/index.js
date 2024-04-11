"use strict";
//7 types natifs/primitif js: string, numbre, boolean, undefined, null, object, bigInt
//type composite/scalaire/non scalaire => object
const nickname = "ced";
const music = ["metal", "dnb", "Jazz"];
const meals = ["magret", "Sushi", "poutine", "falafel"];
//assigner plusieurs type à une variable
const age = 42;
//assigner plusieurs type à un tableau = union
const dwarves = [true, "gimli", 240, "thorin", 345];
music.push("242");
function createUser(firstname, lastname, age, favMusicStyles) {
    return {
        name: `${firstname} ${lastname}`,
        age,
        role: "admin"
    };
}
