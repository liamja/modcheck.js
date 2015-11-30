let weightTable = require('./valacdos').table;

export default class Modcheck {
  constructor(accountNumber, sortCode) {
    this.accountNumber = accountNumber;
    this.sortCode = sortCode;
    this.weightTable = weightTable;
    this.currentCheck = null;

    if (typeof this.sortCode === 'string' || this.sortCode instanceof String) {
      this.sortCode = this.sortCode.replace(/-/g, '');
    }
  }

  check() {
    if (parseInt(this.accountNumber) === 0 || parseInt(this.sortCode) === 0
    ) {
      return false;
    }

    let results = [];
    let checks = this.weightTable.filter(function (check) {
      let sortCode  = parseInt(this.sortCode)
        , start     = parseInt(check.sortCodeRange.start)
        , end       = parseInt(check.sortCodeRange.end);

      return (sortCode >= start && sortCode <= end);
    }, this);

    checks.forEach(function (check) {
      this.currentCheck = check;

      this.weight = Object.keys(check.weight).reduce(function (prev, cur) {
        return prev + check.weight[cur].toString();
      }, '');

      switch (check.algorithm) {
        case 'DBLAL':
          results.push(this.dblAlCheck());
          break;
        case 'MOD10':
          results.push(this.mod10Check());
          break;
        case 'MOD11':
          results.push(this.mod11Check());
          break;
      }
    }, this);

    // One fail causes entire check to fail
    let passed = results.reduce(function (prev, cur) {
      return cur !== true ? false : prev;
    }, true);

    return passed;
  }

  dblAlCheck() {
    if (this.accountNumber[2] == 6 || this.accountNumber[2] == 9) {
      return true;
    }

    let account = this.sortCode + this.accountNumber;
    let weightedAccount = [];

    for (let i = 0; i < 14; i++) {
      weightedAccount[i] = parseInt(account[i]) * parseInt(this.weight[i]);
    }

    weightedAccount = weightedAccount.join('').split('');

    let sum = weightedAccount.reduce((a, b) => parseInt(a) + parseInt(b));

    if (this.currentCheck.exception == 1)
    {
      sum += 27;
    }

    return sum % 10 === 0;
  }

  mod10Check() {
    let account = this.sortCode + this.accountNumber;
    let weightedAccount = [];

    for (let i = 0; i < 14; i++) {
      weightedAccount[i] = parseInt(account[i]) * parseInt(this.weight[i]);
    }

    let sum = weightedAccount.reduce((a, b) => parseInt(a) + parseInt(b));

    return sum % 10 === 0;
  }

  mod11Check() {
    let account = this.sortCode + this.accountNumber;
    let weightedAccount = [];

    for (let i = 0; i < 14; i++) {
      weightedAccount[i] = parseInt(account[i]) * parseInt(this.weight[i]);
    }

    let sum = weightedAccount.reduce((a, b) => parseInt(a) + parseInt(b));

    return sum % 11 === 0;
  }
}
