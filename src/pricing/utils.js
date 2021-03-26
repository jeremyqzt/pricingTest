const constants = require("./constants.js");

const determineDiscount = (amountInCents) => {
  const discounts = constants.DiscountThreshholds;

  const minimumDiscount = 0;

  const ret = discounts.find((item) => amountInCents >= item.amountInCents);
  return ret ? ret.discountPercent : minimumDiscount;
};

const determineTaxRate = (locat) => {
  const taxRateMap = constants.TaxRates;
  return taxRateMap[locat];
};

// Converts to cents
const normalizePricingToCents = (price) => {
  return Math.round(price * 100);
};

// Converts to dollars
const normalizePricingToDollars = (priceInCents) => {
  return (Math.round(priceInCents) / 100).toFixed(constants.Precision);
};

module.exports = {
  determineDiscount,
  determineTaxRate,
  normalizePricingToCents,
  normalizePricingToDollars,
};
