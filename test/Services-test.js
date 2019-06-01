import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);
import Services from '../src/Services';
import customerTestData from '../src/testData/TestData';
// import domUpdates from "../src/domUpdates";
// chai.spy.on(domUpdates, 'updateScore', () => true);
// chai.spy.on(domUpdates, 'turnPrompt', () => true);

describe('Services', function() {

  let services;

  beforeEach(function() {
    services = new Services();

  });

  it('should be a function', function() {
    expect(Services).to.be.a('function');
  });

  it('should be an instance of Services', function() {
    expect(services).to.be.an.instanceof(Services);
  });

  it('should have a method that returns a user object when given a search parameter of a name, or ID, and, should return "null" if the user does not exsist', function() {
    expect(services.searchForSpecificUser('Autumn')).to.be.an('object');
    expect(services.searchForSpecificUser('1')).to.be.an('object');
    expect(services.searchForSpecificUser('Jev')).to.equal(null);
  });

});