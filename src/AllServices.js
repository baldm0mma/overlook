class AllServices {
  constructor(data, customer, today) {
    this.users = data.users;
    this.rooms = data.rooms;
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

export default AllServices;