const BigNumber = require('bignumber.js');
const expect = require('chai').expect;

const λ = require('../src/index').λ;

const add = require('../src/index').add;
const sub = require('../src/index').sub;
const mul = require('../src/index').mul;
const div = require('../src/index').div;

const _ = require('../src/index')._;

function test_func() {}

describe('lambda', function () {
  beforeEach(function () {
    λ.reset();
  });

  it('should be defined', function () {
    expect(λ).to.not.be.undefined;
  });

  describe('params', function () {
    it('should throw if called without params', function () {
      expect(function () { λ(); }).to.throw(TypeError, 'λ: 1st param should be a function!');
    });

    describe('1st param', function () {
      it('should throw if called with wrong function as first param', function () {
        expect(function () { λ(test_func); }).to.throw(TypeError, 'λ: Illegal function passed as 1st param!');
      });

      describe('wrong types', function () {
        it('should throw if first param is "string"', function () {
          expect(function () { λ('test', []); }).to.throw(TypeError, 'λ: 1st param should be a function!');
        });

        it('should throw if first param is "object"', function () {
          expect(function () { λ({}, []); }).to.throw(TypeError, 'λ: 1st param should be a function!');
        });

        it('should throw if first param is "null"', function () {
          expect(function () { λ(null, []); }).to.throw(TypeError, 'λ: 1st param should be a function!');
        });

        it('should throw if first param is "undefined"', function () {
          expect(function () { λ(undefined, []); }).to.throw(TypeError, 'λ: 1st param should be a function!');
        });

        it('should throw if first param is "NaN"', function () {
          expect(function () { λ(NaN, []); }).to.throw(TypeError, 'λ: 1st param should be a function!');
        });

        it('should throw if first param is "number" 0', function () {
          expect(function () { λ(0, []); }).to.throw(TypeError, 'λ: 1st param should be a function!');
        });

        it('should throw if first param is "number" 1', function () {
          expect(function () { λ(1, []); }).to.throw(TypeError, 'λ: 1st param should be a function!');
        });

        it('should throw if first param is "boolean" false', function () {
          expect(function () { λ(false, []); }).to.throw(TypeError, 'λ: 1st param should be a function!');
        });

        it('should throw if first param is "boolean" true', function () {
          expect(function () { λ(true, []); }).to.throw(TypeError, 'λ: 1st param should be a function!');
        });

        it('should throw if first param is "BigNumber"', function () {
          expect(function () { λ(new BigNumber(1), []); }).to.throw(TypeError, 'λ: 1st param should be a function!');
        });
      });

      describe('correct arithmetic function', function () {
        it('should be callable with "add" as first param', function () {
          expect(function () { λ(add, [1, 1]); }).to.not.throw();
        });

        it('should be callable with "sub" as first param', function () {
          expect(function () { λ(sub, [1, 1]); }).to.not.throw();
        });

        it('should be callable with "mul" as first param', function () {
          expect(function () { λ(mul, [1, 1]); }).to.not.throw();
        });

        it('should be callable with "div" as first param', function () {
          expect(function () { λ(div, [1, 1]); }).to.not.throw();
        });
      });
    });

    describe('2nd param', function () {
      describe('wrong types', function () {
        it('should throw if second param is "string"', function () {
          expect(function () { λ(add, 'test'); }).to.throw(TypeError, 'λ: 2nd param should be an array!');
        });

        it('should throw if second param is "object"', function () {
          expect(function () { λ(add, {}); }).to.throw(TypeError, 'λ: 2nd param should be an array!');
        });

        it('should throw if second param is "null"', function () {
          expect(function () { λ(add, null); }).to.throw(TypeError, 'λ: 2nd param should be an array!');
        });

        it('should throw if second param is "undefined"', function () {
          expect(function () { λ(add, undefined); }).to.throw(TypeError, 'λ: 2nd param should be an array!');
        });

        it('should throw if second param is "NaN"', function () {
          expect(function () { λ(add, NaN); }).to.throw(TypeError, 'λ: 2nd param should be an array!');
        });

        it('should throw if second param is "number" 0', function () {
          expect(function () { λ(add, 0); }).to.throw(TypeError, 'λ: 2nd param should be an array!');
        });

        it('should throw if second param is "number" 1', function () {
          expect(function () { λ(add, 1); }).to.throw(TypeError, 'λ: 2nd param should be an array!');
        });

        it('should throw if second param is "boolean" false', function () {
          expect(function () { λ(add, false); }).to.throw(TypeError, 'λ: 2nd param should be an array!');
        });

        it('should throw if second param is "boolean" true', function () {
          expect(function () { λ(add, true); }).to.throw(TypeError, 'λ: 2nd param should be an array!');
        });

        it('should throw if second param is "BigNumber"', function () {
          expect(function () { λ(add, new BigNumber(1)); }).to.throw(TypeError, 'λ: 2nd param should be an array!');
        });
      });

      describe('right type', function () {
        it('should not throw if second param is "array"', function () {
          expect(function () { λ(add, [1, 1]); }).to.not.throw();
        });
      });
    });

    describe('3rd param', function () {
      describe('wrong types', function () {
        it('should throw if third param is "string"', function () {
          expect(function () { λ(add, [], 'test'); }).to.throw(TypeError, 'λ: 3rd, 4th, ... params can be either an array or a number!');
        });

        it('should throw if third param is "object"', function () {
          expect(function () { λ(add, [], {}); }).to.throw(TypeError, 'λ: 3rd, 4th, ... params can be either an array or a number!');
        });

        it('should throw if third param is "null"', function () {
          expect(function () { λ(add, [], null); }).to.throw(TypeError, 'λ: 3rd, 4th, ... params can be either an array or a number!');
        });

        it('should throw if third param is "NaN"', function () {
          expect(function () { λ(add, [], NaN); }).to.throw(Error, 'λ: Repeat last function call times should be a positive number!');
        });

        it('should throw if third param is "number" -1', function () {
          expect(function () { λ(add, [], -1); }).to.throw(Error, 'λ: Repeat last function call times should be a positive number!');
        });

        it('should throw if third param is "number" 0', function () {
          expect(function () { λ(add, [], 0); }).to.throw(Error, 'λ: Repeat last function call times should be a positive number!');
        });

        it('should throw if third param is "boolean" false', function () {
          expect(function () { λ(add, [], false); }).to.throw(TypeError, 'λ: 3rd, 4th, ... params can be either an array or a number!');
        });

        it('should throw if third param is "boolean" true', function () {
          expect(function () { λ(add, [], true); }).to.throw(TypeError, 'λ: 3rd, 4th, ... params can be either an array or a number!');
        });

        it('should throw if third param is "BigNumber"', function () {
          expect(function () { λ(add, [], new BigNumber(1)); }).to.throw(TypeError, 'λ: 3rd, 4th, ... params can be either an array or a number!');
        });
      });

      describe('correct types', function () {
        it('should not throw if third param is "undefined"', function () {
          expect(function () { λ(add, [1, 1], undefined); }).to.not.throw();
        });

        it('should not throw if third param is a positive number', function () {
          expect(function () { λ(add, [1, 1], 2); }).to.not.throw();
        });

        it('should not throw if third param is an array', function () {
          expect(function () { λ(add, [1, 1], [1, 1]); }).to.not.throw();
        });
      });

      describe('repeat last function call times', function () {
        it('should throw if another "number" is passed after', function () {
          expect(function () { λ(add, [], 1, 1); }).to.throw(Error, 'λ: Repeat last function call times should be the last parameter!');
        });

        it('should throw if another "array" is passed after', function () {
          expect(function () { λ(add, [], 1, []); }).to.throw(Error, 'λ: Repeat last function call times should be the last parameter!');
        });

        it('should throw if another "object" is passed after', function () {
          expect(function () { λ(add, [], 1, {}); }).to.throw(Error, 'λ: Repeat last function call times should be the last parameter!');
        });
      });
    });

    describe('4th param', function () {
      describe('wrong types', function () {
        it('should throw if fourth param is "string"', function () {
          expect(function () { λ(add, [], [], 'test'); }).to.throw(TypeError, 'λ: 3rd, 4th, ... params can be either an array or a number!');
        });

        it('should throw if fourth param is "object"', function () {
          expect(function () { λ(add, [], [], {}); }).to.throw(TypeError, 'λ: 3rd, 4th, ... params can be either an array or a number!');
        });

        it('should throw if fourth param is "null"', function () {
          expect(function () { λ(add, [], [], null); }).to.throw(TypeError, 'λ: 3rd, 4th, ... params can be either an array or a number!');
        });

        it('should throw if fourth param is "NaN"', function () {
          expect(function () { λ(add, [], [], NaN); }).to.throw(Error, 'λ: Repeat last function call times should be a positive number!');
        });

        it('should throw if fourth param is "number" -1', function () {
          expect(function () { λ(add, [], [], -1); }).to.throw(Error, 'λ: Repeat last function call times should be a positive number!');
        });

        it('should throw if fourth param is "number" 0', function () {
          expect(function () { λ(add, [], [], 0); }).to.throw(Error, 'λ: Repeat last function call times should be a positive number!');
        });

        it('should throw if fourth param is "boolean" false', function () {
          expect(function () { λ(add, [], [], false); }).to.throw(TypeError, 'λ: 3rd, 4th, ... params can be either an array or a number!');
        });

        it('should throw if fourth param is "boolean" true', function () {
          expect(function () { λ(add, [], [], true); }).to.throw(TypeError, 'λ: 3rd, 4th, ... params can be either an array or a number!');
        });

        it('should throw if fourth param is "BigNumber"', function () {
          expect(function () { λ(add, [], [], new BigNumber(1)); }).to.throw(TypeError, 'λ: 3rd, 4th, ... params can be either an array or a number!');
        });
      });

      describe('correct types', function () {
        it('should not throw if fourth param is "undefined"', function () {
          expect(function () { λ(add, [1, 1], [1, 1], undefined); }).to.not.throw();
        });

        it('should not throw if fourth param is a positive number', function () {
          expect(function () { λ(add, [1, 1], [1, 1], 2); }).to.not.throw();
        });

        it('should not throw if fourth param is an array', function () {
          expect(function () { λ(add, [1, 1], [1, 1], [1, 1]); }).to.not.throw();
        });
      });

      describe('repeat last function call times', function () {
        it('should throw if another "number" is passed after', function () {
          expect(function () { λ(add, [], [], 1, 1); }).to.throw(Error, 'λ: Repeat last function call times should be the last parameter!');
        });

        it('should throw if another "array" is passed after', function () {
          expect(function () { λ(add, [], [], 1, []); }).to.throw(Error, 'λ: Repeat last function call times should be the last parameter!');
        });

        it('should throw if another "object" is passed after', function () {
          expect(function () { λ(add, [], [], 1, {}); }).to.throw(Error, 'λ: Repeat last function call times should be the last parameter!');
        });
      });
    });

    describe('5th param', function () {
      describe('wrong types', function () {
        it('should throw if fifth param is "string"', function () {
          expect(function () { λ(add, [], [], [], 'test'); }).to.throw(TypeError, 'λ: 3rd, 4th, ... params can be either an array or a number!');
        });

        it('should throw if fifth param is "object"', function () {
          expect(function () { λ(add, [], [], [], {}); }).to.throw(TypeError, 'λ: 3rd, 4th, ... params can be either an array or a number!');
        });

        it('should throw if fifth param is "null"', function () {
          expect(function () { λ(add, [], [], [], null); }).to.throw(TypeError, 'λ: 3rd, 4th, ... params can be either an array or a number!');
        });

        it('should throw if fifth param is "NaN"', function () {
          expect(function () { λ(add, [], [], [], NaN); }).to.throw(Error, 'λ: Repeat last function call times should be a positive number!');
        });

        it('should throw if fifth param is "number" -1', function () {
          expect(function () { λ(add, [], [], [], -1); }).to.throw(Error, 'λ: Repeat last function call times should be a positive number!');
        });

        it('should throw if fifth param is "number" 0', function () {
          expect(function () { λ(add, [], [], [], 0); }).to.throw(Error, 'λ: Repeat last function call times should be a positive number!');
        });

        it('should throw if fifth param is "boolean" false', function () {
          expect(function () { λ(add, [], [], [], false); }).to.throw(TypeError, 'λ: 3rd, 4th, ... params can be either an array or a number!');
        });

        it('should throw if fifth param is "boolean" true', function () {
          expect(function () { λ(add, [], [], [], true); }).to.throw(TypeError, 'λ: 3rd, 4th, ... params can be either an array or a number!');
        });

        it('should throw if fifth param is "BigNumber"', function () {
          expect(function () { λ(add, [], [], [], new BigNumber(1)); }).to.throw(TypeError, 'λ: 3rd, 4th, ... params can be either an array or a number!');
        });
      });

      describe('correct types', function () {
        it('should not throw if fifth param is "undefined"', function () {
          expect(function () { λ(add, [1, 1], [1, 1], [1, 1], undefined); }).to.not.throw();
        });

        it('should not throw if fifth param is a positive number', function () {
          expect(function () { λ(add, [1, 1], [1, 1], [1, 1], 2); }).to.not.throw();
        });

        it('should not throw if fifth param is an array', function () {
          expect(function () { λ(add, [1, 1], [1, 1], [1, 1], [1, 1]); }).to.not.throw();
        });
      });

      describe('repeat last function call times', function () {
        it('should throw if another "number" is passed after', function () {
          expect(function () { λ(add, [], [], [], 1, 1); }).to.throw(Error, 'λ: Repeat last function call times should be the last parameter!');
        });

        it('should throw if another "array" is passed after', function () {
          expect(function () { λ(add, [], [], [], 1, []); }).to.throw(Error, 'λ: Repeat last function call times should be the last parameter!');
        });

        it('should throw if another "object" is passed after', function () {
          expect(function () { λ(add, [], [], [], 1, {}); }).to.throw(Error, 'λ: Repeat last function call times should be the last parameter!');
        });
      });
    });
  });

  it('should return a callable', function () {
    expect(function () { λ(add, [1, 1])(add, [1, 1]); }).to.not.throw();
  });

  describe('arithmetics tests', function () {
    it('0001', function () {
      λ( div, [6, 2] );
      expect(λ[0].toNumber()).to.equal(3);
    });

    it('0002', function () {
      λ( div, [6, 2], [10, 5] );
      expect(λ[0].toNumber()).to.equal(2);
    });

    it('0003', function () {
      λ( div, [6, 2], [10, 5], [12, 3] );
      expect(λ[0].toNumber()).to.equal(4);
    });

    it('0004', function () {
      λ( div, [6, 2] );
      λ( div, [6, 2] );
      expect(λ[0].toNumber()).to.equal(3);
    });

    it('0005', function () {
      λ( div, [6, 2], [10, 5] );
      λ( div, [6, 2], [10, 5] );
      expect(λ[0].toNumber()).to.equal(2);
    });

    it('0006', function () {
      λ( div, [6, 2], [10, 5], [12, 3] );
      λ( div, [6, 2], [10, 5], [12, 3] );
      expect(λ[0].toNumber()).to.equal(4);
    });

    it('0007', function () {
      λ( div, [6, 2] );
      λ( div, [21, 3] );
      expect(λ[1].toNumber()).to.equal(7);
    });

    it('0008', function () {
      λ( div, [6, 2], [10, 5] );
      λ( div, [21, 3], [90, 10] );
      expect(λ[1].toNumber()).to.equal(9);
    });

    it('0009', function () {
      λ( div, [6, 2], [10, 5], [12, 3] );
      λ( div, [21, 3], [90, 10], [20, 2] );
      expect(λ[1].toNumber()).to.equal(10);
    });

    /* ------------------------------------ */

    it('0010', function () {
      λ( div, [6, 2], [_, 1] );
      expect(λ[0].toNumber()).to.equal(3);
    });

    it('0011', function () {
      λ( div, [6, 2], [3, _] );
      expect(λ[0].toNumber()).to.equal(1);
    });

    it('0012', function () {
      λ( div, [6, 2], [3, _], [_, 2] );
      expect(λ[0].toNumber()).to.equal(0.5);
    });

    it('0013', function () {
      λ( div, [6, 2], [3, _], [4, _] );
      expect(λ[0].toNumber()).to.equal(4);
    });

    /* ------------------------------------ */

    it('0014', function () {
      λ( div, [6, 2], 1 );
      expect(λ[0].toNumber()).to.equal(3);
    });

    it('0015', function () {
      λ( div, [6, 2], 2 );
      expect(λ[0].toNumber()).to.equal(3);
    });

    it('0016', function () {
      λ( div, [6, 2], 3 );
      expect(λ[0].toNumber()).to.equal(3);
    });

    /* ------------------------------------ */

    it('0017', function () {
      λ( div, [48, 2], [_, 2], 1 );
      expect(λ[0].toNumber()).to.equal(12);
    });

    it('0018', function () {
      λ( div, [48, 2], [_, 2], 2 );
      expect(λ[0].toNumber()).to.equal(6);
    });

    it('0019', function () {
      λ( div, [48, 2], [_, 2], 3 );
      expect(λ[0].toNumber()).to.equal(3);
    });

    it('0020', function () {
      λ( div, [48, 2], [_, 2], 4 );
      expect(λ[0].toNumber()).to.equal(1.5);
    });

    /* ------------------------------------ */

    it('0021', function () {
      λ( div, [300, 293] )
       ( add, [λ[0], λ[0]], [_, λ[0]], 70 );

      expect(λ[1].toNumber()).to.equal(73.72013651877133);
    });

    it('0022', function () {
      λ( div, [300, 293] )
       ( add, [λ[0], λ[0]], [_, λ[0]], 70 );

      expect(λ[1].number).to.equal(73.72013651877133);
    });
  });
});
