import { SparseMatrix } from "./types";

export function in_range(row: number, col: number, matrix: SparseMatrix): boolean {
    return row >= 0 && col >= 0 && row < matrix[0].row && col < matrix[0].col;
}

export function validate_matrix(matrix: SparseMatrix): void {
    if (matrix.length === 0) {
        throw new Error("Sparse matrix must have at least one term");
    }

    if (matrix[0].row < 0 || matrix[0].col < 0) {
        throw new Error("Sparse matrix must have valid dimensions");
    }

    if (matrix[0].value !== matrix.length - 1) {
        throw new Error("Sparse matrix must have valid size");
    }

    let [prev_row, prev_col] = [0, 0];

    for (let i = 1; i < matrix.length; ++i) {
        if (matrix[i].row < prev_row || (matrix[i].row === prev_row && matrix[i].col < prev_col)) {
            throw new Error("Sparse matrix must be sorted");
        }

        if (in_range(matrix[i].row, matrix[i].col, matrix) === false) {
            throw new Error("Sparse matrix term must be in range");
        }

        [prev_row, prev_col] = [matrix[i].row, matrix[i].col];
    }

    return;
}
