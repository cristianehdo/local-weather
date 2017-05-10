


APPID = "0411538bd3bf7707";
LATITUDE = "";
LONGITUDE = "";
CITY = "";
COUNTRY = "";

$(document).ready(function(){ 

	$.get("http://ipinfo.io", function(response) {
		CITY = response.city;
		COUNTRY = response.country;
	    $("#cityname").text(CITY);
	}, "jsonp");


	function updateData (json) {
	    var weather = json.current_observation.weather;
	    var humidity = json.current_observation.relative_humidity;
	    var temp_c = json.current_observation.temp_c;
	    var temp_f= json.current_observation.temp_f;
	    temp = Math.round(temp);
	    var city = json.name;
	   	$("#weather").text(weather);      
		$("#humidity").text(humidity); 
		$("#temp").text(temp_c);
		$("#degrees").text(mesure);

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


	$("#degrees").on("click", function(){
		if ($("#degrees").text() == "C°"){
			getData("imperial");
			mesure ="F°";
		} else {
			getData("metric");
			mesure = "C°";	
		}
	});
console.log(CITY);

	function getData(units) {
		var url = encodeURI("https://api.wunderground.com/api/" + APPID + "/conditions/q/" + COUNTRY + "/"+ CITY + ".json");
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
