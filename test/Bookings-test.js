import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);
import Bookings from '../src/Bookings';
import customerTestData from '../src/testData/TestData';
// import domUpdates from "../src/domUpdates";
// chai.spy.on(domUpdates, 'updateScore', () => true);
// chai.spy.on(domUpdates, 'turnPrompt', () => true);

describe('Bookings', function() {

  let bookings;

  beforeEach(function() {
    bookings = new Bookings();

  });

  it('should be a function', function() {
    expect(Bookings).to.be.a('function');
  });

  it('should be an instance of Bookings', function() {
    expect(bookings).to.be.an.instanceof(Bookings);
  });

  it('should have a method that returns a user object when given a search parameter of a name, or ID, and, should return "null" if the user does not exsist', function() {
    expect(bookings.searchForSpecificUser('Autumn')).to.be.an('object');
    expect(bookings.searchForSpecificUser('1')).to.be.an('object');
    expect(bookings.searchForSpecificUser('Jev')).to.equal(null);
  });

});