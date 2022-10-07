import { SparseMatrix, Term } from "./types";
import { DimensionError } from "./error";

/**
 * Adds two sparse matrices. `O(A.terms + B.terms)`.
 * @param A The first matrix.
 * @param B The second matrix.
 * @returns The sum of the two matrices.
 */
export function add(A: SparseMatrix, B: SparseMatrix): SparseMatrix {
    if (A[0]?.col !== B[0]?.col || A[0]?.row !== B[0]?.row) {
        throw new DimensionError(A, B);
    }

    const C: SparseMatrix = [{ row: A[0].row, col: A[0].col, value: 0 }];

    let [i, j, k] = [1, 1, 1];

    while (i <= A[0].value && j <= B[0].value) {
        if (A[i].row < B[j].row) {
            C[k++] = A[i++];
        } else if (A[i].row > B[j].row) {
            C[k++] = B[j++];
        } else if (A[i].col < B[j].col) {
            C[k++] = A[i++];
        } else if (A[i].col > B[j].col) {
            C[k++] = B[j++];
        } else {
            const term: Term = { row: A[i].row, col: A[i].col, value: A[i].value + B[j].value };
            if (term.value) {
                C[k++] = term;
            }
            i++, j++;
        }
    }

    while (i <= A[0].value) {
        C[k++] = A[i++];
    }

    while (j <= B[0].value) {
        C[k++] = B[j++];
    }

    C[0].value = k - 1;

    return C;
}
