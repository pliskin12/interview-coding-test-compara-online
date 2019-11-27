const Utils = require('./util');

class PriceStrategy {
  constructor(name, action) {
    this.name = name;
    this.action = action;
  }

  updatePrice(product) {
    this.action(product);
  }
}

const variatePrice = (product, variationRate, limit, comparePriceToLimit) => {
  if (product.sellIn > 0) {
    product.price = product.price + variationRate;
    product.sellIn--;
  } else if (product.sellIn === 0) {
    product.price = comparePriceToLimit(product.price, limit - 2*variationRate) ? product.price + 2*variationRate : limit;
  }
}

const DescendingStrategy = new PriceStrategy('Descending', (product) => {
  let variationRate = -1;
  let limit = 0;
  let dueDay = 0;
  let whenDueBoostBy = 2;
  return variatePrice(product, variationRate, limit, Utils.greaterThan);
});

const AscendingStrategy = new PriceStrategy('Ascending', (product) => {
  let variationRate = 1;
  let limit = 50;
  let dueDay = 0;
  let whenDueBoostBy = 2;
  return variatePrice(product, variationRate, limit, Utils.lessThan);
});

const SpecialStrategy = new PriceStrategy('Special', (product) => {
  let variationRate = 1;
  let limit = 50;
  if (product.sellIn === 0) {
    product.price = 0;
    product.sellIn--;
  }
  else {
    if (product.sellIn > 10 ) {
      variatePrice(product, variationRate, limit, Utils.lessThan);
    } else if (product.sellIn <= 10 && product.sellIn > 5) {
      variationRate = 2;
      variatePrice(product, variationRate, limit, Utils.lessThan);
    } else if (product.sellIn <= 5) {
      variationRate = 3;
      variatePrice(product, variationRate, limit, Utils.lessThan);
    }
    if (product.price > limit) product.price = limit;
  }
});

const Strategies = [
  DescendingStrategy,
  AscendingStrategy,
  SpecialStrategy
];

const StrategyMap = {
  'Low Coverage': 'Descending',
  'Full Coverage': 'Ascending',
  'Special Full Coverage': 'Special'
};

module.exports = {
  Strategies,
  StrategyMap,
  DescendingStrategy,
  AscendingStrategy
}
