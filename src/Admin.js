import Customer from './Customer';
import Hotel from './Hotel';
import Services from './Services';
import Bookings from './Bookings';

class Admin {
  constructor () {
    this.allData = {
      users: this.fetchData('users'),
      rooms: this.fetchData('rooms'),
      bookings: this.fetchData('bookings'),
      roomServices: this.fetchData('roomServices')
    }
    this.today = this.generateDateToday();
    this.hotel;
    this.currentCustomer;
    this.currentHotelDisplay;
    this.currentServicesDisplay;
    this.currentBookingsDisplay;
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
    this.hotel = new Hotel(this.allData, this.today);
  }

  searchForSpecificUser(searchTerm) {
    let strNum;
    parseInt(searchTerm) ? strNum = parseInt(searchTerm) : strNum = searchTerm;
    if (typeof strNum === 'string') {
      let string = this.allData.users.find(cust => cust.name.toLowerCase().includes(strNum.toLowerCase()));
      return string ? string : null;
    } else if (typeof strNum === 'number') {
      let number = this.allData.users.find(cust => cust.id === strNum);
      return number ? number : null;
    } else {
      return null;
    }
  }

  createNewCustomer(name) {
    let newbieCustomer = new Customer(name, this.allData.users.length + 1);
    this.allData.users.push(newbieCustomer);
    this.currentCustomer = newbieCustomer;
    this.currentHotelDisplay = new Hotel(this);
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
    this.allData.bookings.push(newBooking);
    this.currentHotelDisplay = new Hotel(this);
  }

  cancelBooking() {
    this.bookings
    this.currentHotelDisplay = new Hotel(this);
  }

  purchaseRoomService() {

    this.currentHotelDisplay = new Hotel(this);
    this.currentServicesDisplay = new Services(this, this.currentCustomer, this.today);
  }

  upgradeRoom() {
    
    this.currentHotelDisplay = new Hotel(this);
    this.currentBookingsDisplay = new Bookings(this);
  }

}

export default Admin;