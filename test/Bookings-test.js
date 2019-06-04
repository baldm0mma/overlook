import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);
import Bookings from '../src/Bookings';
import testBookings from '../src/testData/bookings-data';

describe('Bookings', function() {

  let booking;

  beforeEach(function() {
    booking = new Bookings(testBookings);

  });

  it('should be a function', function() {
    expect(Bookings).to.be.a('function');
  });

  it('should be an instance of Bookings', function() {
    expect(booking).to.be.an.instanceof(Bookings);
  });

  it('should have a method that ')

});