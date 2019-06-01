import $ from 'jquery';
// import Admin from './Admin';

let currentCustomer;

const domUpdates = {

  updateTimeAndDateAtInterval(admin) {
    $('#todays-date').text(admin.today).hide().fadeIn(2000);
    // $('#current-time').text(setInterval(new Date().toLocaleTimeString(), 1000));
  },
  
  populateAllTabs(admin) {
    $('.total-rooms').text(admin.hotel.generateAvailableRoomNumbers().length).hide().fadeIn(2000);
    $('.total-earned').text(admin.hotel.calculateDebtsToday()).hide().fadeIn(2000);
    $('.percent-occupied').text(admin.hotel.showPercentageOfRoomsOccupiedToday()).hide().fadeIn(2000);
  },

  returnSeacrhedCustomerName(admin, searchTerm) {
    currentCustomer = admin.searchForSpecificUser(searchTerm);
    if (currentCustomer) {
      $('#returned-name').text('Were you searching for ' + currentCustomer.name + '?');
      $('form').trigger('reset');
    } else {
      $('#returned-name').text('Sorry, they don\'t exsist in our database yet.');
    }
  },

  makeSearchedCustomerFocus() {
    $('#current-customer-info').text('We\'re currently focusing on ' + currentCustomer.name + ', customer ID: ' + currentCustomer.id);
    $('#returned-name').text('Great!').fadeOut(5000);
  }

};



export default domUpdates;