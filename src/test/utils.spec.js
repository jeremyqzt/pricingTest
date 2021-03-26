const utils = require("../pricing/utils");
const constants = require("../pricing/constants");

const assert = require("assert");

describe("utils", () => {
  describe("normalizePricingToCents", () => {
    it(`Works on a dollar amount`, () => {
      assert(utils.normalizePricingToCents(1) == 100);
    });

    it(`Works on a negative dollar amount`, () => {
      assert(utils.normalizePricingToCents(-1) == -100);
    });

    it(`Works on a dollar and cents amount`, () => {
      assert(utils.normalizePricingToCents(1.23) == 123);
    });
  });

  describe("normalizePricingToDollars", () => {
    it(`Works on a dollar amount`, () => {
      assert(1.0 == utils.normalizePricingToDollars(100));
    });

    it(`Works on a negative dollar amount`, () => {
      assert(-1.0 == utils.normalizePricingToDollars(-100));
    });

    it(`Works on a dollar and cents amount`, () => {
      assert(1.23 == utils.normalizePricingToDollars(123));
    });
  });

  describe("determineTaxRate", () => {
    it(`Gets valid tax rates for all provinces`, () => {
      for (const [_, value] of Object.entries(constants.Locations)) {
        const taxRate = utils.determineTaxRate(value);
        assert(taxRate == constants.TaxRates[value]);
      }
    });
  });

  describe("determineDiscount", () => {
    it(`Correctly determines discounts at edges`, () => {
      const discountEdges = [1000, 5000, 7000, 10000];
      const expectedDiscountsPercentages = [3, 5, 7, 10];
      discountEdges.forEach((pricePoint, idx) => {
        const priceInCents = utils.normalizePricingToCents(pricePoint);
        assert(
          utils.determineDiscount(priceInCents) ==
            expectedDiscountsPercentages[idx]
        );
      });
    });

    it(`Correctly determines discounts at edges + 1`, () => {
      const discountEdges = [1001, 5001, 7001, 10001];
      const expectedDiscountsPercentages = [3, 5, 7, 10];
      discountEdges.forEach((pricePoint, idx) => {
        const priceInCents = utils.normalizePricingToCents(pricePoint);
        assert(
          utils.determineDiscount(priceInCents) ==
            expectedDiscountsPercentages[idx]
        );
      });
    });

    it(`Correctly determines discounts at edges - 1`, () => {
      const discountEdges = [999, 2999, 6999, 9999];
      const expectedDiscountsPercentages = [0, 3, 5, 7];
      discountEdges.forEach((pricePoint, idx) => {
        const priceInCents = utils.normalizePricingToCents(pricePoint);
        assert(
          utils.determineDiscount(priceInCents) ==
            expectedDiscountsPercentages[idx]
        );
      });
    });
  });
});
