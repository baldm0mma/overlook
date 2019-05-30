import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);
import AllCustomers from '../src/AllCustomers';
import customerTestData from '../src/testData/TestData';
// import domUpdates from "../src/domUpdates";
// chai.spy.on(domUpdates, 'updateScore', () => true);
// chai.spy.on(domUpdates, 'turnPrompt', () => true);

describe('AllCustomers', function() {

  let allCustomers;

  beforeEach(function() {
    allCustomers = new AllCustomers(customerTestData);

  });

  it('should be a function', function() {
    expect(AllCustomers).to.be.a('function');
  });

  it('should be an instance of AllCustomers', function() {
    expect(allCustomers).to.be.an.instanceof(AllCustomers);
  });

  it('should have a method that returns a user object when given a search parameter of a name, or ID, and, should return "null" if the user does not exsist', function() {
    // console.log(AllCustomersTestData);
    expect(allCustomers.searchForSpecificUser('Autumn')).to.be.an('object');
    expect(allCustomers.searchForSpecificUser('1')).to.be.an('object');
    expect(allCustomers.searchForSpecificUser('Jev')).to.equal(null);
  });

});