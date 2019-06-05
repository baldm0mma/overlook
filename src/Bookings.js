class Bookings {
  constructor(bookings, id, today, roomNum) {
    this.bookings = bookings;
    this.userID = id;
    this.date = today;
    this.roomNumber = roomNum;
  }

  generateMostPopularBookingDate() {
    let mostPopularDates = this.bookings.reduce((dates, booking) => {
      if (!dates[booking.date]) {
        dates[booking.date] = 1;
      } else {
        dates[booking.date]++;
      }
      return dates;
    }, {});
    let maxNum = Math.max(...Object.values(mostPopularDates));
    return Object.keys(mostPopularDates).find(date => mostPopularDates[date] === maxNum);
  }

}

export default Bookings;