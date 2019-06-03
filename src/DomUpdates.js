import $ from 'jquery';

let currentCustomer;

const domUpdates = {
  
  populateAllTabs(admin) {
    $('#todays-date').text(admin.today).hide().fadeIn(1000);
    $('.total-rooms').text(admin.hotelBenchmarks.generateAvailableRoomNumbersByDate(admin.today).length).hide().fadeIn(1000);
    $('.total-earned').text(admin.hotelBenchmarks.calculateAllDebtsToday(admin.today)).hide().fadeIn(1000);
    $('.percent-occupied').text(admin.hotelBenchmarks.showPercentageOfRoomsOccupiedByDate(admin.today) + '%').hide().fadeIn(1000);
    $('.total-orders').text(admin.hotelBenchmarks.servicesBenchmarks.generateAllOrdersForDate(admin.today).length).hide().fadeIn(1000);
    $('.most-pop-booking').text(admin.hotelBenchmarks.bookingBenchmarks.generateMostPopularBookingDate()).hide().fadeIn(1000);
  },

  returnSeacrhedCustomerName(admin, searchTerm) {
    currentCustomer = admin.searchForSpecificUser(searchTerm);
    if (currentCustomer) {
      $('#returned-name').text('Click here for ' + currentCustomer.name + '.').hide().fadeIn(1000);
      $('form').trigger('reset');
    } else {
      $('#returned-name').text('Holy fuck! That person doesn\'t exsist in our system... but after verifying, they DO exsist in the local federal penitentiary database! CALL 911! ... Or, just add them to our system on the right.').hide().fadeIn(1000);
      $('form').trigger('reset');
    }
  },

  showDefaultCustomerInformation(admin) {
    $('.current-customer-name').text(currentCustomer.name);
    $('.customer-total-orders').text('$' + admin.currentCustomer.calculateLifetimeRoomServiceCost());
    // $('.orders-breakdown').text(admin.currentCustomer.generateAllRoomServicesForCustomer());
    $('.orders-breakdown').append(domUpdates.displayCustomerOrders(admin));
  },

  displayCustomerOrders(admin) {
    $('.orders-breakdown').text('');
    let customerOrders = admin.currentCustomer.generateAllRoomServicesForCustomer();
    if (customerOrders.length ===  0) {
      return `${currentCustomer.name} has no orders.`
    } else {
      return `<table class = "orders-by-date-table"> 
          <tr>
            <th>Sammy Ordered</th> 
            <th>Total Cost</th>
          </tr>
          <tr>
            ${domUpdates.customerOrders(admin)}
          </tr>
        </table>`
    }
  },

  customerOrders(admin) {
    let sortedData = admin.currentCustomer.generateAllRoomServicesForCustomer().map((order) => {
      return `<tr>
          <td>${order.food}</td> 
          <td>${'$' + order.totalCost}</td>
        </tr>`
    });
    return sortedData.join(' ');
  },

  showServicesByDate(admin, date) {
    $('.customer-orders-by-date').text('$' + admin.currentCustomer.calculateRoomServiceCostByDate(date)).hide().fadeIn(1000);
    $('form').trigger('reset');
  },

  focusSearchedCustomer(admin) {
    $('#current-customer-info').text('We\'re currently focusing on ' + currentCustomer.name + ', customer ID: ' + currentCustomer.id).hide().fadeIn(1000);
    domUpdates.showDefaultCustomerInformation(admin);
    $('#returned-name').text('');
    $('form').trigger('reset');
  },

  focusNewCustomer(admin) {
    let name = $('#enter-new-name').val();
    currentCustomer = admin.createNewCustomer(name);
    $('#current-customer-info').text('We\'re currently focusing on ' + currentCustomer.name + ', customer ID: ' + currentCustomer.id).hide().fadeIn(1000); //fadein not working...
    $('form').trigger('reset');
    $('#returned-name').text('');
    domUpdates.showDefaultCustomerInformation(admin);
  },

  changeContent() {
    $('.default').hide();
    $('.customer-view').show();
  }

};


export default domUpdates;