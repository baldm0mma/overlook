class Services {
  constructor(data, today) {
    this.roomServices = data.roomServices;
    this.today = today;
  }

  generateAllOrdersForDate(date) {
    return this.roomServices.filter(service => service.date === date);
  }

}

export default Services;