$(document).ready(function () {
  function getData (zipCode) {
    let url = 'https://opentable.herokuapp.com/api/restaurants?zip=' + zipCode
    fetch(url)
            .then((resp) => resp.json())
            .then(function (data) {
              console.log(data)

              if (data < 1) {
                $('.restaurant-options').html('<h5>No restaurants in range. Sorry!</h5>')
              } else {
                $('.restaurant-options').append('Showing results for: ' + zipCode)
              }

              for (var i = 0; i < data.restaurants.length; i++) {
                var restaurantsDiv = $('<div data-aos="flip-left" class="small-12 columns restaurant">')
                var picContainer = $('<img class="restaurant-logo-dineout">')
                var photo = data.restaurants[i].image_url
                var name = data.restaurants[i].name
                var address = data.restaurants[i].address
                var city = data.restaurants[i].city
                var state = data.restaurants[i].state
                var zip = data.restaurants[i].postal_code
                var phone = data.restaurants[i].phone
                var reservationLink = data.restaurants[i].mobile_reserve_url
                var locationInfo = $('<p>').html(name + '<br>' + address + '<br>' + city + ', ' + state + ', ' + zip + '<br>' + phone)
                var reservationButton = $('<a class="button secondary order-button">').text('Reserve a Table')

                console.log(restaurantsDiv)
                picContainer.attr('src', photo)
                restaurantsDiv.append(picContainer)
                restaurantsDiv.append(locationInfo)
                reservationButton.attr('href', reservationLink)
                reservationButton.text('Reserve a Table Now')
                restaurantsDiv.append(reservationButton)

                $('.restaurant-options').append(restaurantsDiv)
              }
            })
  }

  $('#submit-zipcode').on('click', function (event) {
    event.preventDefault()
    $('.restaurant-options').empty()
    var zipCode = $('#zipcode-input').val().trim()
    getData(zipCode)
  })
})
    // Document ready closing tag
