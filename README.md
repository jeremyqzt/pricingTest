# Pricing Problem

This is a sample price calculation function which will calculate a `price` = `price_per_unit` \* `num_units`.

Discounts will be applied to the `price` at the following rates:

| Total Price | Discount Rate |
| ----------- | ------------- |
| 1000        | 3%            |
| 5000        | 5%            |
| 7000        | 7%            |
| 10000       | 10%           |

After discounts are applied, a tax is applied based on the given `location`, the valid locations options and corresponding tax rates are as followed:

| Location | Tax Rate |
| -------- | -------- |
| AB       | 5%       |
| ON       | 13%      |
| QC       | 14.975%  |
| MI       | 6%       |
| DE       | 0%       |

# Usage

Assumed to be an internal library, define your modules in `./src` and import as follows

```
const { determinePricing } = require("./pricing");
```

The function can be called using the following paramters, note that location must be one of the locations specified above

```
const priceAfterDiscountAndTax = determinePricing(<quantity>, <unit_price>, <location>)
```

# Setup

The only dev-dependency is `mocha` which is used for testing. Please use the `npm` and `node` versions specified in `package.json`.

```
npm install

```

# Testing

run using

```
npm run test

// Alternatively, install mocha and run directly
// node_modules/mocha/bin/mocha ./src/test/*.js
```
