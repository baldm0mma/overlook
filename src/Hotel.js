class Hotel {
  constructor(data, today) {
    this.users = data.users.users;
    this.rooms = data.rooms.rooms;
    this.bookings = data.bookings.bookings;
    this.roomServices = data.roomServices.roomServices;
    this.today = today;
    // console.log('bookings', this.users);
  }

  bookingsForToday() {
    return this.bookings.reduce((bookedRooms, booking) => {
      if (booking.date === this.today) {
        bookedRooms.push(booking);
      }
      return bookedRooms;
    }, []);
  }

  generateAvailableRoomNumbersToday() {
    return this.bookings.reduce((availableRoomNums, currentBooking) => {
      if (currentBooking.date !== this.today) {
        availableRoomNums.push(currentBooking.roomNumber);
      }
      return availableRoomNums;
    }, []);
  }

  generateBookedRoomNumbersToday() {
    return this.bookings.reduce((bookedRoomNums, currBooking) => {
      if (currBooking.date === this.today) {
        bookedRoomNums.push(currBooking.roomNumber);
      }
      return bookedRoomNums;
    }, []);
  }

  generateFullRoomInformation(roomList) {
    return roomList.reduce((finalRoomList, roomNum) => {
      this.rooms.forEach(room => {
        if (roomNum === room.number) {
          finalRoomList.push(room);
        }
      });
      return finalRoomList;
    }, []);
  }

  calculateRoomServiceDebtsToday() {
    return this.roomServices.reduce((totalOwed, service) => {
      if (service.date === this.today) {
        totalOwed += service.totalCost;
      }
      return totalOwed;
    }, 0);
  }

  calculateRoomRentalsToday() {
    return this.generateBookedRoomNumbersToday().reduce((totalRoomCharges, roomNum) => {
      this.rooms.forEach(room => {
        if (roomNum === room.number) {
          totalRoomCharges += room.costPerNight;
        }
      });
      return totalRoomCharges;
    }, 0);
  }

  calculateAllDebtsToday() {
    return this.calculateRoomServiceDebtsToday() + this.calculateRoomRentalsToday();
  }

  showPercentageOfRoomsOccupiedToday() {
    return this.bookingsForToday().reduce((freeRooms, booking) => {
      this.rooms.forEach(room => {
        if (booking.roomNumber === room.number) {
          freeRooms.push(room);
        }
      });
      return freeRooms;
    }, []).length / this.rooms.length * 100;
  }

}

export default Hotel;