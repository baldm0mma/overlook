class Hotel {
  constructor(data, today) {
    this.users = data.users;
    this.rooms = data.rooms;
    this.bookings = data.bookings;
    this.roomServices = data.roomServices;
    this.today = today;
  }

  generateAvailableRooms() {
    let roomNumbers = this.bookings.reduce((bookedRoomNum, currentBooking) => {
      if (currentBooking.date !== this.today) {
        if (!bookedRoomNum.includes(currentBooking.roomNumber)) {
          bookedRoomNum.push(currentBooking.roomNumber);
        }
      }
      return bookedRoomNum;
    }, []);
    return roomNumbers.reduce((allAvailableRooms, roomNum) => {
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