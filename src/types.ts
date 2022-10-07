export interface Term {
    row: number;
    col: number;
    value: number;
}

/**
 * Sparse Matrix. (Should be sorted)
 */
export interface SparseMatrix extends Array<Term> {
    0: Term;
    length: number;
}
