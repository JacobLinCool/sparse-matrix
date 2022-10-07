import { SparseMatrix } from "../types";
import { transpose } from "../transpose";

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
 * 1 2
 * 3 4
 */
const b: SparseMatrix = [
    { row: 2, col: 2, value: 4 },
    { row: 0, col: 0, value: 1 },
    { row: 0, col: 1, value: 2 },
    { row: 1, col: 0, value: 3 },
    { row: 1, col: 1, value: 4 },
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

describe("transpose", () => {
    it("should transpose a square matrix", () => {
        expect(transpose(a)).toEqual([
            { row: 3, col: 3, value: 5 },
            { row: 0, col: 0, value: 1 },
            { row: 0, col: 2, value: 4 },
            { row: 1, col: 1, value: 3 },
            { row: 2, col: 0, value: 2 },
            { row: 2, col: 2, value: 5 },
        ]);

        expect(transpose(b)).toEqual([
            { row: 2, col: 2, value: 4 },
            { row: 0, col: 0, value: 1 },
            { row: 0, col: 1, value: 3 },
            { row: 1, col: 0, value: 2 },
            { row: 1, col: 1, value: 4 },
        ]);
    });

    it("should transpose a non-square matrix", () => {
        expect(transpose(c)).toEqual([
            { row: 3, col: 2, value: 2 },
            { row: 0, col: 1, value: 1 },
            { row: 2, col: 0, value: 1 },
        ]);
    });
});
