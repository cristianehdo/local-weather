


APPID = "0411538bd3bf7707";
LATITUDE = "";
LONGITUDE = "";
CITY = "";
COUNTRY = "";
tempF = "";
tempC = "";

$(document).ready(function(){ 

	$.get("https://ipinfo.io", function(response) {
		CITY = response.city;
		COUNTRY = response.country;
	    $("#cityname").text(CITY);
	}, "jsonp");


	function updateData (json) {
	    var weather = json.current_observation.weather;
	    var humidity = json.current_observation.relative_humidity;
	    var tempC = Math.round(json.current_observation.temp_c);
	    var tempF = Math.round(json.current_observation.temp_f);
	   	$("#weather").text(weather);      
		$("#humidity").text(humidity); 
		$("#tempC").text(tempC);
		$("#tempF").text(tempF);
		$(".tempF").hide();

		var date = new Date();
		var time = date.toLocaleTimeString();
		var utcDay = date.getUTCDay();
		var week = {
			0 : "Sunday",
			1 : "Monday",
			2 : "Tusday",
			3 : "Wednesday",
			4 : "Thrisday",
			5 : "Friday",
			6 : "Saturday"
		}
		var weekday = week[utcDay];
		$("#weekday").text(weekday);
		$("#time").text(time);

		var iconStatus = { 
			"Clear Sky": "SUN",
			"Few Clouds": "LIGHTCLOUD",
			"Partly Cloudy": "PARTLYCLOUD",
			"Scattered Clouds": "PARTLYCLOUD",
			"Broken Clouds": "PARTLYCLOUD",
			"Light Rain":"LIGHTRAIN", 
			"Shower Rain": "LIGHTRAINSUN", 
			"Rain": "RAIN",
			"Thunderstorm": "RAINTHUNDER",
			"Snow": "SNOW",
			"Mist": "FOG"
		}
			var iconweather = iconStatus[weather];
			var icon = WeatherIcon.add('icon', WeatherIcon[iconweather], { mode:WeatherIcon.time, stroke:true, shadow:true, animated:true } );
			$("#icon").html(icon);
	}


	$(".temp").on("click", function(){
		$(".tempC").toggle();
		$(".tempF").toggle();
	});


	function getData() {
		var url = encodeURI("https://api.wunderground.com/api/" + APPID + "/conditions/q/" + COUNTRY + "/"+ CITY + ".json");
	    $.getJSON(url, updateData);
	}

	if (navigator.geolocation) {
		var currentPosition;	
		navigator.geolocation.getCurrentPosition(function(position) {
		    var currentPosition = position;
		    LATITUDE = position.coords.longitude;
		    LONGITUDE = position.coords.latitude;
		    getData();
		        
		});
	}

});
