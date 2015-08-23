let assert = require('chai').assert
  , expect = require('chai').expect
  , Modcheck = require('../build/modcheck')
  , should = require('chai').should()

describe('Modcheck', function () {
  it('should be an object', function () {
    let modcheck = new Modcheck;
    assert.isObject(modcheck);
  });

  it('should be an instance of Modcheck', function () {
    let modcheck = new Modcheck;
    assert.instanceOf(modcheck, Modcheck);
  });

  describe('weight table', function () {
    it('should be a property of Modcheck', function () {
      let modcheck = new Modcheck;
      assert.property(modcheck, 'weightTable');
    });

    it('should have be an array', function () {
      let modcheck = new Modcheck;
      assert.isArray(modcheck.weightTable);
    });

    it('should have table fields as properties', function () {
      let row = (new Modcheck).weightTable[0];
      assert.property(row, 'sortCodeRange');
      assert.property(row, 'algorithm');
      assert.property(row, 'weight');
      assert.property(row, 'exception');
    });
  });

  describe('check()', function () {
    it('should be a method of Modcheck', function () {
      let modcheck = new Modcheck('00000000', '00-00-00');
      assert.isFunction(modcheck.check);
    });

    it('should return a boolean', function () {
      let modcheck = new Modcheck('00000000', '00-00-00');
      assert.isBoolean(modcheck.check());
    });

    describe('result', function () {
      it('should be a fail for 00000000 / 00-00-00', function () {
        let modcheck = new Modcheck('00000000', '00-00-00');
        assert.isFalse(modcheck.check());
      });

      it('should be a pass for 66374958 / 08-99-99', function () {
        let modcheck = new Modcheck('66374958', '08-99-99');
        assert.isTrue(modcheck.check());
      });

      it('should be a fail for 66374959 / 08-99-99', function () {
        let modcheck = new Modcheck('66374959', '08-99-99');
        assert.isFalse(modcheck.check());
      });
    });
  });

  describe('account number', function () {
    it('should be a public property', function () {
      let modcheck = new Modcheck;
      assert.property(modcheck, 'accountNumber');
    });

    it('should be settable via the constructor', function () {
      let modcheck = new Modcheck('00000000', '00-00-00');
      assert.propertyVal(modcheck, 'accountNumber', '00000000');
    });

    it('should be a string', function () {
      let modcheck = new Modcheck('00000000', '00-00-00');
      assert.isString(modcheck.accountNumber);
    });

    it('should not be a number', function () {
      let modcheck = new Modcheck('00000000', '00-00-00');
      assert.isNotNumber(modcheck.accountNumber);
    });
  });

  describe('sort code', function () {
    it('should be a public property', function () {
      let modcheck = new Modcheck;
      assert.property(modcheck, 'sortCode');
    });

    it('should be settable via the constructor', function () {
      let modcheck = new Modcheck('00000000', '00-00-00');
      assert.propertyVal(modcheck, 'sortCode', '000000');
    });

    it('should be a string', function () {
      let modcheck = new Modcheck('00000000', '00-00-00');
      assert.isString(modcheck.sortCode);
    });

    it('should not be a number', function () {
      let modcheck = new Modcheck('00000000', '00-00-00');
      assert.isNotNumber(modcheck.sortCode);
    });
  });
});
