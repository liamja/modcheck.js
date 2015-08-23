# modcheck.js [![Build Status](https://travis-ci.org/liamja/modcheck.js.svg?branch=master)](https://travis-ci.org/liamja/modcheck.js)

A Javascript library to check a UK bank account number against a sort code using [VocaLink's modulus check](https://www.vocalink.com/customer-support/modulus-checking/).


### :warning: Warning

A passing modulus check **does not** mean that an account number and sort code exists and is registered to an account holder; it merely confirms the possiblity of an account number being valid for a given sort code.


## Building

`npm run build`


## Testing

`npm test`


## Using

Basic usage in a node.js script:

```js
var Modcheck = require('modcheck');

var modcheck = new Modcheck('66374958', '08-99-99');

if (modcheck.check()) {
  console.log('This account number could be potentially be registered to this sort code.');
} else {
  console.log('This account number could NOT be registered to this sort code.');
}
```


## Resources

- [valacdos.txt](https://www.vocalink.com/media/1518/valacdos.txt)
- [scsubtab.txt](https://www.vocalink.com/media/1517/scsubtab.txt)
- [Modulus Check Specification](http://www.vocalink.com/media/700427/vocalink_-_validating_account_numbers_v3.20.pdf)

## Other Implementations

- [Ruby (by Baris Balic)](https://github.com/barisbalic/modulus)
- [Ruby (by Hayden Ball)](https://github.com/ball-hayden/uk_account_validator)
- [C# (by Rat Cow Software)](https://code.google.com/p/ratcowsoftopensource/source/browse/trunk/ratcowutilities/RatCow.UKBankAccValidator/?r=81)
