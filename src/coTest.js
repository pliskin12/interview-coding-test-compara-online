class Product {
  constructor(name, sellIn, price) {
    this.name = name;
    this.sellIn = sellIn;
    this.price = price;
  }

  getVariationRate() { return -1; }

  updatePrice() {
    if (this.price > 0 && this.sellIn > 0) {
      this.price = this.price + this.getVariationRate();
      this.sellIn--;
    } else if (this.price > 0 && this.sellIn === 0) {
      if (this.price >= 2) {
        this.price = this.price + (2 * this.getVariationRate())
      } else {
        this.price = 0;
      }
    }
  }
}

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
