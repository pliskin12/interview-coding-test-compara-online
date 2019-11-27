class Product {
  constructor(name, sellIn, price) {
    this.name = name;
    this.sellIn = sellIn;
    this.price = price;
  }

  updatePrice() {
    strategies.find((strategy) => {
      return strategyMap[this.name] ? strategyMap[this.name] === strategy.name : StandardStrategy;
    }).updatePrice(this);
  }
};

class PriceStrategy {
  constructor(name, action) {
    this.name = name;
    this.action = action;
  }

  updatePrice(product) {
    this.action(product);
  }
}

const StandardStrategy = new PriceStrategy('Standard', (product) => {
  if (product.price > 0 && product.sellIn > 0) {
    product.price = product.price - 1;
    product.sellIn--;
  } else if (product.price > 0 && product.sellIn === 0) {
    if (product.price >= 2) {
      product.price = product.price - (2)
    } else {
      product.price = 0;
    }
  }
});

const strategies = [
  StandardStrategy
];

const strategyMap = {
  'Low Coverage': 'Standard'
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
