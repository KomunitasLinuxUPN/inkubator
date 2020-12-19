/* eslint-disable no-undef */
$(document).ready(() => {
  // Mobile sidenav
  $('.sidenav').sidenav();

  // Materialize select option
  $('select').formSelect();

  $('a#btn-logout').click(() => {
    $('form#form-logout').submit();
    return false;
  });
});
