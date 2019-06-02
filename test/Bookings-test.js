import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);
import Bookings from '../src/Bookings';
import { users, rooms, bookings, roomServices } from '../src/testData/TestData';

describe('Bookings', function() {

  let booking;

  beforeEach(function() {
    booking = new Bookings({ users, rooms, bookings, roomServices }.bookings);

  });

  it('should be a function', function() {
    expect(Bookings).to.be.a('function');
  });

  it('should be an instance of Bookings', function() {
    expect(booking).to.be.an.instanceof(Bookings);
  });

  it('should have a method that ')

});