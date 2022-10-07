import { SparseMatrix } from "./types";

export class DimensionError extends Error {
    public matrices: SparseMatrix[];

    constructor(...matrices: SparseMatrix[]) {
        super("Matrices must have valid dimensions");
        this.matrices = matrices;
    }
}
