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

// setTimeout(console.log(combinedData), 2000);

$(document).ready(function() {

  $('.customer-view').hide();
  $('.search-view').hide();

  setTimeout( () => {
    // console.log(combinedData);
    admin = new Admin(combinedData);
  }, 1000);

  setTimeout( () => {
    // console.log(admin.rooms);
    domUpdates.populateAllTabs(admin);
  }, 1500);

  $('ul.tabs li').click(function() {
    var tab_id = $(this).attr('data-tab');
    $('ul.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');
    $(this).addClass('current');
    $("#" + tab_id).addClass('current');
  });

  $('#search-name-button').click(function() {
    let searchTerm = $('#search-name').val();
    domUpdates.returnSeacrhedCustomerName(admin, searchTerm);
  });

  $('#returned-name').click(function() {
    domUpdates.focusSearchedCustomer(admin);
    domUpdates.changeContentFromGeneralToCustomer();
    // console.log(admin.currentCustomer);
  });

  $('#create-new-customer-button').click(function() {
    domUpdates.focusNewCustomer(admin);
    domUpdates.changeContentFromGeneralToCustomer();
  });

  $('#roomservice-by-date-button').click(function() {
    let date = $('#roomservice-by-date').val();
    domUpdates.showServicesByDate(admin, date);
  });

  $('#bookings-by-date-button').click(function() {
    let date = $('#bookings-by-date').val();
    domUpdates.findBookingsByDate(admin, date);
  });

  $('.make-a-booking').click(function() {
    let roomNumber = event.target.id;
    if (typeof parseInt(roomNumber) === 'number') {
      domUpdates.bookARoomOnClick(admin, roomNumber);
    }
    
  });

  $('#room-search').click(function() {
    domUpdates.initiateSearchContent();
  });

  $('#room-type-button').click(function() {
    let type = $('input:checked').val();
    domUpdates.searchByType(admin, type, admin.today);
  });

});