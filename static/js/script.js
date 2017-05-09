


APPID = "49a7669d694c5f864e8b938ba081ee61";
LATITUDE = "";
LONGITUDE = "";

$(document).ready(function(){ 

	$.get("http://ipinfo.io", function(response) {
		var city = response.city;
		var country= response.country;
	    $("#cityname").text(city);
	}, "jsonp");


	function updateData (data) {
	    var rawJson = JSON.stringify(data);
	    var json = JSON.parse(rawJson);
	    var weather = json.weather[0].description;
	    var humidity = json.main.humidity;
	    var temp = json.main.temp;
		$("#weather").text(weather);      
		$("#humidity").text("humidity: "+humidity+"%"); 
		$("#temp").text(temp);
		$("#degrees").text(mesure);

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
			$("#icon").html("");
			$("#icon").html(icon);
	}


	$("#degrees").on("click", function(){
		if ($("#degrees").text() == "C°"){
			getData("imperial");
			mesure ="F°";
		} else {
			getData("metric");
			mesure = "C°";	
		}
	});

	function getData(units) {
		var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + LATITUDE + "&lon=" + LONGITUDE + "&units=" + units + "&APPID=" + APPID;
	    $.getJSON(url, updateData);
	}

	if (navigator.geolocation) {

		var currentPosition;	
		navigator.geolocation.getCurrentPosition(function(position) {
		    var currentPosition = position;
		    LATITUDE = position.coords.longitude;
		    LONGITUDE = position.coords.latitude;
		    getData("metric");
		    mesure = "C°";    

		});
	}

});
