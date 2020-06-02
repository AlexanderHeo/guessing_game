$(document).ready(initializeApp);

var max_num = null;
var input = null;
var the_number = null;

function initializeApp() {
  addClickHandlers();
}

function addClickHandlers() {
  // $('.doorway').on('click', openDoor);
  $('.door').on('click', openingAnimation);
  $('.modalButton').on('click', chooseDifficulty);
  $('.inputButton').on('click', makeGuess);
  $('.gameButton').on('click', restart);
}

function openDoor() {
  // $('.doorway').addClass('hide');
  $('.door').removeClass('hide');
  $('.frame').removeClass('hide');
}

function openingAnimation() {
  $('.door').addClass('flip');
  setTimeout(function () {
    $('.opening').addClass('zoom');
  }, 2000);
  setTimeout(function () {
    $('.opening').addClass('hide');
    $('.forest').removeClass('hide').addClass('opacityIn');
    $('.startModal').removeClass('hide');
  }, 2500);
}

function chooseDifficulty(event) {
  var difficulty = $(event.currentTarget);
  if (difficulty[0].id === 'easyButton') {
    max_num = 10;
  } else if (difficulty[0].id === 'mediumButton') {
    max_num = 20;
  } else if (difficulty[0].id === 'hardButton') {
    max_num = 30;
  } else if (difficulty[0].id === 'impossibleButton') {
    max_num = 50;
  }
  $('.startModal').addClass('hide');
  $('.game').removeClass('hide');
  $('#maxNumSpan').text(max_num);
  the_number = randomNumber(max_num);
  console.log('max_num:', max_num);
  console.log('the_number:', the_number);
}

function makeGuess() {
  input = $('#guessInput').val();
  if (!input) {
    $('.guessResponse').text('You need to input a number.');
  } else if (input < 1 || input > max_num) {
    $('.guessResponse').text(`The number needs to be between 1 and ${max_num}.`);
  } else if (input) {
    if (input < the_number) {
      $('.guessResponse').text('Too low. Try a bigger number.');
    } else if (input > the_number) {
      $('.guessResponse').text('Too high. Try a smaller number.');
    } else {
      $('.gameButtons').removeClass('hide');
      $('.gameButtons').attr('display', 'flex');
      $('.gameButton').removeClass('hide');
      $('.guessResponse').text('Good job! You can play again, or leave the forest.');
    }
  }
}

function randomNumber(max_num) {
  return Math.floor(Math.random() * max_num + 1);
}

function restart(event) {
  console.log($(event.currentTarget));
  var restartButton = $(event.currentTarget);
  console.log(restartButton[0].id);
  if (restartButton[0].id === 'playAgain') {
    $('.startModal').removeClass('hide');
    $('.game').addClass('hide');
    $('#guessInput').val('');
    $('.guessResponse').text('');
    $('.gameButtons').addClass('hide');
  } else if (restartButton[0].id === 'leave') {
    $('body').remove();
  }
}
