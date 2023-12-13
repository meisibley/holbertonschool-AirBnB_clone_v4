$(document).ready(function () {
  let checkedAmenityList = [];
  $('input:checkbox').on('change', function () {
    const anAmenityObject = { id: $(this).data('id'), name: $(this).data('name') };
    if (this.checked) {
      checkedAmenityList.push(anAmenityObject);
    } else {
      checkedAmenityList = checkedAmenityList.filter(item => item.id !== anAmenityObject.id);
    }
    const checkedAmenities = checkedAmenityList.map(item => item.name).join(', ');
    $('.amenities h4').text(checkedAmenities);
    console.log(checkedAmenityList);
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
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    dataType: 'json',
    data: '{}',
    contentType: 'application/json; charset=utf-8',
    success: function (places) {
      for (let x = 0; x < places.length; x++) {
        $('.places').append(
          `<article>
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
          </article>`
        );
      }
    },
    error: function (xhr, status) {
      console.log('error ' + status);
    }
  });
  $('button').click(function () {
    const amenityIds = checkedAmenityList.map(item => item.id);
    console.log('This is what has being POSTed: ', amenityIds);
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: amenityIds }),
      success: function (data) {
        console.log(data);
        $('section.places').empty();
        for (const places of data) {
          $('.places').append(
            `<article>
              <div class="title_box">
                <h2>${places.name}</h2>
                <div class="price_by_night">
                  <p>$${places.price_by_night}</p>
                </div>
              </div>
              <div class="information">
                <div class="max_guest">
                  ${places.max_guest} Guest(s)
                </div>
                <div class="number_rooms">
                  ${places.number_rooms} Room(s)
                </div>
                <div class="number_bathrooms">
                  ${places.number_bathrooms} Bathroom(s)
                </div>
              </div>
              <div class="description">
                <p>${places.description}</p>
              </div>
            </article>`
          );
        }
      }
    });
  });
});