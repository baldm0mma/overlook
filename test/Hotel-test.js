import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);
import Hotel from '../src/Hotel';
import testUsers from '../src/testData/users-data';
import testRooms from '../src/testData/rooms-data';
import testBookings from '../src/testData/bookings-data';
import testRoomServices from '../src/testData/roomServices-data';

describe('Hotel', function() {

  let hotel;

  beforeEach(function() {
    hotel = new Hotel(testUsers, testRooms, testBookings, testRoomServices, "05/10/2019");

  });

  it('should be a function', function() {
    expect(Hotel).to.be.a('function');
  });

  it('should be an instance of Hotel', function() {
    expect(hotel).to.be.an.instanceof(Hotel);
  });

  it('should have a method that returns and array of all the bookings for a date', function() {
    expect(hotel.bookingsByDate(hotel.today).length).to.eql(1);
  });

  it('should have a method that generates an array of available room numbers for a date', function() {
    expect(hotel.generateAvailableRoomNumbersByDate(hotel.today).length).to.equal(19);
  });

  it('should have a method that generates an array of booked rooms for a date', function() {
    expect(hotel.generateBookedRoomNumbersByDate(hotel.today).length).to.equal(1);
  });

  it('should have a method that generates an array of booked rooms for a date and room type', function() {
    expect(hotel.generateRoomByType('suite', hotel.today).length).to.equal(1);
  });

  it('should have a method that generates an array of room objects, either that are available or that are booked', function() {
    expect(hotel.generateFullRoomInformation("available", hotel.today).length).to.equal(3);
  });

  it('Should have a method that calculates all of the room service charges for a date', function() {
    expect(hotel.calculateRoomServiceDebtsByDate("17/11/2019")).to.equal(24.24);
  });

  it('Should have a method that calculates all of the room rental charges by date', function() {
    expect(hotel.calculateRoomRentalsByDate("17/11/2019")).to.equal(258.1);
  });

  it('Should have a method that calculates all debts by date', function() {
    expect(hotel.calculateAllDebtsToday("17/11/2019")).to.equal(282.34000000000003);
  });
  
  it('Should have a method that calculates the percentage of rooms occupied by date', function() {
    expect(hotel.showPercentageOfRoomsOccupiedByDate("17/11/2019")).to.equal(5);
  });

});