import $ from 'jquery';

let currentCustomer;

const domUpdates = {
  
  populateAllTabs(admin) {
    $('#todays-date').text(admin.today).hide().fadeIn(2000);
    $('.total-rooms').text(admin.hotelBenchmarks.generateAvailableRoomNumbersByDate(admin.today).length).hide().fadeIn(2000);
    $('.total-earned').text(admin.hotelBenchmarks.calculateAllDebtsToday(admin.today)).hide().fadeIn(2000);
    $('.percent-occupied').text(admin.hotelBenchmarks.showPercentageOfRoomsOccupiedByDate(admin.today) + '%').hide().fadeIn(2000);
    $('.total-orders').text(admin.hotelBenchmarks.servicesBenchmarks.generateAllOrdersForDate(admin.today).length).hide().fadeIn(2000);
    $('.most-pop-booking').text(admin.hotelBenchmarks.bookingBenchmarks.generateMostPopularBookingDate()).hide().fadeIn(2000);
  },

  returnSeacrhedCustomerName(admin, searchTerm) {
    currentCustomer = admin.searchForSpecificUser(searchTerm);
    if (currentCustomer) {
      $('#returned-name').text('Click here for ' + currentCustomer.name + '.');
      $('form').trigger('reset');
    } else {
      $('#returned-name').text('Holy fuck! That person doesn\'t exsist in our system... but after verifying, they DO exsist in the local federal penitentiary database! CALL 911! ... Or, just add them to our system on the right.');
      $('form').trigger('reset');
    }
  },

  showDefaultCustomerInformation(admin) {
    $('.current-customer-name').text(currentCustomer.name);
    $('.customer-total-orders').text(admin.currentCustomer.calculateLifetimeRoomServiceCost());
    $('.orders-breakdown').text(admin.currentCustomer.generateAllRoomServicesForCustomer());
  },

  showServicesByDate(admin, date) {
    $('.customer-orders-by-date').text(admin.currentCustomer.calculateRoomServiceCostByDate(date));
    $('form').trigger('reset');
  },

  focusSearchedCustomer(admin) {
    $('#current-customer-info').text('We\'re currently focusing on ' + currentCustomer.name + ', customer ID: ' + currentCustomer.id);
    domUpdates.showDefaultCustomerInformation(admin);
    $('#returned-name').text('');
    $('form').trigger('reset');
  },

  focusNewCustomer(admin) {
    let name = $('#enter-new-name').val();
    currentCustomer = admin.createNewCustomer(name);
    $('#current-customer-info').text('We\'re currently focusing on ' + currentCustomer.name + ', customer ID: ' + currentCustomer.id);
    $('form').trigger('reset');
    domUpdates.showDefaultCustomerInformation(admin);
  },

  changeContent() {
    $('.default').hide();
    $('.customer-view').show();
  }

};



export default domUpdates;