const utils = require("./utils");

const determinePricing = (quantity, pricePer, location) => {
  const priceInCents = utils.normalizePricingToCents(pricePer);
  const taxRate = utils.determineTaxRate(location);
  const priceBeforeDiscountAndTax = quantity * priceInCents;

  const discountRate = 100 - utils.determineDiscount(priceBeforeDiscountAndTax);
  const totalPriceInCents =
    priceBeforeDiscountAndTax * (1 + taxRate) * (discountRate / 100);

  return utils.normalizePricingToDollars(totalPriceInCents);
};

module.exports = {
  determinePricing,
};
