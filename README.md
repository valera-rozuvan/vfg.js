# Lambda math

[![Build Status](https://travis-ci.org/valera-rozuvan/lambda-math.svg?branch=master)](https://travis-ci.org/valera-rozuvan/lambda-math)
[![npm version](https://badge.fury.io/js/lambda-math.svg)](https://badge.fury.io/js/lambda-math)

Pseudo lambda expressions for JS arbitrary-precision arithmetic operations.

## Install

```
npm install --save lambda-math
```

## Example

Consider adding the floating point number `300 / 293` many times. 72 times in fact. Now, we don't want to simply multiply a number by 72. We want to add it 72 times. This way, we can clearly see the problem with floating point number rounding which exists in standard JavaScript.

The simple JavaScript way of doing such a sum:

```
let result = 0;

for (let i = 0; i < 72; i += 1) {
  result += 300 / 293;
}

console.log(result); // 73.72013651877126
```

Or, a more functional (fancy) JS approach:

```
console.log(
  Array
    .from(Array(72).keys())
    .map(() => { return 300 / 293; })
    .reduce((a, b) => { return a + b; })
); // 73.72013651877126
```

You may have noticed that both approaches produce exactly the same output: `73.72013651877126`. If you go and use some cool mathematical environment to actually perform this arithmetic, you will see that the output is something like: `73.7201365187713310580204778156996587...`. Comparing the JS output and mathematical output, we can see that the last 2 digits are wrong in the JS version:

```
JS:   73.72...77126
Math: 73.72...77133
```

Can we do any better? Using `lambda-math` library, we can write:

```
const { div, add, λ, Σ } = require('lambda-math');

λ( div, [300, 293] )
 ( add, [λ[0], λ[0]], [Σ, λ[0]], 70 );

console.log(λ[1].number); // 73.72013651877133
console.log(λ[1].string); // '73.72013651877133105776'
```

As you can see, the pseudo lambda approach doesn't have the problem with rounding floating point numbers. Also, some (mathematicians) can argue that the syntax `lambda-math` introduces is more elegant, shorter, and cleaner overall (compared to pure JavaScript way of doing things).

## Internals

Besides adding pseudo syntactic sugar, `lambda-math` uses [bignumber.js](https://www.npmjs.com/package/bignumber.js) under the hood for actual arbitrary-precision decimal arithmetic.

## Library API

The library `lambda-math` exports the symbols `λ` and `Σ`, along with a number of mathematical functions. At the moment there are just 4 arithmetic functions available. Addition, subtraction, multiplication, and division:

```
c = add(a, b) // same as: a + b
c = sub(a, b) // same as: a - b
c = mul(a, b) // same as: a * b
c = div(a, b) // same as: a / b
```

These 4 functions accept either JavaScript `number`, `string`, or a `BigNumber` as parameters (can mix either way).

While you can use these functions directly, what you want to do is use them via the `λ` function. The `λ` function expects several parameters. The first parameter is the math function to be applied. It can be one of the above 4 functions. The 2nd, 3rd, etc. params must be arrays containing the numbers that will be passed to each subsequent call of the math function.

Optionally, you can pass to `λ` a simple JavaScript number as the last param. It will indicate how many times the last math function needs to be called with the last set of params. You should think of this as a `for loop`.

Additionally, besides numbers, any of the parameter arrays can contain the symbol `Σ`. You can use the symbol `Σ` to tell `lambda-math` to substitute the result of the last operation as a param to a math function call. You should think of this as a `variable`.

Some examples follow below to better demonstrate these concepts.

### Example 1

```
λ(add, [1, 2]);
console.log(λ[0].number); // 3

// The same as:
let c = add(1, 2);
console.log(c.toNumber()); // 3
```

### Example 2

```
λ(add, [3, 4], [5, 6]);
console.log(λ[0].number); // 11

// Is the same as:
let c = add(3, 4);
c = add(5, 6);
console.log(c.toNumber()); // 11
```

### Example 3

```
λ(add, [3, 4], [Σ, 6]);
console.log(λ[0].number); // 13

// Is the same as:
let c = add(3, 4);
c = add(c, 6);
console.log(c.toNumber()); // 13
```

### Example 4

```
λ(add, [3, 4], 10);
console.log(λ[0].number); // 7

// Is the same as:
let c;
for (let i = 0; i < 10; i += 1) {
  c = add(3, 4);
}
console.log(c.toNumber()); // 7
```

### Example 5

```
λ(add, [3, 4], [Σ, 1], 10);
console.log(λ[0].number); // 17

// Is the same as:
let c = add(3, 4);
for (let i = 0; i < 10; i += 1) {
  c = add(c, 1);
}
console.log(c.toNumber()); // 17
```

### Example 6

Besides using `λ` as a function, you can also access the results of each invocation of the function via the array index, starting from 0. So first invocation of `λ` will store the result as `λ[0]`, second invocation as `λ[1]`, and so on. For convenience, `λ[i].number` will contain the JavaScript `number` result value, `λ[i].string` will contain the JavaScript `string` result value, and `λ[i]` will contain the `BigNumber` result value.

```
λ(add, [1, 2]);
λ(add, [3, 4]);
λ(add, [5, 6]);

console.log(λ[0].number); // 3
console.log(λ[1].number); // 7
console.log(λ[2].number); // 11

console.log(λ[0].string); // '3'
console.log(λ[1].string); // '7'
console.log(λ[2].string); // '11'
```

### Example 7

You can also chain any number of calls to `λ`, and this will not have any affect on your program:

```
λ(add, [1, 2])
 (add, [3, 4])
 (add, [5, 6]);

console.log(λ[0].number); // 3
console.log(λ[1].number); // 7
console.log(λ[2].number); // 11
```

This is possible due to the fact that an invocation of `λ` returns an instance of itself ;)

### Example 8

Last, but not least, `λ.reset()` is available to clear all `lambda-math` state, and reset the results stack to zero.

```
λ(add, [1, 2])
 (add, [3, 4])
 (add, [5, 6]);

console.log(λ[0].number); // 3
console.log(λ[1].number); // 7
console.log(λ[2].number); // 11
console.log(λ[3]); // undefined
console.log(λ[4]); // undefined
console.log(λ[5]); // undefined

λ.reset();

λ(add, [10, 20])
 (add, [30, 40])
 (add, [50, 60]);

console.log(λ[0].number); // 30
console.log(λ[1].number); // 70
console.log(λ[2].number); // 110
console.log(λ[3]); // undefined
console.log(λ[4]); // undefined
console.log(λ[5]); // undefined
```

## Running tests

Clone this repo, do `npm install`, followed by `npm run test`.

## Lint the source code

You can use ESLint to check for potential problems in source code by running `npm run lint`.

## License

See [LICENSE](LICENSE) for more details.
