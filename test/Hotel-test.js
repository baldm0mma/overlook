import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);
import Hotel from '../src/Hotel';
import customerTestData from '../src/testData/TestData';
// import domUpdates from "../src/domUpdates";
// chai.spy.on(domUpdates, 'updateScore', () => true);
// chai.spy.on(domUpdates, 'turnPrompt', () => true);

describe('Hotel', function() {

  let hotel;

  beforeEach(function() {
    hotel = new Hotel();

  });

  it('should be a function', function() {
    expect(Hotel).to.be.a('function');
  });

  it('should be an instance of Hotel', function() {
    expect(hotel).to.be.an.instanceof(Hotel);
  });

  it('should have a method that returns a user object when given a search parameter of a name, or ID, and, should return "null" if the user does not exsist', function() {
    expect(hotel.searchForSpecificUser('Autumn')).to.be.an('object');
    expect(hotel.searchForSpecificUser('1')).to.be.an('object');
    expect(hotel.searchForSpecificUser('Jev')).to.equal(null);
  });

});