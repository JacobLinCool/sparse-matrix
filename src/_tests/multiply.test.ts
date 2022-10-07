import { SparseMatrix } from "../types";
import { multiply } from "../multiply";
import { DimensionError } from "../error";
// import { transpose } from "../transpose";

const a: SparseMatrix = [
    { row: 7, col: 9, value: 15 },
    { row: 0, col: 0, value: 1 },
    { row: 0, col: 1, value: 2 },
    { row: 0, col: 7, value: 1 },
    { row: 1, col: 3, value: 1 },
    { row: 1, col: 6, value: 2 },
    { row: 2, col: 1, value: -1 },
    { row: 3, col: 4, value: 4 },
    { row: 3, col: 6, value: 1 },
    { row: 3, col: 8, value: 2 },
    { row: 4, col: 4, value: 1 },
    { row: 5, col: 1, value: 2 },
    { row: 5, col: 4, value: 4 },
    { row: 5, col: 8, value: -1 },
    { row: 6, col: 0, value: -1 },
    { row: 6, col: 1, value: -1 },
];

const b: SparseMatrix = [
    { row: 9, col: 5, value: 8 },
    { row: 0, col: 1, value: 1 },
    { row: 0, col: 3, value: 1 },
    { row: 4, col: 0, value: 2 },
    { row: 4, col: 3, value: -1 },
    { row: 7, col: 1, value: 1 },
    { row: 7, col: 3, value: 1 },
    { row: 8, col: 0, value: 2 },
    { row: 8, col: 2, value: 1 },
];

const c: SparseMatrix = [
    { row: 2, col: 3, value: 2 },
    { row: 0, col: 2, value: 1 },
    { row: 1, col: 0, value: 1 },
];

describe("multiply", () => {
    it.skip("should multiply two matrices", () => {
        expect(multiply(a, b)).toEqual([
            { row: 7, col: 5, value: 12 },
            { row: 0, col: 1, value: 2 },
            { row: 0, col: 3, value: 2 },
            { row: 3, col: 0, value: 12 },
            { row: 3, col: 2, value: 2 },
            { row: 3, col: 3, value: -4 },
            { row: 4, col: 0, value: 2 },
            { row: 4, col: 3, value: -1 },
            { row: 5, col: 0, value: 6 },
            { row: 5, col: 2, value: -1 },
            { row: 5, col: 3, value: -4 },
            { row: 6, col: 1, value: -1 },
            { row: 6, col: 3, value: -1 },
        ]);
    });

    it("should throw an error if matrices have different dimensions", () => {
        expect(() => multiply(a, c)).toThrowError(DimensionError);
    });
});
