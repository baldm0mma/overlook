import Customer from './Customer';
import Hotel from './Hotel';

class Admin {
  constructor (combinedData) {
    this.allData = combinedData;
    this.users = this.allData.users.users;
    this.rooms = this.allData.rooms.rooms;
    this.bookings = this.allData.bookings.bookings;
    this.roomServices = this.allData.roomServices.roomServices;
    this.today = this.generateDateToday();
    this.hotelBenchmarks = this.initiateHotelBenchmarks();
    this.currentCustomer;
    this.currentCustomerBooking;
    this.currentCustomerService;
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
    return (dd + '/' + mm + '/' + yyyy);
  }

  initiateHotelBenchmarks() {
    return new Hotel(this.users, this.rooms, this.bookings, this.roomServices, this.today);
  }

  searchForSpecificUser(searchTerm) {
    let strNum;
    parseInt(searchTerm) ? strNum = parseInt(searchTerm) : strNum = searchTerm;
    if (typeof strNum === 'string') {
      let string = this.users.find(cust => cust.name.toLowerCase().includes(strNum.toLowerCase()));
      string ? this.currentCustomer = new Customer(string.name, string.id, this.users, this.rooms, this.bookings, this.roomServices) : null;
      return string ? string : null;
    } else if (typeof strNum === 'number') {
      let number = this.users.find(cust => cust.id === strNum);
      this.currentCustomer = new Customer(number.name, number.id, this.users, this.rooms, this.bookings, this.roomServices);
      return number ? number : null;
    } else {
      return null;
    }
  }

  createNewCustomer(name) {
    let newbieCustomer = new Customer(name, null, this.users, this.rooms, this.bookings, this.roomServices);
    this.users.push(newbieCustomer);
    this.currentCustomer = newbieCustomer;
    this.hotelBenchmarks = new Hotel(this.users, this.rooms, this.bookings, this.roomServices, this.today);
    return newbieCustomer;
  }

  bookARoom(date, roomNumber) {
    const newBooking = {
      userID: this.currentCustomer.id,
      date,
      roomNumber
    };
    this.currentCustomerBooking = newBooking;
    this.bookings.push(newBooking);
    this.hotelBenchmarks = new Hotel(this.users, this.rooms, this.bookings, this.roomServices, this.today);
  }

  cancelBooking(date) {
    let index = this.bookings.findIndex(booking => {
      if (this.currentCustomerBooking.userID === this.currentCustomer.id && this.currentCustomerBooking.date === date) {
        return booking;
      }
    });
    this.bookings.splice(index, 1);
    this.currentCustomerBooking = null;
    this.hotelBenchmarks = new Hotel(this.users, this.rooms, this.bookings, this.roomServices, this.today);
  }

  purchaseRoomService(food, cost) {
    let newRoomService = {
      userID: this.currentCustomer.id,
      date: this.today,
      food,
      totalCost: cost
    }
    this.currentCustomerService = newRoomService;
    this.roomServices.push(newRoomService);
    this.hotelBenchmarks = new Hotel(this.users, this.rooms, this.bookings, this.roomServices, this.today);
  }

  upgradeRoom() {
    this.hotelBenchmarks = new Hotel(this.users, this.rooms, this.bookings, this.roomServices, this.today);
  }

}

export default Admin;