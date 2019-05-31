import Customer from './Customer';
import Hotel from './Hotel';
import AllServices from './AllServices';
import Bookings from './Bookings';

class Admin {
  constructor (combinedData) {
    this.allData = combinedData;
    this.users = this.allData.users;
    this.rooms = this.allData.rooms;
    this.bookings = this.allData.bookings;
    this.roomServices = this.allData.roomServices;
    this.today = this.generateDateToday();
    this.hotel;
    this.currentCustomer;
    this.currentServices;
    this.currentBookings;
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
    this.hotel = new Hotel(this.allData, this.today);
  }

  searchForSpecificUser(searchTerm) {
    let strNum;
    parseInt(searchTerm) ? strNum = parseInt(searchTerm) : strNum = searchTerm;
    if (typeof strNum === 'string') {
      let string = this.users.find(cust => cust.name.toLowerCase().includes(strNum.toLowerCase()));
      return string ? this.captureReturnCustomer(string.name, string.id) : null;
    } else if (typeof strNum === 'number') {
      let number = this.users.find(cust => cust.id === strNum);
      return number ? this.captureReturnCustomer(number.name, number.id) : null;
    } else {
      return null;
    }
  }

  createNewCustomer(name) {
    let newbieCustomer = new Customer(name, this.users.length + 1);
    this.users.push(newbieCustomer);
    this.currentCustomer = newbieCustomer;
    this.hotel = new Hotel(this.allData);
  }

  captureReturnCustomer(name, id) {
    this.currentCustomer = new Customer(name, id);
  }

  bookARoom(date, roomNumber) {
    const newBooking = {
      userID: this.currentCustomer.id,
      date,
      roomNumber
    };
    this.currentBookings.push(newBooking);
    this.hotel = new Hotel(this.allData);
  }

  cancelBooking() {
    // this.bookings
    this.hotel = new Hotel(this.allData);
  }

  purchaseRoomService() {

    this.hotel = new Hotel(this.allData);
    this.currentServices = new AllServices(this.allData, this.customer, this.today);
  }

  upgradeRoom() {
    
    this.hotel = new Hotel(this.allData);
    this.currentBookings = new Bookings(this.allData);
  }

}

export default Admin;