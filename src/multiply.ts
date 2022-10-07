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

    let [a_idx, b_idx] = [1, 1];
    let [a_row_head, b_row_head] = [a_idx, b_idx];
    let sum = 0;
    while (a_idx <= A[0].value) {
        if (A[a_idx].col === B_T[b_idx].col) {
            sum += A[a_idx].value * B_T[b_idx].value;
            ++b_idx;
        } else if (A[a_idx].col < B_T[b_idx].col) {
            ++a_idx;
        } else if (A[a_idx].col > B_T[b_idx].col) {
            ++b_idx;
        }

        if (A[a_idx]?.row !== A[a_row_head].row) {
            a_idx = a_row_head;
            ++b_idx;
        }

        if (B_T[b_idx]?.row !== B_T[b_row_head]?.row) {
            if (sum !== 0) {
                C.push({ row: A[a_row_head].row, col: B_T[b_row_head].row, value: sum });
                ++C[0].value;
                sum = 0;
            }
            b_row_head = b_idx;
            a_idx = a_row_head;
        }

        if (b_idx > B_T[0].value) {
            if (sum !== 0) {
                C.push({ row: A[a_row_head].row, col: B_T[b_row_head].row, value: sum });
                ++C[0].value;
                sum = 0;
            }
            while (A[a_idx]?.row === A[a_row_head].row) {
                ++a_idx;
            }
            a_row_head = a_idx;
            b_idx = b_row_head = 1;
        }
    }

    return C;
}
