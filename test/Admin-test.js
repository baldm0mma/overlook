import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);
import Admin from '../src/Admin';
import Hotel from '../src/Hotel';
import Customer from '../src/Customer';
import { users, rooms, bookings, roomServices } from '../src/testData/TestData';
// import domUpdates from "../src/domUpdates";
chai.spy.on(Admin, 'fetchData', () => true);

describe('Admin', function() {

  let admin;

  beforeEach(function() {
    admin = new Admin({ users, rooms, bookings, roomServices });
  });

  it('should be a function', function() {
    expect(Admin).to.be.a('function');
  });

  it('should be an instance of Admin', function() {
    expect(admin).to.be.an.instanceof(Admin);
  });

  it('should have a method that returns today\'s date', function() {
    expect(admin.generateDateToday()).to.be.a('string');
  });

  it('should have a method that instantiates the Hotel class', function() {
    expect(admin.hotel).to.be.an.instanceof(Hotel);
  });

  it('should have a method that returns a user object when given a search parameter of a name, or ID, and, should return "null" if the user does not exsist', function() {
    expect(admin.searchForSpecificUser('Autumn')).to.be.an('object');
    expect(admin.searchForSpecificUser('1')).to.be.an('object');
    expect(admin.searchForSpecificUser('Jev')).to.equal(null);
  });

  it('should have a method that deals with instantiating a new customer, pushing that customer to the user\'s array', function() {
    expect(admin.currentCustomer).to.be.an('undefined');
    expect(admin.users.length).to.eql(20);
    admin.createNewCustomer('Jevbert');
    expect(admin.currentCustomer).to.be.an.instanceof(Customer);
    expect(admin.currentCustomer.id).to.eql(21);
    expect(admin.users.length).to.eql(21);
  });

  it('should have a method for a customer to book and unbook a room', function() {
    expect(admin.bookings).to.have.length(20);
    admin.createNewCustomer('Jevbert');
    admin.bookARoom('11/03/19', 67);
    expect(admin.bookings).to.have.length(21);

    admin.currentCustomer = { id: 1, name: "Autumn Toy" };
    admin.currentCustomerBooking = { userID: 1, date: "21/08/2019", roomNumber: 143 };
    expect(admin.bookings.length).to.eql(21);
    admin.cancelBooking("21/08/2019");
    expect(admin.bookings.length).to.eql(20);
  });

  it('should have a method for a customer to add a roomservice', function() {
    expect(admin.roomServices).to.have.length(20);
    admin.createNewCustomer('Jevbert');
    admin.purchaseRoomService('sammy', 10.00);
    expect(admin.roomServices).to.have.length(21);

    expect(admin.currentCustomer.name).to.equal('Jevbert');
    expect(admin.currentCustomerService.totalCost).to.equal(10.00);
  });

});