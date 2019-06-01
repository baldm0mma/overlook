class Services {
  constructor(data, customer, today) {
    this.users = data.users;
    this.roomServices = data.roomServices;
    this.currentCustomer = customer;
    this.today = today;
  }

  generateAllOrdersForToday() {
    return this.roomServices.filter(service => service.date === this.today);
  }

  generateAllOrdersForDate() {

  }

}

export default Services;