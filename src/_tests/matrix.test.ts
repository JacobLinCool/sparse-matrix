import { Matrix } from "../matrix";

describe("Matrix", () => {
    it("should be able to create a matrix", () => {
        const m = Matrix.empty(3, 3);
        expect(m.row).toBe(3);
        expect(m.col).toBe(3);
        expect(m.size).toBe(0);
        expect(m.data).toEqual([{ row: 3, col: 3, value: 0 }]);
    });

    it("should be able to set and get a value", () => {
        const m = Matrix.empty(3, 3);
        m.set(1, 1, 1);
        m.set(1, 1, 2);
        m.set(2, 0, 3);
        m.set(2, 0, 0);
        expect(m.get(1, 1)).toBe(2);
        expect(m.size).toBe(1);
        expect(m.data).toEqual([
            { row: 3, col: 3, value: 1 },
            { row: 1, col: 1, value: 2 },
        ]);
    });

    it("should be able to export as 2D array", () => {
        const m = Matrix.empty(3, 3);
        m.set(1, 1, 1);
        expect(m.to2d()).toEqual([
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0],
        ]);
    });

    it("should be able to transpose", () => {
        const m = Matrix.from2d([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ]);
        expect(m.transpose().to2d()).toEqual([
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
        ]);
    });

    it("should be able to add", () => {
        const m1 = Matrix.from2d([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ]);

        const m2 = Matrix.from2d([
            [1, 0, 1],
            [0, 2, 0],
            [3, 0, 3],
        ]);

        expect(m1.add(m2).to2d()).toEqual([
            [2, 2, 4],
            [4, 7, 6],
            [10, 8, 12],
        ]);
    });

    it("should be able to multiply", () => {
        const m1 = Matrix.from2d([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ]);

        const m2 = Matrix.from2d([
            [1, 0, 1],
            [0, 2, 0],
            [3, 0, 3],
        ]);

        expect(m1.multiply(m2).to2d()).toEqual([
            [10, 4, 10],
            [22, 10, 22],
            [34, 16, 34],
        ]);
    });

    it("should throw out of range error", () => {
        const m = Matrix.empty(3, 3);
        expect(() => m.set(-1, -1, 1)).toThrowError();
        expect(() => m.get(3, 3)).toThrowError();
    });
});
