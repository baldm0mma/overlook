import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);
import AllServices from '../src/AllServices';
import customerTestData from '../src/testData/TestData';
// import domUpdates from "../src/domUpdates";
// chai.spy.on(domUpdates, 'updateScore', () => true);
// chai.spy.on(domUpdates, 'turnPrompt', () => true);

describe('AllServices', function() {

  let allServices;

  beforeEach(function() {
    allServices = new AllServices();

  });

  it('should be a function', function() {
    expect(AllServices).to.be.a('function');
  });

  it('should be an instance of AllServices', function() {
    expect(allServices).to.be.an.instanceof(AllServices);
  });

  it('should have a method that returns a user object when given a search parameter of a name, or ID, and, should return "null" if the user does not exsist', function() {
    expect(allServices.searchForSpecificUser('Autumn')).to.be.an('object');
    expect(allServices.searchForSpecificUser('1')).to.be.an('object');
    expect(allServices.searchForSpecificUser('Jev')).to.equal(null);
  });

});