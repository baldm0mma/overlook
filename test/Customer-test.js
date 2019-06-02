import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);
import Customer from '../src/Customer';
import { users, rooms, bookings, roomServices } from '../src/testData/TestData';
// import  from '../src/testData/TestData';
// import domUpdates from "../src/domUpdates";
// chai.spy.on(domUpdates, 'updateScore', () => true);
// chai.spy.on(domUpdates, 'turnPrompt', () => true);

describe('Customer', function() {

  let customer;

  beforeEach(function() {
    customer = new Customer('Autumn Toy', 1, { users, rooms, bookings, roomServices });

  });

  it('should be a function', function() {
    expect(Customer).to.be.a('function');
  });

  it('should be an instance of Customer', function() {
    expect(customer).to.be.an.instanceof(Customer);
  });

  it('should have a property that stores a user\'s name', function() {
    expect(customer.name).to.equal('Autumn Toy');
  });

  it('should have a property that stores a user\'s ID', function() {
    expect(customer.id).to.equal(1);
  });

  it('should have a property that houses all data as a singular object', function() {
    expect(customer.allData).to.be.an('object');
  });

  it('should have a method that returns lifetime customer bookings, both past and future', function() {
    expect(customer.returnAlltimeCustomerBookings().length).to.equal(2);
  });

  it('should have a method that returns a customer\'s booking by date', function() {
    expect(customer.returnCustomerBookingbyDate("22/02/2020")[0].roomNumber).to.equal(73);
  });

  it('should have a method that calculates room rental costs for a customer by date', function() {
    expect(customer.calculateRoomRentalCostByDate("22/02/2020")).to.equal(344.89);
  });

  it('should have a method that calculates roomservice charges for a customer by date', function() {
    expect(customer.calculateRoomServiceCostByDate("15/07/2019")).to.equal(13.07);
  });

  it('should have a method that calculates a lifetime total of roomservice charges for a customer', function() {
    expect(customer.calculateLifetimeRoomServiceCost()).to.equal(24.23);
  });

  it('should have a method that calculates a customer\'s final bill by date', function() {
    expect(customer.calculateFinalBill("22/02/2020")).to.equal(344.89);
  });

  it('should have a method that calculates lifetime expenditures of a given customer', function() {
    expect(customer.calculateLifetimeExpenditures()).to.equal(624.02);
  });

});