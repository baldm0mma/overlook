import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);
import Services from '../src/Services';
import { users, rooms, bookings, roomServices } from '../src/testData/TestData';

describe('Services', function() {

  let services;

  beforeEach(function() {
    services = new Services({ users, rooms, bookings, roomServices }.roomServices);

  });

  it('should be a function', function() {
    expect(Services).to.be.a('function');
  });

  it('should be an instance of Services', function() {
    expect(services).to.be.an.instanceof(Services);
  });

  it('should have a method that generates all orders for a specified date', function() {
    expect(services.generateAllOrdersForDate("01/01/2020").length).to.equal(1);
  });

});