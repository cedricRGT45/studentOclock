import {test, expect} from 'vitest';
import sum from './sum.js';

test("check structure", () =>{
    //expect prend une valeur t la compare/match selon la méthde appelée depuis le 'expect'
    expect(sum).toBeDefined()
    expect(typeof sum).toBeType("string")

})