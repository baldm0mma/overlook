import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);
import Services from '../src/Services';
import testRoomServices from '../src/testData/roomServices-data';

describe('Services', function() {

  let services;

  beforeEach(function() {
    services = new Services(testRoomServices, 4, '03/03/3003', 'Random-ass-sammy', 10);

  });

  it('should be a function', function() {
    expect(Services).to.be.a('function');
  });

  it('should be an instance of Services', function() {
    expect(services).to.be.an.instanceof(Services);
  });

  it('should have a property that stores all current services', function() {
    expect(services.roomServices.length).to.equal(20);
  });

  it('should have a property that stores current user id', function() {
    expect(services.userID).to.equal(4);
  });

  it('should have a property that stores current date', function() {
    expect(services.date).to.equal('03/03/3003');
  });

  it('should have a property that stores current food choice', function() {
    expect(services.food).to.equal('Random-ass-sammy');
  });

  it('should have a property that stores cost of current item', function() {
    expect(services.totalCost).to.equal(10);
  });

  it('should have a method that generates all orders for a specified date', function() {
    expect(services.generateAllOrdersForDate("01/01/2020").length).to.equal(1);
  });

});