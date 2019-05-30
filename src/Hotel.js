import Customer from "./Customer";

class Hotel {
  constructor () {
    this.users = this.fetchData('users');
    this.rooms = this.fetchData('rooms');
    this.bookings = this.fetchData('bookings');
    this.roomServices = this.fetchData('roomServices');
    this.today = this.generateDateToday();
    this.currentCustomer;
  }

  fetchData(type) {
    let url = `https://fe-apps.herokuapp.com/api/v1/overlook/1903/${type}/${type}`;
    if (type === 'roomServices') {
      url = `https://fe-apps.herokuapp.com/api/v1/overlook/1903/room-services/${type}`
    }
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this[type] = data[type];
      });
  }

  searchForSpecificUser(searchTerm) {
    let strNum;
    parseInt(searchTerm) ? strNum = parseInt(searchTerm) : strNum = searchTerm;
    if (typeof strNum === 'string') {
      let string = this.users.find(cust => cust.name.toLowerCase().includes(strNum.toLowerCase()));
      return string ? string : null;
    } else if (typeof strNum === 'number') {
      let number = this.users.find(cust => cust.id === strNum);
      return number ? number : null;
    } else {
      return null;
    }
  }

  generateDateToday() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    return (mm + '/' + dd + '/' + yyyy);
  }

  generateAvailableRooms() {
    let roomNumbers = this.bookings.reduce((acc, currentBooking) => {
      if (currentBooking.date !== this.today) {
        if (!acc.includes(currentBooking.roomNumber)) {
          acc.push(currentBooking.roomNumber);
        }
      }
      return acc;
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
    let roomServiceDebt = this.roomServices.reduce((acc, curr) => {
      if (curr.date === this.today) {
        acc += curr.totalCost;
      }
      return acc;
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

  showRoomsOccupiedToday() {
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
    }, []);
  }

}

export default Hotel;