# Sparse Matrix

Sparse Matrix TypeScript Implementation.

## Features

-   [x] Sparse Matrix
-   [x] Fast Transpose
-   [x] Matrix Addition
-   [x] Matrix Multiplication

Full Documentation: <https://jacoblincool.github.io/sparse-matrix/>

## Install

```sh
pnpm i sparse-matrix
```

## Usage

```ts
import { Matrix } from "sparse-matrix";

const m = Matrix.empty(4, 4).set(1, 1, 2).set(2, 2, 4);

const n = Matrix.from2d([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
]);

console.log(m.multiply(n).transpose().to2d());
```

```sh
❯ tsx example/index.ts
[
  [ 0, 10, 36, 0 ],
  [ 0, 12, 40, 0 ],
  [ 0, 14, 44, 0 ],
  [ 0, 16, 48, 0 ]
]
```
