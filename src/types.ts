export interface Term {
    row: number;
    col: number;
    value: number;
}

export type SparseMatrix = Term[];
