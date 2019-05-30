import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);
import Customer from '../src/Customer';
import customerTestData from '../src/testData/CustomerTestData';
// import domUpdates from "../src/domUpdates";
// chai.spy.on(domUpdates, 'updateScore', () => true);
// chai.spy.on(domUpdates, 'turnPrompt', () => true);

describe('Customer', function() {

  let customer;

  beforeEach(function() {
    customer = new Customer('Jev', 1, customerTestData);

  });

  it('should be a function', function() {
    expect(Customer).to.be.a('function');
  });

  it('should be an instance of Customer', function() {
    expect(customer).to.be.an.instanceof(Customer);
  });

  it('should have a property that stores a user\'s name', function() {
    expect(customer.name).to.equal('Jev');
  });

  it('should have a property that stores a user\'s ID', function() {
    expect(customer.id).to.equal(1);
  });

  it('should have a method that returns a user object when given a search parameter of a name, or ID, and, should return "null" if the user does not exsist', function() {
    // console.log(customerTestData);
    expect(customer.searchForSpecificUser('Autumn')).to.be.an('object');
    expect(customer.searchForSpecificUser('1')).to.be.an('object');
    expect(customer.searchForSpecificUser('Jev')).to.equal(null);
  });

});