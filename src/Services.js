class Services {
  constructor(roomServices) {
    this.roomServices = roomServices;
  }

  generateAllOrdersForDate(date) {
    return this.roomServices.filter(service => service.date === date);
  }

}

export default Services;