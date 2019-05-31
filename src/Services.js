class Services {
  constructor(data, customer, today) {
    this.users = data.users;
    this.rooms = data.rooms;
    this.roomServices = data.roomServices;
    this.customer = customer;
  }

  generateAllOrdersForToday() {
    return this.roomServices.filter(service => service.date ===)
  }

  generateAllOrdersForDate() {

  }

  generateExpensesBrakedownForCustomer() {
    
  }

}

export default Services;