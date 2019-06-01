import $ from 'jquery';

let currentCustomer;

const domUpdates = {
  
  populateAllTabs(admin) {
    $('#todays-date').text(admin.today).hide().fadeIn(2000);
    $('.total-rooms').text(admin.hotel.generateAvailableRoomNumbersToday().length).hide().fadeIn(2000);
    $('.total-earned').text(admin.hotel.calculateAllDebtsToday()).hide().fadeIn(2000);
    $('.percent-occupied').text(admin.hotel.showPercentageOfRoomsOccupiedToday() + '%').hide().fadeIn(2000);
  },

  returnSeacrhedCustomerName(admin, searchTerm) {
    currentCustomer = admin.searchForSpecificUser(searchTerm);
    if (currentCustomer) {
      $('#returned-name').text('Click here for ' + currentCustomer.name + '.');
      $('form').trigger('reset');
    } else {
      $('#returned-name').text('Sorry, they don\'t exsist in our database yet. Would you like to add them to our system?');
      $('form').trigger('reset');
    }
  },

  focusSearchedCustomer() {
    $('#current-customer-info').text('We\'re currently focusing on ' + currentCustomer.name + ', customer ID: ' + currentCustomer.id);
    $('#returned-name').text('');
    $('form').trigger('reset');
  },

  focusNewCustomer(admin) {
    let name = $('#enter-new-name').val();
    currentCustomer = admin.createNewCustomer(name);
    $('#current-customer-info').text('We\'re currently focusing on ' + currentCustomer.name + ', customer ID: ' + currentCustomer.id);
    $('form').trigger('reset');
  }

};



export default domUpdates;