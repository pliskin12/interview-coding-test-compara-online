
const Strategy = require('./strategy');
const Strategies = Strategy.Strategies;
const StrategyMap = Strategy.StrategyMap;
const StandardStrategy = Strategy.DescendingStrategy;

class Product {
  constructor(name, sellIn, price) {
    this.name = name;
    this.sellIn = sellIn;
    this.price = price;
  }

  updatePrice() {
    let stratForProduct = Strategies.find((strategy) => {
      return StrategyMap[this.name] === strategy.name;
    }) || StandardStrategy;

    stratForProduct.updatePrice(this);
  }
};

class CarInsurance {
  constructor(products = []) {
    this.products = products;
  }
  updatePrice() {
    this.products.forEach((product) => {
      product.updatePrice();
    })
    return this.products;
  }
}

module.exports = {
  Product,
  CarInsurance
}
