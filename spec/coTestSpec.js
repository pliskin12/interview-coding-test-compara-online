const expect = require('chai').expect;

const coTest = require('../src/coTest');
const CarInsurance = coTest.CarInsurance;
const Product = coTest.Product;

describe("Co Test", function() {

  it("should update the price of a product named foo (common) of price 0 and 0 days to sellIn", function() {
    const coTest = new CarInsurance([ new Product("foo", 0, 0) ]);
    const products = coTest.updatePrice();
    expect(products[0].name).equal("foo");
    expect(products[0].price).equal(0);
  });

  it("should decrease the price of a 'Low Coverage' by one until sellIn and twice as fast after", function() {
    const coTest = new CarInsurance([ new Product("Low Coverage", 3, 10) ]);
    const expectedPrice = [9, 8, 7, 5, 3, 1, 0, 0, 0]
    for (let day = 0; day < expectedPrice.length; day++) {
      const products = coTest.updatePrice();
      expect(products[0].name).equal("Low Coverage");
      expect(products[0].price).equal(expectedPrice[day]);
    }
  });

  it("should decrease the price of a 'Medium Coverage' by one until sellIn and twice as fast after", function() {
    const coTest = new CarInsurance([ new Product("Medium Coverage", 3, 10) ]);
    const expectedPrice = [9, 8, 7, 5, 3, 1, 0, 0, 0]
    for (let day = 0; day < expectedPrice.length; day++) {
      const products = coTest.updatePrice();
      expect(products[0].name).equal("Medium Coverage");
      expect(products[0].price).equal(expectedPrice[day]);
    }
  });

  it("should increase the price of a 'Full Coverage' by one until sellIn and twice as fast after", function() {
    const coTest = new CarInsurance([ new Product("Full Coverage", 3, 40) ]);
    const expectedPrice = [41, 42, 43, 45, 47, 49, 50, 50, 50]
    for (let day = 0; day < expectedPrice.length; day++) {
      const products = coTest.updatePrice();
      expect(products[0].name).equal("Full Coverage");
      expect(products[0].price).equal(expectedPrice[day]);
    }
  });

  it("should increase the price of a 'Full Coverage' by one until sellIn and twice as fast after", function() {
    const coTest = new CarInsurance([ new Product("Full Coverage", 3, 39) ]);
    const expectedPrice = [40, 41, 42, 44, 46, 48, 50]
    for (let day = 0; day < expectedPrice.length; day++) {
      const products = coTest.updatePrice();
      expect(products[0].name).equal("Full Coverage");
      expect(products[0].price).equal(expectedPrice[day]);
    }
  });

  it("should increase the price of a 'Special Full Coverage' by variable boost", function() {
    const coTest = new CarInsurance([ new Product("Special Full Coverage", 12, 25) ]);
    const expectedPrice = [26, 27, 29, 31, 33, 35, 37, 40, 43, 46, 49, 50, 0, 0, 0]
    for (let day = 0; day < expectedPrice.length; day++) {
      const products = coTest.updatePrice();
      expect(products[0].name).equal("Special Full Coverage");
      expect(products[0].price).equal(expectedPrice[day]);
    }
  });

  
});
