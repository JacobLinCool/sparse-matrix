import { SparseMatrix } from "../types";
import { add } from "../add";
import { DimensionError } from "../error";

/**
 * 1 0 2
 * 0 3 0
 * 4 0 5
 */
const a: SparseMatrix = [
    { row: 3, col: 3, value: 5 },
    { row: 0, col: 0, value: 1 },
    { row: 0, col: 2, value: 2 },
    { row: 1, col: 1, value: 3 },
    { row: 2, col: 0, value: 4 },
    { row: 2, col: 2, value: 5 },
];

/**
 * 0 6 0
 * 7 0 8
 * 0 9 10
 */
const b: SparseMatrix = [
    { row: 3, col: 3, value: 5 },
    { row: 0, col: 1, value: 6 },
    { row: 1, col: 0, value: 7 },
    { row: 1, col: 2, value: 8 },
    { row: 2, col: 1, value: 9 },
    { row: 2, col: 2, value: 10 },
];

/**
 * 0 0 1
 * 1 0 0
 */
const c: SparseMatrix = [
    { row: 2, col: 3, value: 2 },
    { row: 0, col: 2, value: 1 },
    { row: 1, col: 0, value: 1 },
];

describe("add", () => {
    it("should add two matrices", () => {
        expect(add(a, b)).toEqual([
            { row: 3, col: 3, value: 9 },
            { row: 0, col: 0, value: 1 },
            { row: 0, col: 1, value: 6 },
            { row: 0, col: 2, value: 2 },
            { row: 1, col: 0, value: 7 },
            { row: 1, col: 1, value: 3 },
            { row: 1, col: 2, value: 8 },
            { row: 2, col: 0, value: 4 },
            { row: 2, col: 1, value: 9 },
            { row: 2, col: 2, value: 15 },
        ]);
    });

    it("should throw an error if matrices have different dimensions", () => {
        expect(() => add(a, c)).toThrowError(DimensionError);
    });
});
