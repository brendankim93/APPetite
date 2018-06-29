$(document).ready(function () {
  // Pulls restaurant data
  $('#submit-address').on('click', function restaurantResults (event) {
    event.preventDefault()
    $('.restaurant-options').empty()
    var queryAddress = $('#address-input').val().trim()
    // var queryAddress = '54+E+Peltason+Dr,+Irvine,+CA+92617' // Test address
    if (queryAddress === '') {
      $('.restaurant-options').html('<h4 class="error">Please input an address</h4>')
    } else {
      var queryURL = 'https://api.eatstreet.com/publicapi/v1/restaurant/search?method=delivery&street-address=' +
        queryAddress + '&access-token=e4d79c106ba7c4b2'
      $.ajax({
        url: queryURL,
        method: 'GET'
      }).done(function (response) {
        console.log(response)
        var results = response.restaurants
        if (results < 1) {
          $('.restaurant-options').html('<h5>No restaurants in range. Sorry!</h5>')
        } else {
          $('.restaurant-options').append('Showing results for: ' + queryAddress)
        }
        // Runs through response array
        for (var i = 0; i < results.length; i++) {
          if (results[i].open === true) {
            // Creates container for restaurants
            var restaurantDiv = $('<div data-aos ="flip-left" class="small-12 columns restaurant">')
            var restaurantName = results[i].name
            restaurantDiv.attr('data-apiKey', results[i].apiKey)
            // console.log(restaurantDiv)
            var p1 = $('<p>').text(restaurantName)
            // Pulls image for logo
            var restaurantLogo = $('<img class="restaurant-logo delivery-logo">')
            restaurantLogo.attr('src', results[i].logoUrl)
            // Pulls address for restaurant
            var restaurantAddress = results[i].streetAddress
            var restaurantCity = results[i].city
            var restaurantState = results[i].state
            var restaurantZip = results[i].zip
            // Pulls restaurant business hours
            var restaurantHours = results[i].hours
            var hoursM = restaurantHours.Monday
            if (hoursM === undefined) {
              hoursM = 'Closed'
            }
            var hoursT = restaurantHours.Tuesday
            if (hoursT === undefined) {
              hoursT = 'Closed'
            }
            var hoursW = restaurantHours.Wednesday
            if (hoursW === undefined) {
              hoursW = 'Closed'
            }
            var hoursTh = restaurantHours.Thursday
            if (hoursTh === undefined) {
              hoursTh = 'Closed'
            }
            var hoursF = restaurantHours.Friday
            if (hoursF === undefined) {
              hoursF = 'Closed'
            }
            var hoursSa = restaurantHours.Saturday
            if (hoursSa === undefined) {
              hoursSa = 'Closed'
            }
            var hoursSu = restaurantHours.Sunday
            if (hoursSu === undefined) {
              hoursSu = 'Closed'
            }
            var p4 = $('<p class="restaurant-hours">').html('<ul style="list-style: none;"><li>Monday: ' + hoursM + '</li><li>Tuesday: ' + hoursT + '</li><li>Wednesday: ' + hoursW + '</li><li>Thursday: ' + hoursTh + '</li><li>Friday: ' + hoursF + '</li><li>Saturday: ' + hoursSa + '</li><li>Sunday: ' + hoursSu + '</li></ul>')
            var deliveryMin = parseFloat(results[i].deliveryMin)
            var deliveryFee = parseFloat(results[i].deliveryPrice)
            var minWait = results[i].minWaitTime
            var maxWait = results[i].maxWaitTime
            var deliveryTimeframe = $('<p>').text('Estimated wait time: ' + minWait + '-' + maxWait + ' minutes')
            var orderLink = results[i].url
            var orderButton = $('<a class="button secondary order-button">').text('Order Here')
            orderButton.attr('href', orderLink)
            var restaurantType = results[i].foodTypes
            var p2 = $('<p>').text(restaurantAddress + ', ' + restaurantCity + ', ' + restaurantState + ', ' + restaurantZip)
            var p3 = $('<p>').text(restaurantType)
            var deliveryDetails = $('<p>').text('Delivery Minimum: $' + deliveryMin + ', ' + 'Delivery Fee: $' + deliveryFee)
            var restaurantContact = results[i].phone
            var phoneNumber = $('<p>').text(restaurantContact)
            var logoDiv = $('<div class="small-12 medium-2 columns">')
            var restaurantInfoDiv = $('<div class="small-12 medium-10 columns">')
            restaurantDiv.append(logoDiv)
            restaurantDiv.append(restaurantInfoDiv)
            restaurantDiv.append(restaurantInfoDiv)
            .prepend(orderButton)
            restaurantInfoDiv.append(p4)
            restaurantInfoDiv.append(p1)
            logoDiv.prepend(restaurantLogo)
            restaurantInfoDiv.append(deliveryDetails)
            restaurantInfoDiv.append(deliveryTimeframe)
            restaurantInfoDiv.append(phoneNumber)
            restaurantInfoDiv.append(p2)
            restaurantInfoDiv.append(p3)
            $('.restaurant-options').append(restaurantDiv)
            $('#address-input').val('')
          }
        }
      })
    }
  })
})
