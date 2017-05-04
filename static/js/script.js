



if (navigator.geolocation) {
	
	var currentPosition;	
	navigator.geolocation.getCurrentPosition(function(position) {
    $("#coords").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
    // var currentPosition = position;

  });


}


   


// server = api.openweathermap.org
// http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={49a7669d694c5f864e8b938ba081ee61}