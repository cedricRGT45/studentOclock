import {test, expect} from 'vitest';
import sum from './sum.js';

test("check structure", () =>{
    //expect prend une valeur t la compare/match selon la méthde appelée depuis le 'expect'
    expect(sum).toBeDefined()
	expect(sum).toBeTypeOf("function");
})

test("should retunr the sum of 2 args", () =>{
    expect(sum()).toEqual(a+b)
})