import Customer from './Customer';
import Hotel from './Hotel';
import AllServices from './AllServices';
import Bookings from './Bookings';

class Admin {
  constructor () {
    this.users = this.fetchData('users');
    this.rooms = this.fetchData('rooms');
    this.bookings = this.fetchData('bookings');
    this.roomServices = this.fetchData('roomServices');
    this.today = this.generateDateToday();
    this.hotel;
    this.currentCustomer;
    this.currentServices;
    this.currentBookings;
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

  initiateHotelDisplay() {
    this.hotel = new Hotel(this, this.today);
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

  createNewCustomer(name) {
    let newbieCustomer = new Customer(name, this.users.length + 1);
    this.users.push(newbieCustomer);
    this.customer = newbieCustomer;
    this.hotel = new Hotel(this);
  }

  captureReturnCustomer(name, id) {
    this.customer = new Customer(name, id);
  }

  bookARoom(date, roomNumber) {
    const newBooking = {
      userID: this.customer.id,
      date,
      roomNumber
    };
    this.bookings.push(newBooking);
    this.hotel = new Hotel(this);
  }

  cancelBooking() {
    // this.bookings
    this.hotel = new Hotel(this);
  }

  purchaseRoomService() {

    this.hotel = new Hotel(this);
    this.services = new AllServices(this, this.customer, this.today);
  }

  upgradeRoom() {
    
    this.hotel = new Hotel(this);
    this.bookings = new Bookings(this);
  }

}

export default Admin;