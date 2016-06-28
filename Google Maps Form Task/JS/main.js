	
var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 42.6728377, lng: 23.3334814},
		zoom: 8
	});
	var input = document.getElementById('addr');         
	var autocomplete = new google.maps.places.Autocomplete(input, {
		types: ["geocode"]
	});          

	autocomplete.bindTo('bounds', map); 
	var infowindow = new google.maps.InfoWindow(); 

	google.maps.event.addListener(autocomplete, 'place_changed', function() {
		infowindow.close();
		var place = autocomplete.getPlace();
		if (place.geometry.viewport) {
			map.fitBounds(place.geometry.viewport);
		} else {
			map.setCenter(place.geometry.location);
			map.setZoom(17);  
		}
	});  
}


jQuery(document).ready(function() {
	jQuery(document).on("click", "#Lm", function(e) {
		e.preventDefault();
		var latLng = jQuery(this).attr("data-latLng");			
		initialize(latLng);
	});
	var map;
	var geocoder;
	var mapOptions = { center: new google.maps.LatLng(0.0, 0.0), zoom: 2,
		mapTypeId: google.maps.MapTypeId.ROADMAP };

		function initialize() {
			var myOptions = {
				center: new google.maps.LatLng(42.6728377, 23.3334814 ),
				zoom: 8,

			};

			geocoder = new google.maps.Geocoder();
			var map = new google.maps.Map(document.getElementById("mapLm"),
				myOptions);
			google.maps.event.addListener(map, 'click', function(event) {
				placeMarker(event.latLng);
			});

			var marker;
			function placeMarker(location) {
				if(marker){
					marker.setPosition(location); 
				}else{
					marker = new google.maps.Marker({ 
						position: location, 
						map: map
					});
				}

				getAddress(location);
			}

			function getAddress(latLng) {
				geocoder.geocode( {'latLng': latLng},
					function(results, status) {
						if(status == google.maps.GeocoderStatus.OK) {
							if(results[0]) {
								$("#addr").val(results[0].formatted_address);
							}
							else {
								$("#addr").val("No results");
							}
						}
						else {
							$("#addr").val(status);
						}
					});
			}
		}
	});	
var inputs = $("form#myForm input");

var validateInputs = function validateInputs(inputs) {
	var validForm = true;
	inputs.each(function(index) {
		var input = $(this);
		if (!input.val()) {
			$("#done").attr("disabled", "disabled");
			validForm = false;
		}
	});
	return validForm;
}
inputs.change(function() {
	if (validateInputs(inputs)) {
		$("#done").removeAttr("disabled");
	}
});

jQuery(document).ready(function() {
	jQuery(document).on("click", "#done",  function(e) {
		e.preventDefault();
		var data = {
			"First name":$("#Fname").val(),
			"Last name": $("#Lname").val(),
			"Address": $("#addr").val(),
			"Email":$("#email").val(),
			"Phone":$("#phone").val(),
			"Website":$("#web").val(),
		};
		if (typeof(Storage) !== "undefined") {
			localStorage.setItem("data", JSON.stringify(data));
			$("#mapLm").html(localStorage.getItem("data"));
		} else {
			$("#mapLm").val("Sorry, your browser does not support Web Storage...")
		}

	});
});




