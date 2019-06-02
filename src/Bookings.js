class Bookings {
  constructor(data) {
    this.bookings = data.bookings;
  }

  generateMostPopularBookingDate() {
    return this.bookings.reduce((popularDates, booking) => {
      if (!popularDates[booking.date]) {
        popularDates[booking.date] = 1;
      } else {
        popularDates[booking.date]++;
      }
      return popularDates;
    }, {});
  }

}

export default Bookings;