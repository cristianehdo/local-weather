

APPID = "49a7669d694c5f864e8b938ba081ee61";

if (navigator.geolocation) {

	var currentPosition;	
	navigator.geolocation.getCurrentPosition(function(position) {
    var currentPosition = position;
    var latitude = position.coords.longitude;
    var longitude = position.coords.latitude;
    $("#coords").html("latitude: " + latitude + "<br>longitude: " + longitude);
    var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=metric&APPID="+APPID;

    $.getJSON(url, function (data) {
        var rawJson = JSON.stringify(data);
        var json = JSON.parse(rawJson);
        var weather = json.weather[0].description;
        var humidity = json.main.humidity;
        var temp = json.main.temp;
		$("#weather").html(weather);      
		$("#humidity").html("humidity: "+humidity+"%"); 
		$("#temp").html(temp);

		var iconStatus = { 
			"clear sky": "SUN",
			"few clouds": "LIGHTCLOUD",
			"scattered clouds": "PARTLYCLOUD",
			"broken clouds": "PARTLYCLOUD",
			"light rain":"LIGHTRAIN", 
			"shower rain": "LIGHTRAINSUN", 
			"rain": "RAIN",
			"thunderstorm": "RAINTHUNDER",
			"snow": "SNOW",
			"mist": "FOG"
		}
		var iconweather = iconStatus[weather];
		var icon = WeatherIcon.add('icon', WeatherIcon[iconweather], { mode:WeatherIcon.NIGHT, stroke:true, shadow:true, animated:true } );
    	$("#icon").add(icon);

    });

  });
	$.get("http://ipinfo.io", function(response) {
	var city = response.city;
	var country= response.country;
    $("#cityname").html(city);
}, "jsonp");



}


   