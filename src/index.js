import $ from 'jquery';
import './css/base.scss';
import Admin from './Admin';
import domUpdates from './DomUpdates';

let users = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/users/users').then(function(response) {
  return response.json()
});

let roomServices = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/room-services/roomServices').then(function(response) {
  return response.json()
});

let bookings = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/bookings/bookings').then(function(response) {
  return response.json()
});

let rooms = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1903/rooms/rooms').then(function(response) {
  return response.json()
});

let combinedData = {'users': {}, 'roomServices': {}, 'bookings': {}, 'rooms': {}}

Promise.all([users, roomServices, bookings, rooms])
  .then(function(values) {
    combinedData['users'] = values[0];
    combinedData['roomServices'] = values[1];
    combinedData['bookings'] = values[2];
    combinedData['rooms'] = values[3];
    return combinedData;
  })
  .catch(error => console.log(`Error in promises ${error}`));

let admin;

setTimeout(console.log(combinedData), 2000);

$(document).ready(function() {
  
  setTimeout( () => {
    admin = new Admin(combinedData);
  }, 1000);

  setTimeout( () => {
    domUpdates.populateAllTabs(admin);
  }, 1500);

  $('ul.tabs li').click(function() {
    var tab_id = $(this).attr('data-tab');
    $('ul.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');
    $(this).addClass('current');
    $("#" + tab_id).addClass('current');
  });

  $('')

});