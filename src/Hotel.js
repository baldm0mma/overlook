class Hotel {
  constructor(data, today) {
    this.users = data.users.users;
    this.rooms = data.rooms.rooms;
    this.bookings = data.bookings.bookings;
    this.roomServices = data.roomServices.roomServices;
    this.today = today;
    // console.log('bookings', this.users);
  }

  generateAvailableRoomNumbers() {
    return this.bookings.reduce((nonBookedRoomNums, currentBooking) => {
      if (currentBooking.date !== this.today) {
        nonBookedRoomNums.push(currentBooking.roomNumber);
      }
      return nonBookedRoomNums;
    }, []);
  }

  generateAvailableRooms() {
    return this.generateAvailableRoomNumbers().reduce((allAvailableRooms, roomNum) => {
      this.rooms.forEach(room => {
        if (roomNum === room.number) {
          allAvailableRooms.push(room);
        }
      });
      return allAvailableRooms;
    }, []);
  }

  calculateDebtsToday() {
    let roomServiceDebt = this.roomServices.reduce((roomsThatOwe, service) => {
      if (service.date === this.today) {
        roomsThatOwe += service.totalCost;
      }
      return roomsThatOwe;
    }, 0);
    let roomsWithDebt = this.bookings.reduce((totalBookings, currBooking) => {
      if (currBooking.date === this.today) {
        totalBookings.push(currBooking.roomNumber);
      }
      return totalBookings;
    }, []);
    let roomCharges = roomsWithDebt.reduce((totalRoomCharges, roomNum) => {
      this.rooms.forEach(room => {
        if (roomNum === room.number) {
          totalRoomCharges += room.costPerNight;
        }
      });
      return totalRoomCharges;
    }, 0);
    return roomServiceDebt + roomCharges;
  }

  showPercentageOfRoomsOccupiedToday() {
    let todaysBookings = this.bookings.reduce((roomNums, booking) => {
      if (booking.date === this.today) {
        roomNums.push(booking);
      }
      return roomNums;
    }, []);
    return todaysBookings.reduce((freeRooms, booking) => {
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