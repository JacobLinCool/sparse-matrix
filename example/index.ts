import { Matrix } from "../src";

const m = Matrix.empty(4, 4).set(1, 1, 2).set(2, 2, 4);
const n = Matrix.from2d([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
]);

console.log(
    m
        .multiply(n)
        .transpose()
        .map((n) => n * 2)
        .to2d(),
);
