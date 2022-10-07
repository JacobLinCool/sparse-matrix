import { SparseMatrix } from "./types";

export class DimensionError extends Error {
    public matrices: SparseMatrix[];

    constructor(...matrices: SparseMatrix[]) {
        super("Matrices must have valid dimensions");
        this.matrices = matrices;
    }
}

export class OutOfRangeError extends RangeError {
    public row: number;
    public col: number;
    public matrix: SparseMatrix;

    constructor(row: number, col: number, matrix: SparseMatrix) {
        super(`(${row}, ${col}) is out of range`);
        this.row = row;
        this.col = col;
        this.matrix = matrix;
    }
}
