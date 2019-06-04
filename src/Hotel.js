import Services from "./Services";
import Bookings from "./Bookings";

class Hotel {
  constructor(users, rooms, bookings, roomServices, today) {
    this.users = users;
    this.rooms = rooms;
    this.bookings = bookings;
    this.roomServices = roomServices;
    this.today = today;
    this.servicesBenchmarks = this.initiateRoomServiceBenchmarks();
    this.bookingBenchmarks = this.initiateBookingBenchmarks();
  }

  initiateRoomServiceBenchmarks() {
    return new Services(this.roomServices);
  }

  initiateBookingBenchmarks() {
    return new Bookings(this.bookings);
  }

  bookingsByDate(date) {
    return this.bookings.reduce((bookedRooms, booking) => {
      if (booking.date === date) {
        bookedRooms.push(booking);
      }
      return bookedRooms;
    }, []);
  }

  generateAvailableRoomNumbersByDate(date) {
    return this.bookings.reduce((availableRoomNums, currentBooking) => {
      if (currentBooking.date !== date) {
        availableRoomNums.push(currentBooking.roomNumber);
      }
      return availableRoomNums;
    }, []);
  }

  generateBookedRoomNumbersByDate(date) {
    return this.bookings.reduce((bookedRoomNums, currBooking) => {
      if (currBooking.date === date) {
        bookedRoomNums.push(currBooking.roomNumber);
      }
      return bookedRoomNums;
    }, []);
  }

  generateRoomByType(type, date) {
    return this.generateAvailableRoomNumbersByDate(date).reduce((roomTypeSearch, num) => {
      this.rooms.forEach(room => {
        if (room.number === num && room.roomType === type) {
          roomTypeSearch.push(room);
        }
      })
      return roomTypeSearch;
    }, []);
  }

  generateFullRoomInformation(roomListType, date) {
    let roomList;
    if (roomListType === 'available') {
      roomList = this.generateAvailableRoomNumbersByDate(date);
    } else {
      roomList = this.generateBookedRoomNumbersByDate(date);
    }
    return roomList.reduce((finalRoomList, roomNum) => {
      this.rooms.forEach(room => {
        if (roomNum === room.number) {
          finalRoomList.push(room);
        }
      });
      return finalRoomList;
    }, []);
  }

  calculateRoomServiceDebtsByDate(date) {
    return this.roomServices.reduce((totalOwed, service) => {
      if (service.date === date) {
        totalOwed += service.totalCost;
      }
      return totalOwed;
    }, 0);
  }

  calculateRoomRentalsByDate(date) {
    return this.generateBookedRoomNumbersByDate(date).reduce((totalRoomCharges, roomNum) => {
      this.rooms.forEach(room => {
        if (roomNum === room.number) {
          totalRoomCharges += room.costPerNight;
        }
      });
      return totalRoomCharges;
    }, 0);
  }

  calculateAllDebtsToday(date) {
    return this.calculateRoomServiceDebtsByDate(date) + this.calculateRoomRentalsByDate(date);
  }

  showPercentageOfRoomsOccupiedByDate(date) {
    return this.bookingsByDate(date).reduce((freeRooms, booking) => {
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