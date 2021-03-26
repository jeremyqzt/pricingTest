const { determinePricing } = require("../pricing");
const { Locations, Precision } = require("../pricing/constants");
const utils = require("../pricing/utils");

const assert = require("assert");

describe("pricing", () => {
  it("calculates a simple example 1", () => {
    const price = determinePricing(500, 1, "ON");
    const expectedPrice = "565.00";

    assert(expectedPrice === price);
  });

  it("calculates a simple example 2", () => {
    const price = determinePricing(3600, 2.25, "MI");
    const expectedPrice = "7984.98";
    assert(expectedPrice === price);
  });

  it("calculates pricing with correct tax", () => {
    const quantity = 100;
    const price = 9;

    const priceBeforeTax = quantity * price;

    for (const [_, value] of Object.entries(Locations)) {
      const taxMultiplier = 1 + utils.determineTaxRate(value);
      assert(
        (taxMultiplier * priceBeforeTax).toFixed(Precision) ==
          determinePricing(quantity, price, value)
      );
    }
  });

  it("calculates pricing with correct tax and discount", () => {
    const quantity = 100;
    const prices = [10, 30, 70, 100];

    prices.forEach((price) => {
      const priceBeforeTaxAndDiscount = quantity * price;

      for (const [_, value] of Object.entries(Locations)) {
        const taxMultiplier = 1 + utils.determineTaxRate(value);
        const discountPercent = utils.determineDiscount(
          priceBeforeTaxAndDiscount * 100
        );
        const priceBeforeTax =
          priceBeforeTaxAndDiscount * ((100 - discountPercent) / 100);
        assert(
          (taxMultiplier * priceBeforeTax).toFixed(Precision) ==
            determinePricing(quantity, price, value)
        );
      }
    });
  });
});
