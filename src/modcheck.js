const weightTable = require('./valacdos').table;

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
    if (parseInt(this.accountNumber) === 0 || parseInt(this.sortCode) === 0) {
      return false;
    }

    let results = [];
    const checks = this.weightTable.filter(function (check) {
      const sortCode  = parseInt(this.sortCode);
      const start     = parseInt(check.sortCodeRange.start);
      const end       = parseInt(check.sortCodeRange.end);

      return (sortCode >= start && sortCode <= end);
    }, this);

    checks.forEach((check) => {
      this.currentCheck = check;

      this.weight = Object.keys(check.weight).reduce((prev, cur) => {
        return prev + check.weight[cur].toString();
      }, '');

      switch (check.algorithm) {
        case 'DBLAL':
          if (this.currentCheck.exception == 3 && (String(this.accountNumber).charAt(2) != 6 && String(this.accountNumber).charAt(2) != 9)) {
            results.push(this.dblAlCheck());
          }
          break;
        case 'MOD10':
          results.push(this.mod10Check());
          break;
        case 'MOD11':
          results.push(this.mod11Check());
          break;
      }
    });

    // One fail causes entire check to fail
    const passed = results.reduce((prev, cur) => {
      return cur !== true ? false : prev;
    }, true);

    return passed;
  }

  dblAlCheck() {
    const account = this.sortCode + this.accountNumber;
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
     account = this.sortCode + this.accountNumber;
    let weightedAccount = [];

    for (let i = 0; i < 14; i++) {
      weightedAccount[i] = parseInt(account[i]) * parseInt(this.weight[i]);
    }

    let sum = weightedAccount.reduce((prev, curr) => parseInt(prev) + parseInt(curr));

    return sum % 10 === 0;
  }

  mod11Check() {
    const account = this.sortCode + this.accountNumber;
    let weightedAccount = [];

    for (let i = 0; i < 14; i++) {
      weightedAccount[i] = parseInt(account[i]) * parseInt(this.weight[i]);
    }

    let sum = weightedAccount.reduce((prev, curr) => parseInt(prev) + parseInt(curr));

    return sum % 11 === 0;
  }
}
