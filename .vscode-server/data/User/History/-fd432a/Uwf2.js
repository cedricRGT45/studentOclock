import {test, expect} from 'vitest';
import sum from './sum.js';

test("check structure", () =>{
    //expect prend une valeur t la compare/match selon la méthde appelée depuis le 'expect'
    expect(sum).toBeDefined()
	expect(sum).toBeTypeOf("function");
})

test("should retunr the sum of 2 args", () =>{
    expect(sum(2,4)).toEqual(6)
    //value not expected
    expect(sum(2,2)).not.toBe(22)
    /*ne pas hésiter à tester des edgeCases(cas extrême)
    =>cas peu probable peu réaliste pour s'assurer de la robustesse de la fonction*/
})

test("should return an error if one of the two args is not a number"), () =>{
    expect(sum('2', '2')).toBe("les 2 parmas doivent être de type number")
}