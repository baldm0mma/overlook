import Customer from './Customer';
import Hotel from './Hotel';
// import AllServices from './AllServices';
import Bookings from './Bookings';
// import DomUpdates from './DomUpdates';

class Admin {
  constructor (combinedData) {
    this.allData = combinedData;
    this.users = this.allData.users.users;
    this.rooms = this.allData.rooms.rooms;
    this.bookings = this.allData.bookings.bookings;
    this.roomServices = this.allData.roomServices.roomServices;
    this.today = this.generateDateToday();
    this.hotel = this.initiateHotelBenchmarks();
    this.currentCustomer;
    this.currentCustomerBooking;
    this.currentCustomerService;
    // console.log('users', this.users);
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

  initiateHotelBenchmarks() {
    return new Hotel(this.allData, this.today);
  }

  searchForSpecificUser(searchTerm) {
    let strNum;
    parseInt(searchTerm) ? strNum = parseInt(searchTerm) : strNum = searchTerm;
    if (typeof strNum === 'string') {
      let string = this.users.find(cust => cust.name.toLowerCase().includes(strNum.toLowerCase()));
      string ? this.currentCustomer = new Customer(string.name, string.id) : null;
      return string ? string : null;
    } else if (typeof strNum === 'number') {
      let number = this.users.find(cust => cust.id === strNum);
      this.currentCustomer = new Customer(number.name, number.id);
      return number ? number : null;
    } else {
      return null;
    }
  }

  createNewCustomer(name) {
    let newbieCustomer = new Customer(name, this.users.length + 1);
    this.users.push(newbieCustomer);
    this.currentCustomer = newbieCustomer;
    // console.log('new', this.currentCustomer);
    this.hotel = new Hotel(this.allData);
    return newbieCustomer;
  }

  bookARoom(date, roomNumber) {
    const newBooking = {
      userID: this.currentCustomer.id,
      date,
      roomNumber
    };
    this.bookings.push(newBooking);
    this.hotel = new Hotel(this.allData);
  }

  cancelBooking(date) {
    let index = this.bookings.findIndex(booking => {
      if (this.currentCustomerBooking.userID === this.currentCustomer.id && this.currentCustomerBooking.date === date) {
        return booking;
      }
    });
    this.bookings.splice(index, 1);
    this.currentCustomerBooking = null;
    this.hotel = new Hotel(this.allData);
  }

  purchaseRoomService() {
    this.currentCustomer;
    this.hotel = new Hotel(this.allData);
  }

  upgradeRoom() {
    
    this.hotel = new Hotel(this.allData);
    this.bookings = new Bookings(this.allData);
  }

}

export default Admin;