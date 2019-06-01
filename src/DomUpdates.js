import $ from 'jquery';
// import Admin from './Admin';

const domUpdates = {
  
  populateAllTabs(admin) {
    $('.total-rooms').text(admin.hotel.generateAvailableRoomNumbers().length);
    $('.total-earned').text(admin.hotel.calculateDebtsToday());
    $('.percent-occupied').text(admin.hotel.showPercentageOfRoomsOccupiedToday());
    // domUpdates.populateCatagories(game);
  },

  populateCatagories(game) {
    $('.main__game-category-1').text(game.round.categoryTitles[0]);
    $('.main__game-category-2').text(game.round.categoryTitles[1]);
    $('.main__game-category-3').text(game.round.categoryTitles[2]);
    $('.main__game-category-4').text(game.round.categoryTitles[3]);
    game.round.startingPrompt();
    domUpdates.populateClues(game);
  },

};



export default domUpdates;