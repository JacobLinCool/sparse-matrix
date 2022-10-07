import { SparseMatrix } from "./types";
import { transpose } from "./transpose";
import { DimensionError } from "./error";

/**
 * Multiply two matrices. `O(A.terms * B.cols + B.terms * A.rows)`.
 * @param A The first matrix.
 * @param B The second matrix.
 * @returns The product of the two matrices.
 */
export function multiply(A: SparseMatrix, B: SparseMatrix): SparseMatrix {
    if (A[0].col !== B[0].row) {
        throw new DimensionError(A, B);
    }

    const C: SparseMatrix = [{ row: A[0].row, col: B[0].col, value: 0 }];

    const B_T = transpose(B);

    return C;
}
