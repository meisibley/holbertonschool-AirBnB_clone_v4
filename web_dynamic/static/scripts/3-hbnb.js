$(document).ready(function () {
  $('input[type=checkbox]').click(function () {
    const nameList = [];
    const ids = [];
    $('input[type=checkbox]:checked').each(function () {
      nameList.push($(this).attr('data-name'));
      ids.push($(this).attr('data-id'));
    });
    if (nameList.length === 0) {
      $('.amenities h4').html('&nbsp;');
    } else {
      $('.amenities h4').text(nameList.join(', '));
    }
    console.log(ids);
  });
});
  
$.get('http://0.0.0.0:5001/api/v1/status', function (info) {
  if (info.status === "OK"){
    $('#api_status').addClass('available');
  } else {
    $('#api_status').removeClass('available');
  }
});

$.ajax({
  type: 'POST',
  url: 'http://0.0.0.0:5001/api/v1/places_search',
  dataType: 'json',
  data: '{}',
  contentType: 'application/json; charset=utf-8',
  success: function (places) {
    for (let x = 0; x < places.length; x++) {
      $('.places').append(`<article>
<div class='title_box'>
<h2> ${places[x].name}</h2>
<div class='price_by_night'> ${places[x].price_by_night} </div>
</div>
<div class='information'>
<div class'max_guest'>${places[x].max_guest}
${places[x].max_guest > 1 ? 'Guests' : 'Guest'} </div>
<div class='number_rooms'>${places[x].number_rooms}
${places[x].number_rooms > 1 ? 'Bedrooms' : 'Bedroom'} </div>
<div class='number_bathrooms'>${places[x].number_bathrooms}
${places[x].number_bathrooms > 1 ? 'Bathrooms' : 'Bathroom'} </div>
</div>
<div class='user'>
</div>
<div class='description'>
${places[x].description}
</div>
</article>
`);
    }
  },
  error: function (xhr, status) {
    console.log('error ' + status);
  }
});
