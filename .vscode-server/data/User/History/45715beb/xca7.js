//retourne la moyenne d'un tableau
//le tableau est d'une longueur indéfinie

import {describe, test, expect} from 'vitest';

describe("structure", () => {
    test("should be defined", () =><{
        expect(moyenne).toBeDefined()
    })
    test('should be a function', () =>{
        expect(moyenne).toBeTypeOf('function');
    })
})