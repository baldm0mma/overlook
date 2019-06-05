import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);
import Bookings from '../src/Bookings';
import testBookings from '../src/testData/bookings-data';

describe('Bookings', function() {

  let booking;

  beforeEach(function() {
    booking = new Bookings(testBookings, 5, '03/03/3003', 202);

  });

  it('should be a function', function() {
    expect(Bookings).to.be.a('function');
  });

  it('should be an instance of Bookings', function() {
    expect(booking).to.be.an.instanceof(Bookings);
  });

  it('should have a property that stores all current bookings', function() {
    expect(booking.bookings.length).to.equal(20);
  });

  it('should have a property that stores current user id', function() {
    expect(booking.userID).to.equal(5);
  });

  it('should have a property that stores current date', function() {
    expect(booking.date).to.equal('03/03/3003');
  });

  it('should have a property that stores current room number', function() {
    expect(booking.roomNumber).to.equal(202);
  });

  it('should have a method that generates the most popular booking date', function() {
    expect(booking.generateMostPopularBookingDate()).to.equal('21/08/2019');
  });

});