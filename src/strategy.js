class PriceStrategy {
  constructor(name, action) {
    this.name = name;
    this.action = action;
  }

  updatePrice(product) {
    this.action(product);
  }
}

const DescendingStrategy = new PriceStrategy('Descending', (product) => {
  let variationRate = -1;
  let limit = 0;
  if (product.sellIn > 0) {
    product.price = product.price + variationRate;
  } else {
    product.price = product.price > limit - 2*variationRate ? product.price + 2*variationRate : limit;
  }
  product.sellIn--;
});

const AscendingStrategy = new PriceStrategy('Ascending', (product) => {
  let variationRate = 1;
  let limit = 50;
  if (product.sellIn > 0) {
    product.price = product.price + variationRate;
  } else {
    product.price = product.price < limit - 2*variationRate ? product.price + 2*variationRate : limit;
  }
  product.sellIn--;
});

const SpecialStrategy = new PriceStrategy('Special', (product) => {
  let variationRate = 1;
  let limit = 50;
  if (product.sellIn <= 0) {
    product.price = 0;
    product.sellIn--;
  }
  else {
    if (product.sellIn <= 10 && product.sellIn > 5) {
      variationRate = 2;
    } else if (product.sellIn <= 5) {
      variationRate = 3;
    }
    product.price = product.price + variationRate;
    if (product.price > limit) product.price = limit;
    product.sellIn--;
  }
});

const MegaStrategy = new PriceStrategy('Mega', () => {});

const SuperStrategy = new PriceStrategy('Super', (product) => {
  let variationRate = -2;
  let limit = 0;
  if (product.sellIn > 0) {
    product.price = product.price + variationRate;
  } else {
    product.price = product.price > limit - 2*variationRate ? product.price + 2*variationRate : limit;
  }
  product.sellIn--;
});

const Strategies = [
  DescendingStrategy,
  AscendingStrategy,
  SpecialStrategy,
  MegaStrategy,
  SuperStrategy
];

const StrategyMap = {
  'Low Coverage': 'Descending',
  'Medium Coverage': 'Descending',
  'Full Coverage': 'Ascending',
  'Special Full Coverage': 'Special',
  'Mega Coverage': 'Mega',
  'Super Sale': 'Super'
};

module.exports = {
  Strategies,
  StrategyMap,
  DescendingStrategy,
  AscendingStrategy
}
