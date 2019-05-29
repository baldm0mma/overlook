// import $ from 'jquery';
import './css/base.scss';
import fetch from 'cross-fetch';

let userData;
let roomData;
let booksingsData;
let roomServicesData;

fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/users/users')
  .then(response => response.json())
  .then(data => {
    userData = data.users;
});

fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/rooms/rooms')
  .then(response => response.json())
  .then(data => {
    roomData = data.rooms;
});

fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/bookings/bookings')
  .then(response => response.json())
  .then(data => {
    booksingsData = data.bookings;
});

fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/room-services/roomServices')
  .then(response => response.json())
  .then(data => {
    roomServicesData = data.roomServices;
});

// let urls = ['https://fe-apps.herokuapp.com/api/v1/overlook/1903/users/users', 'https://fe-apps.herokuapp.com/api/v1/overlook/1903/rooms/rooms', 'https://fe-apps.herokuapp.com/api/v1/overlook/1903/bookings/bookings', 'https://fe-apps.herokuapp.com/api/v1/overlook/1903/room-services/roomServices'];

// let variables = [userData, roomData, booksingsData, roomServicesData];

// Promise.all(urls.map(url=>fetch(url))).then(responses =>
//   Promise.all(responses.map(res => res.json()))
// ).then(data.map => {
//   variables.map(eachVar => data = eachVar);
// }) 

function timer() {
  console.log(userData);
  console.log(roomData);
  console.log(booksingsData);
  console.log(roomServicesData);
}

setTimeout(timer, 1000);