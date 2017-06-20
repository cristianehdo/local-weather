

LATITUDE = "";
LONGITUDE = "";
CITY = "";
COUNTRY = "";
tempF = "";
tempC = "";

$(document).ready(function(){ 


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
			"Clear": "SUN",
			"Few Clouds": "LIGHTCLOUD",
			"Partly Cloudy": "PARTLYCLOUD",
			"Mostly Cloudy": "PARTLYCLOUD",
			"Scattered Clouds": "PARTLYCLOUD",
			"Broken Clouds": "PARTLYCLOUD",
			"Overcast": "PARTLYCLOUD",
			"Light Rain":"LIGHTRAIN", 
			"Shower Rain": "LIGHTRAINSUN", 
			"Light Drizzle": "LIGHTRAINSUN",
			"Heavy Drizzle": "LIGHTRAINSUN",
			"Light Rain": "RAIN",
			"Heavy Rain": "RAIN",
			"Light Freezing Rain": "RAIN",
			"Heavy Freezing Rain": "RAIN",
			"Light Rain Showers": "RAIN",
			"Heavy Rain Showers": "RAIN",
			"Light Rain Mist": "RAIN",
			"Heavy Rain Mist": "RAIN",
			"Thunderstorm": "RAINTHUNDER",
			"Funnel Cloud": "RAINTHUNDER",
			"Light Thunderstorms and Rain": "RAINTHUNDER",
			"Heavy Thunderstorms and Rain": "RAINTHUNDER",
			"Light Thunderstorms and Snow": "RAINTHUNDER",
			"Heavy Thunderstorms and Snow": "RAINTHUNDER",
			"Light Thunderstorm": "RAINTHUNDER",
			"Heavy Thunderstorm": "RAINTHUNDER",
			"Light Thunderstorms with Hail": "RAINTHUNDER",
			"Heavy Thunderstorms with Hail": "RAINTHUNDER",
			"Light Thunderstorms with Small Hail": "RAINTHUNDER",
			"Heavy Thunderstorms with Small Hail": "RAINTHUNDER",
			"Snow": "SNOW",
			"Fog": "FOG",
			"Light Fog": "FOG",
			"Heavy Fog": "FOG",
			"Light Fog Patches": "FOG",
			"Heavy Fog Patches": "FOG",
			"Shallow Fog": "FOG",
			"Partial Fog": "FOG",
			"Patches of Fog": "FOG",
			"Light Mist": "FOG",
			"Light Freezing Fog": "FOG",
			"Heavy Freezing Fog": "FOG",
			"Light Mist": "FOG",
			"Heavy Mist": "FOG"



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
		var url = encodeURI("https://api.nanook.com.br" + "/conditions/q/" + COUNTRY + "/"+ CITY + ".json");
	    $.getJSON(url, updateData);
	}

	
	$.get("https://ipinfo.io", function(response) {
		CITY = response.city;
		COUNTRY = response.country;
	    $("#cityname").text(CITY);
	    getData();
	}, "jsonp");


});
