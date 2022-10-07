import { SparseMatrix } from "./types";
import { transpose } from "./transpose";
import { add } from "./add";
import { multiply } from "./multiply";
import { in_range, validate_matrix } from "./utils";
import { OutOfRangeError } from "./error";

/**
 * A Matrix class that uses sparse matrix representation under the hood.
 */
export class Matrix {
    public data: SparseMatrix;

    /** Create a matrix by sparese matrix array */
    constructor(data: SparseMatrix) {
        this.data = data;
        this.validate();
    }

    /** Get the number of row */
    public get row(): number {
        return this.data[0].row;
    }

    /** Get the number of column */
    public get col(): number {
        return this.data[0].col;
    }

    /** Get the number of non-empty elements */
    public get size(): number {
        return this.data[0].value;
    }

    /** Create a new matrix, which is the transposed matrix of the original one */
    public transpose(): Matrix {
        return new Matrix(transpose(this.data));
    }

    /** Create a new matrix, which is the result of the addition of this and an other matrix */
    public add(other: Matrix): Matrix {
        return new Matrix(add(this.data, other.data));
    }

    /** Create a new matrix, which is the result of the multiplication of this and an other matrix */
    public multiply(other: Matrix): Matrix {
        return new Matrix(multiply(this.data, other.data));
    }

    /** Apply a map function to each non-zero element of this matrix */
    public map(func: (value: number, row: number, col: number) => number): this {
        for (let i = 1; i <= this.size; ++i) {
            const term = this.data[i];
            this.data[i].value = func(term.value, term.row, term.col);
        }

        return this;
    }

    /** Set the element value of this matrix */
    public set(row: number, col: number, value: number): this {
        if (in_range(row, col, this.data) === false) {
            throw new OutOfRangeError(row, col, this.data);
        }

        if (value !== 0) {
            const [found, idx] = this.find(row, col);
            if (found) {
                this.data[idx].value = value;
            } else {
                this.data.splice(idx, 0, { row, col, value });
                ++this.data[0].value;
            }
        } else {
            const [found, idx] = this.find(row, col);
            if (found) {
                this.data.splice(idx, 1);
                --this.data[0].value;
            }
        }

        return this;
    }

    /** Get the element value of this matrix */
    public get(row: number, col: number): number {
        if (in_range(row, col, this.data) === false) {
            throw new OutOfRangeError(row, col, this.data);
        }

        const [found, idx] = this.find(row, col);
        return found ? this.data[idx].value : 0;
    }

    /** Get this matrix in 2D array form */
    public to2d(): number[][] {
        const result: number[][] = [];
        for (let i = 0; i < this.row; ++i) {
            result.push([]);
            for (let j = 0; j < this.col; ++j) {
                result[i].push(0);
            }
        }

        for (let i = 1; i <= this.size; ++i) {
            const { row, col, value } = this.data[i];
            result[row][col] = value;
        }

        return result;
    }

    /** Validate the matrix */
    public validate(): this {
        validate_matrix(this.data);
        return this;
    }

    /** Create an empty matrix with given shape */
    public static empty(row: number, col: number): Matrix {
        return new Matrix([{ row, col, value: 0 }]);
    }

    /** Create a matrix from 2D array form */
    public static from2d(data: number[][]): Matrix {
        const result: SparseMatrix = [{ row: data.length, col: data[0].length, value: 0 }];
        for (let i = 0; i < data.length; ++i) {
            for (let j = 0; j < data[i].length; ++j) {
                if (data[i][j] !== 0) {
                    result.push({ row: i, col: j, value: data[i][j] });
                    ++result[0].value;
                }
            }
        }

        return new Matrix(result);
    }

    private find(row: number, col: number): [boolean, number] {
        let [lower, upper] = [1, this.size];

        while (lower <= upper) {
            const mid = Math.floor((lower + upper) / 2);
            if (this.data[mid].row === row && this.data[mid].col === col) {
                return [true, mid];
            } else if (
                this.data[mid].row < row ||
                (this.data[mid].row === row && this.data[mid].col < col)
            ) {
                lower = mid + 1;
            } else {
                upper = mid - 1;
            }
        }

        return [false, lower];
    }
}
