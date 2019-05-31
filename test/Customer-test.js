import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);
import Customer from '../src/Customer';
// import  from '../src/testData/TestData';
// import domUpdates from "../src/domUpdates";
// chai.spy.on(domUpdates, 'updateScore', () => true);
// chai.spy.on(domUpdates, 'turnPrompt', () => true);

describe('Customer', function() {

  let customer;

  beforeEach(function() {
    customer = new Customer('Jev', );

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
    expect(customer.id).to.equal(11);
  });

});