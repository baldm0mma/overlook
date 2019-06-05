class Services {
  constructor(roomServices, id, date, food, cost) {
    this.roomServices = roomServices;
    this.userID = id;
    this.date = date;
    this.food = food;
    this.totalCost = cost;
  }

  generateAllOrdersForDate(date) {
    return this.roomServices.filter(service => service.date === date);
  }

}

export default Services;