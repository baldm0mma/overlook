import $ from 'jquery';

let currentCustomer;

const domUpdates = {
  
  populateAllTabs(admin) {
    $('#todays-date').text(admin.today).hide().fadeIn(1000);
    $('#hotel-name').text('');
    $('#hotel-name').append('Welcome back').hide().fadeIn(1000);
    $('.total-rooms').text(admin.hotelBenchmarks.generateAvailableRoomNumbersByDate(admin.today).length).hide().fadeIn(1000);
    $('.total-earned').text('$' + parseFloat(admin.hotelBenchmarks.calculateAllDebtsToday(admin.today)).toFixed(2)).hide().fadeIn(1000);
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
      $('#returned-name').text('That person doesn\'t exsist in our system...').hide().fadeIn(1000);
      $('form').trigger('reset');
    }
  },

  showDefaultCustomerInformation(admin) {
    $('.current-customer-name').text(currentCustomer.name);
    $('.customer-total-orders').text('$' + admin.currentCustomer.calculateLifetimeRoomServiceCost());
    $('.orders-breakdown').append(domUpdates.displayCustomerOrders(admin));
    $('.past-bookings').append(domUpdates.displayCustomerBookingHistory(admin));
    $('.make-a-booking').append(domUpdates.displayAllAvailableRoomsToday(admin));
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
            <th>Cost</th>
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

  findBookingsByDate(admin, date) {
    $('.bookings-by-date-display').append(domUpdates.displayBookingsByDate(admin, date));
    $('form').trigger('reset');
  },

  displayBookingsByDate(admin, date) {
    $('.bookings-by-date-display').text('');
    let currentBookings = admin.hotelBenchmarks.bookingsByDate(date);
    if (currentBookings.length ===  0) {
      return `There are no bookings for that date.`
    } else {
      return `<table class = "bookings-by-date-table"> 
          <tr>
            <th>Date</th> 
            <th>Room Number</th>
          </tr>
          <tr>
            ${domUpdates.createBookingByDate(admin, date)}
          </tr>
        </table>`
    }
  },

  createBookingByDate(admin, date) {
    let sortedData = admin.hotelBenchmarks.bookingsByDate(date).map((booking) => {
      return `<tr>
          <td>${booking.date}</td> 
          <td>${'#' + booking.roomNumber}</td>
        </tr>`
    });
    return sortedData.join(' ');
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
    $('#current-customer-info').text('We\'re currently focusing on ' + currentCustomer.name + ', customer ID: ' + currentCustomer.id).hide().fadeIn(1000);
    $('form').trigger('reset');
    $('#returned-name').text('');
    domUpdates.showDefaultCustomerInformation(admin);
  },

  displayCustomerBookingHistory(admin) {
    $('.past-bookings').text('');
    let bookingsHistory = admin.currentCustomer.returnAlltimeCustomerBookings();
    if (bookingsHistory.length ===  0) {
      return `This customer has no bookings.`
    } else {
      return `<table class = "bookings-for-customer"> 
          <tr>
            <th>Date</th> 
            <th>Room Number</th>
          </tr>
          <tr>
            ${domUpdates.createBookingHistory(admin)}
          </tr>
        </table>`
    }
  },

  createBookingHistory(admin) {
    let sortedData = admin.currentCustomer.returnAlltimeCustomerBookings().map((booking) => {
      return `<tr>
          <td>${booking.date}</td> 
          <td>${'#' + booking.roomNumber}</td>
        </tr>`
    });
    return sortedData.join(' ');
  },

  displayAllAvailableRoomsToday(admin) {
    $('.make-a-booking').text('');
    return `<table class = "all-available-bookings"> 
          <tr>
            <th>Room Number</th> 
            <th>Room Type</th>
            <th>Bidet?</th>
            <th>Bed Size</th>
            <th>Number of Beds</th>
            <th>Cost</th>
            <th>Book Room?</th>
          </tr>
          <tr>
            ${domUpdates.createAvailableRoom(admin)}
          </tr>
        </table>`
  },

  createAvailableRoom(admin) {
    let sortedData = admin.hotelBenchmarks.generateFullRoomInformation('available', admin.today).map((room) => {
      return `<tr>
          <td>${room.number}</td>
          <td>${room.roomType}</td>
          <td>${room.bidet ? 'Hell yeah!' : 'Sorry, poop like an animal'}</td>
          <td>${room.bedSize}</td>
          <td>${room.numBeds}</td>
          <td>${'$' + room.costPerNight}</td>
          <td><button type="button" id="${room.number}">Book</button></td>
        </tr>`
    });
    return sortedData.join(' ');
  },

  bookARoomOnClick(admin, roomNumber) {
    admin.bookARoom(admin.today, roomNumber);
    $('.make-a-booking').text('');
    $('.make-a-booking').append(domUpdates.displayAllAvailableRoomsToday(admin));
    $('.past-bookings').append(domUpdates.displayCustomerBookingHistory(admin));
  },

  changeContentFromGeneralToCustomer() {
    $('.default').hide();
    $('.customer-view').show();
  },

  initiateSearchContent() {
    $('.rooms.section.2.customer-view').hide();
    $('.search-view').fadeIn(1000);
  },

  displaySearchedRoomsToday(admin, type, date) {
    $('.make-a-booking').text('');
    return `<table class = "all-available-bookings"> 
          <tr>
            <th>Room Number</th> 
            <th>Room Type</th>
            <th>Bidet?</th>
            <th>Bed Size</th>
            <th>Number of Beds</th>
            <th>Cost</th>
            <th>Book Room?</th>
          </tr>
          <tr>
            ${domUpdates.createSearchedRoom(admin, type, date)}
          </tr>
        </table>`
  },

  createSearchedRoom(admin, type, date) {
    let sortedData = admin.hotelBenchmarks.generateRoomByType(type, date).map((room) => {
      return `<tr>
          <td>${room.number}</td>
          <td>${room.roomType}</td>
          <td>${room.bidet ? 'Hell yeah!' : 'Sorry, poop like an animal'}</td>
          <td>${room.bedSize}</td>
          <td>${room.numBeds}</td>
          <td>${'$' + room.costPerNight}</td>
          <td><button type="button" id="${room.number}">Book</button></td>
        </tr>`
    });
    return sortedData.join(' ');
  },

  searchByType(admin, type, date) {
    $('.search-view').hide();
    $('.make-a-booking').text('');
    $('.make-a-booking').append(domUpdates.displaySearchedRoomsToday(admin, type, date));
    $('.rooms.section.2.customer-view').fadeIn(1000);
  },

  chooseSammy(admin, sammy) {
    admin.purchaseRoomService(sammy, 10);
    domUpdates.populateAllTabs(admin);
    domUpdates.showDefaultCustomerInformation(admin);
    $('.services-view').hide();
    $('#all-rooms-view').fadeIn(1000);
  }

};


export default domUpdates;