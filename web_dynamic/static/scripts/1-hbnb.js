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