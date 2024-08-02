function sum(a, b) {
    if (typeof a != "number" || typeof b ==! "number"){
        return "les 2 params doivent être de type number"
    }
return a + b;
}

export default sum;