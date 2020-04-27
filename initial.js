
function add(x, y) {
  return x + y;
}

function mult(x, y) {
  return x * y;
}

function div(x, y) {
  return x / y;
}

function log(msg) {
  console.log(msg);
}

// And now:

_f( add, [2, 6], mult, [_, 10], log, [_] );

// is the same as:

λ.prec(50);

λ( add, [2, 4], [_, 6], [_, 8] );
λ( mul, [3, _], [_, 5] );
λ( add, [_, 8] );
λ( div, [λ[2], λ[3]] );

var retVal = _.prec(10);

// is the same as:

λ.setup(3);
λ.precision(50);

λ( add, [2, 4], [_, 6], [_, 8] )
 ( mul, [31324138947, λ[0]], [_, 10000000] )
 ( add, [λ[1], 8] )
 ( div, [λ[1], λ[2]], [_, λ[2]], 6 );

var retVal = λ[5].number(12);
// retVal is a regular JavaScript number, with at most 12 digits after the decimal point.

λ.clear();

// is the same as:

log(mult(add(2, 6), 10));

/* ------------------------------------------------------------ */

function one1(event, a, b, c) {
    event.preventDefault();

    this.log(a + ' + ' + c + ' = ' + (a + c));
}


function one2(_v) {
    if (_v.event !== undefined) {
        _v.event.preventDefault();
    }

    this.log(_v.a + ' + ' + _v.c + ' = ' + (_v.a + _v.c));
}


function one3(_v) {
    var event = _v.event,
        a = _v.a,
        c = _v.c;

    if (event !== undefined) {
        event.preventDefault();
    }

    this.log(a + ' + ' + c + ' = ' + (a + c));
}


var _this = this;
$('.input').on('click', function (event) {
    one1.call(_this, event, 2, null, 8);
});


$('.input').on(
    'click',
    _f(one1, ['{1}', 2, '{}', 8], this)
);


$('.input').on(
    'click',
    _f(one2, { event: '{1}', a: 2, c: 8 }, this)
);


/* ---------------------------------------------------------------- */

var newF = _f(one2, { event: '{1}', a: 2, c: 8 }, this);

newF(someEventObj);

// ...
//
// is the same as
//
// ...

one2.call(this, someEventObj, 2, undefined, 8);

// Simple implementation.

(function () {
    window._f = function extendFunction(originalFunction, variables, context) {
        if (!$.isFunction(originalFunction)) {
            return error();
        }

        if ($.isArray(variables)) {
            return extendFunctionArray(originalFunction, variables, context);
        }

        if ($.isPlainObject(variables)) {
            return extendFunctionObject(originalFunction, variables, context);
        }

        return error();
    };

    return;

    function error() {
        console.log('ERROR');
        return function () {};
    }

    function extendFunctionArray(originalFunction, variables, context) {
        return function newFArray() {
            var newArguments = [],
                argNumber;

            $.each(variables, function (index, value) {
                argNumber = getMacroNumber(value);

                if (argNumber !== undefined) {
                    if (argNumber === 0) {
                        newArguments.push(undefined);
                    } else {
                        newArguments.push(arguments[argNumber - 1]);
                    }
                } else {
                    newArguments.push(value);
                }
            });

            return originalFunction.apply(context, newArguments);
        };
    }

    function extendFunctionObject(originalFunction, variables, context) {
        return function newFObject() {
            var _v = {},
                property,
                argNumber;

            for (property in variables) {
                if (variables.hasOwnProperty(property)) {
                    argNumber = getMacroNumber(variables[property]);

                    if (argNumber !== undefined) {
                        if (argNumber === 0) {
                            _v[property] = undefined;
                        } else {
                            _v[property] = arguments[argNumber - 1];
                        }
                    } else {
                        _v[property] = variables[property];
                    }
                }
            }

            return originalFunction.call(context, _v);
        };
    }

    function getMacroNumber(inputStr) {
        var matches;

        // We only accept `inputStr` of type `string`. Return
        // `undefined` (implicitly).
        if (typeof inputStr !== 'string') {
            return;
        }

        // The user requested an `undefined` parameter.
        // Internally, `undefined` parameter is represented as
        // the `0` integer.
        if (inputStr === '{}') {
            return 0;
        }

        // Parse the input string. If it is in the format
        //
        //     {N}
        //
        // where N is a positive integer, return N (converted
        // to integer type).
        if ((matches = inputStr.match(/^\{(\d+)\}$/)) !== null) {
            return parseInt(matches[1], 10);
        }

        // Otherwise, return `undefined` (implicitly).
    }
}).call(this);