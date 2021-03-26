const Locations = Object.freeze({
  AB: "AB",
  ON: "ON",
  QC: "QC",
  MI: "MI",
  DE: "DE",
});

const TaxRates = {
  [Locations.AB]: 0.05,
  [Locations.ON]: 0.13,
  [Locations.QC]: 0.14975,
  [Locations.MI]: 0.06,
  [Locations.DE]: 0,
};

// Biggest discount to smallest
const DiscountThreshholds = [
  {
    amountInCents: 10000 * 100,
    amountInDollars: 10000,
    discountPercent: 10,
  },
  {
    amountInCents: 7000 * 100,
    amountInDollars: 7000,
    discountPercent: 7,
  },
  {
    amountInCents: 3000 * 100,
    amountInDollars: 3000,
    discountPercent: 5,
  },
  {
    amountInCents: 1000 * 100,
    amountInDollars: 1000,
    discountPercent: 3,
  },
];

module.exports = {
  Locations,
  DiscountThreshholds,
  TaxRates,
  Precision: 2,
};
