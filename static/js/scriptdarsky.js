


APPID = "2e139b71f2caa430c08de258bd2166c2";
LATITUDE = "";
LONGITUDE = "";
CITY = "";


$(document).ready(function(){ 

	$.get("http://ipinfo.io", function(response) {
		CITY = response.city;
	    $("#cityname").text(CITY);
	}, "jsonp");


	function updateData (json) {
		var json = json;
	    var weather = json.currently.summary;
	    var humidity = json.currently.humidity;
	    var temp = json.currently.temperature;
	    temp = Math.round(temp);
	    $("#weather").text(weather);      
		$("#humidity").text(humidity); 
		$("#temp").text(temp);
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
			var icon = WeatherIcon.add('icon', WeatherIcon[iconweather], { mode:WeatherIcon.time, stroke:true, shadow:true, animated:true } );
			$("#icon").html(icon);
	}


	$("#degrees").on("click", function(){
		if ($("#degrees").text() == "C°"){
			getData("us");
			mesure ="F°";
		} else {
			getData("si");
			mesure = "C°";	
		}
	});

	function getData(units) {
		var url = "https://api.darksky.net/forecast/" + APPID + "/" + LATITUDE + "," + LONGITUDE; 
		// + "units=" + units;
	    $.getJSON(url, updateData);
	}

	if (navigator.geolocation) {
		var currentPosition;	
		navigator.geolocation.getCurrentPosition(function(position) {
		    var currentPosition = position;
		    LATITUDE = position.coords.longitude;
		    LONGITUDE = position.coords.latitude;
		    getData("si");
		    mesure = "C°";    
		});
	}

});
