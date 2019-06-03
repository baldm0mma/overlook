class Services {
  constructor(data) {
    this.roomServices = data.roomServices;
  }

  generateAllOrdersForDate(date) {
    return this.roomServices.filter(service => service.date === date);
  }

}

export default Services;