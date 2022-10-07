import { SparseMatrix } from "./types";

/**
 * Fast Transpose `O(A.cols + A.terms)`
 * @param A Sparse Matrix
 * @returns Transposed Sparse Matrix `A^T`
 */
export function transpose(A: SparseMatrix): SparseMatrix {
    const B: SparseMatrix = [{ row: A[0].col, col: A[0].row, value: A[0].value }];

    const row_terms = Array.from({ length: A[0].col }, () => 0);
    const starting_pos = Array.from({ length: A[0].col }, () => 0);

    for (let i = 1; i <= A[0].value; ++i) {
        row_terms[A[i].col]++;
    }

    starting_pos[0] = 1;
    for (let i = 1; i < A[0].col; ++i) {
        starting_pos[i] = starting_pos[i - 1] + row_terms[i - 1];
    }

    for (let i = 1; i <= A[0].value; ++i) {
        B[starting_pos[A[i].col]++] = { row: A[i].col, col: A[i].row, value: A[i].value };
    }

    return B;
}
