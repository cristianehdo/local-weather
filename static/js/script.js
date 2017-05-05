



if (navigator.geolocation) {

	var currentPosition;	
	navigator.geolocation.getCurrentPosition(function(position) {
    var currentPosition = position;
    var latitude = position.coords.longitude;
    var longitude = position.coords.latitude;
    $("#coords").html("latitude: " + latitude + "<br>longitude: " + longitude);

    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=49a7669d694c5f864e8b938ba081ee61", function (data) {
        var rawJson = JSON.stringify(data);
        var json = JSON.parse(rawJson);
        var weather = json.weather[0].description;
        var humidity = json.main.humidity;
		$("#weather").html(weather);      
		$("#humidity").html("humidity: "+humidity+"%"); 
    });

  });
	$.get("http://ipinfo.io", function(response) {
	var city = response.city;
	var country= response.country;
    $("#city").html(city);
}, "jsonp");


}


   