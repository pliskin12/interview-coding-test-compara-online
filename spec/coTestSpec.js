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

  it("should update the price of a 'Low Coverage' by one until sellIn and twice as fast after", function() {
    const coTest = new CarInsurance([ new Product("Low Coverage", 3, 10) ]);
    const expectedPrice = [9, 8, 7, 5, 3, 1, 0]
    for (let day = 0; day < expectedPrice.length; day++) {
      const products = coTest.updatePrice();
      expect(products[0].name).equal("Low Coverage");
      expect(products[0].price).equal(expectedPrice[day]);
    }
  });

  

});
