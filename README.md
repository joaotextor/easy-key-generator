# Easy Key Generator

## What is this package for?

Do you want to be able to generate random codes/keys to use in your application?
This library enables you just that.

### Key formats

With easy-key-generator you can generate keys like these:

`SBWPR-G6NOE-ZAQBO` (Letters and Numbers)

`26960-74535-48967-85294` (Numbers Only)

`YUNIE-QHQDT` (Letters Only)

`A37B1-7733F-CBC20` (Using Hexadecimal characters)

## Quick setup

```
npm install easy-key-generator
```

## Import

```js
const KeyGenerator = require("easy-key-generator");

or

import KeyGenerator from "easy-key-generator";
```

## Setup

```js
const myKeyGenerator = new KeyGenerator(5); // Setup to generate a 5 character key

const generatedKey = myKeyGenerator.generate();

console.log(generatedKey); // ["H52N4"]
```

Alternatively, you can use:

```js
const generatedKey = new KeyGenerator(5).generate();
```

## Special Properties

These are the optional properties you can pass as a second parameter to the constructor:

> `charaterType`

> `groups` 

> `groupSeparator` 

> `groupFormat` 

> `numberOfKeys`

`characterType` can only be assigned with the following values:`"Letters"`, `"Numbers"`, `"LettersAndNumbers"` (default), `"HexChar"`

`separatorType` can only be assigned with the following values: `"-"` (default), `"_"`, `"/"` `"."` and `" "`.

## Implementing `props`

```js
const props = {
  characterType: "LettersAndNumbers", //Default is LettersAndNumbers
  groups: 3, // Default is 1
  groupSeparator: "-", // Default is "-"
  groupFormat: "LLNLN", // L: Letters | N: Numbers,
  numberOfKeys: 10, // Default is 1
};

const myKeys = new KeyGenerator(5, props).generate();

console.log(myKeys);
/* Will Output and array of 10 keys
 * containing 3 groups with the group
 * format LLNLN and using letters
 * and numbers
[
  'JO7I5-PN2U3-DA5Y4',
  'NK7S1-CS6F7-IE4T5',
  'AA1G1-QP3S3-BF1Q8',
  'WB5A8-ZN1J0-SO9Z0',
  'YT6C8-YU1Z5-PG2Y0',
  'OM7H1-TG5S7-GF9O4',
  'IR1F5-WY3B9-RM8A0',
  'CX9Q9-CO5W2-RE8H6',
  'ON6T5-IH1T1-XC0W7',
  'PX8M9-KK6H8-DY5D2'
]
*/
```
