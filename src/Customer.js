class Customer {
  constructor(name, id, data) {
    this.allData = data;
    this.users = this.allData.users.users;
    this.rooms = this.allData.rooms.rooms;
    this.bookings = this.allData.bookings.bookings;
    this.roomServices = this.allData.roomServices.roomServices;
    this.name = name;
    this.id = id || this.users.length + 1;
  }

  returnAlltimeCustomerBookings() {
    return this.bookings.filter(booking => {
      if (booking.userID === this.id) {
        return booking;
      }
    });
  }

  returnCustomerBookingbyDate(date) {
    return this.bookings.filter(booking => {
      if (booking.date === date && booking.userID === this.id) {
        return booking;
      }
    });
  }

  calculateRoomRentalCostByDate(date) {
    let bookingByDate = this.returnCustomerBookingbyDate(date);
    return bookingByDate.reduce((totalRoomRentalDebt, booking) => {
      this.rooms.forEach(room => {
        if (room.number === booking.roomNumber) {
          totalRoomRentalDebt += room.costPerNight;
        }
      });
      return totalRoomRentalDebt;
    }, 0);
  }

  calculateRoomServiceCostByDate(date) {
    return this.roomServices.reduce((acc, roomService) => {
      if (roomService.date === date && roomService.userID === this.id) {
        acc += roomService.totalCost;
      }
      return acc;
    }, 0);
  }

  calculateLifetimeRoomServiceCost() {
    return this.roomServices.reduce((acc, roomService) => {
      if (roomService.userID === this.id) {
        acc += roomService.totalCost;
      }
      return acc;
    }, 0);
  }

  calculateFinalBill(date) {
    return this.calculateRoomRentalCostByDate(date) + this.calculateRoomServiceCostByDate(date);
  }

  calculateLifetimeExpenditures() {
    let lifetimeBookings = this.returnAlltimeCustomerBookings();
    let lifetimeRoomRentalCharges = lifetimeBookings.reduce((totalRoomRentalDebt, booking) => {
      this.rooms.forEach(room => {
        if (room.number === booking.roomNumber) {
          totalRoomRentalDebt += room.costPerNight;
        }
      })
      return totalRoomRentalDebt;
    }, 0);
    let lifetimeRoomServiceCharges = this.roomServices.reduce((acc, roomService) => {
      if (roomService.userID === this.id) {
        acc += roomService.totalCost;
      }
      return acc;
    }, 0);
    return lifetimeRoomRentalCharges + lifetimeRoomServiceCharges;
  }

  generateAllRoomServicesForCustomer() {
    return this.roomServices.filter(service => {
      if (service.userID === this.id) {
        return service;
      }
    });
  }

  // - Breakdown of dates and dollar amounts for room service
  // - Total dollar amount spent on room service for a particular day
  // - Total dollar amount spent on room service for a all days ever

}

export default Customer;