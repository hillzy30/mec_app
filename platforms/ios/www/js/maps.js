// JavaScript Document
	var map;
    var markers = [];
    var long,lat;
    var TO,FROM;
    var DECK = [];
    var STAGE=0;
    var winTimer=true;
    var watchID;
    var degree=0;
    var hideCounter=0;
    var loop;
function nextPoint(){
    document.getElementById('mainMenu').style.display = "none";
    hideInfo();
    reloadMap(STAGE);
    STAGE++;
}

function reloadMap(x){
    lat = DECK[STAGE].lat;
    long = DECK[STAGE].lng;
   document.getElementById('infoScreen').innerHTML = DECK[STAGE].desc;
    initMap();
}


function loadDeck(dk){
if(dk==1)DECK = [
{lat: -33.852141, lng: 151.210489, desc: '1<br><button onclick="nextPoint()" class="btn btn-success btn-block">Next</button>'},
{lat: -33.9, lng: 151.182, desc:'2<br><button onclick="end()" class="btn btn-success btn-block">Finish</button>'}];

if(dk==2)DECK = [
{lat: -33.870406, lng: 151.206045, desc: '1<br><button onclick="nextPoint()" class="btn btn-success btn-block">Next</button>'},
{lat: -33.5, lng: 151.182, desc:'2<br><button onclick="end()" class="btn btn-success btn-block">Finish</button>'}];

if(dk==3)DECK = [
{lat: -33.870406, lng: 151.206045, desc: '1<br><button onclick="nextPoint()" class="btn btn-success btn-block">Next</button>'},
{lat: -33.5, lng: 151.182, desc:'2<br><button onclick="end()" class="btn btn-success btn-block">Finish</button>'}];
    
    nextPoint();
}
function end(){
    navigator.geolocation.clearWatch(watchID);
    STAGE = 0;
    hideInfo();
    document.getElementById('mainMenu').style.display = "block";
    
}
      function initMap() {
          loading();
          //load direction services
		var directionsService = new google.maps.DirectionsService;
		var directionsDisplay = new google.maps.DirectionsRenderer({preserveViewport: true,suppressMarkers: true});
          
          //setup map
        var haightAshbury = {lat: lat, lng: long};
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 18,
          center: haightAshbury,
		  streetViewControl: false,
		  gestureHandling: 'greedy',
          mapTypeId: 'roadmap'
        });
          directionsDisplay.setMap(map);
          var noPoi = [{featureType: "poi",stylers: [{ visibility: "off" }]}];
		map.setOptions({draggableCursor:'crosshair',draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true,disableDefaultUI: true,styles: noPoi});
          
          
          /*navigator.compass.watchHeading(onSuccess);
          function onSuccess(heading) {
              degree = heading.magneticHeading;
            
          };*/
          
          cnr=0;
          
          function initialLoad(){
              cnr++;
              navigator.geolocation.getCurrentPosition(onPositionUpdate, onError, {timeout: 0,enableHighAccuracy: true,maximumAge: 0});
              if(cnr<10)setTimeout(initialLoad,1000);
          }
          initialLoad();
          function onError(error) {}
          
          function updateLocation(){
              hideCounter++;
              navigator.geolocation.clearWatch(watchID);
              watchID = navigator.geolocation.watchPosition(onPositionUpdate, onError, {timeout: 0,enableHighAccuracy: true,maximumAge: 0});
             //loop = setTimeout(updateLocation,3500);
          }
          //update position and recalulate route
          
          updateLocation();
          
          function onPositionUpdate(position){
              hideLoading();
              
            //get current coordinates
            var lats = position.coords.latitude;
            var lngs = position.coords.longitude;
            
            FROM = {lat: lats, lng: lngs};
              TO = {lat: lat, lng: long};
            moveMe(FROM);
              if(getDistance(FROM, TO)<30 && winTimer){
                  winTimer = false;
                  displayInfo();
                  setTimeout(function(){winTimer=true;},1000);
              }
            resentr();
            calculateAndDisplayRoute(directionsService, directionsDisplay);
          }
                        
          function calculateAndDisplayRoute(directionsService, directionsDisplay) {
                directionsService.route({
                                                origin: TO,
                                                destination: FROM,
                                                travelMode: 'WALKING'
                                                }, function(response, status) {
                                                if (status === 'OK') {
                                                    directionsDisplay.setDirections(response);
                                        }else{
                                        calculateAndDisplayRoute(directionsService, directionsDisplay);
                                        }
                });
           }
    }

	function moveMe(x){
		deleteMarkers();
		addMarker(x);
		FROM = x;
	}
      // Adds a marker to the map and push to the array.

var image = 'img/me.png';
      function addMarker(location) {
        var marker = new google.maps.Marker({
          position: location,
          map: map,
          icon: {
              url: "img/me.png", // url
              scaledSize: new google.maps.Size(20, 20)
          }
        });
        markers.push(marker);
      }

      // Sets the map on all markers in the array.
      function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }
      // Removes the markers from the map, but keeps them in the array.
      function clearMarkers() {
        setMapOnAll(null);
      }
      // Deletes all markers on the map.
      function deleteMarkers() {
        clearMarkers();
        markers = [];
      }
function resentr(){
	map.setCenter(FROM);
}
var rad = function(x) {
    return x * Math.PI / 180;
};

function getDistance(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2.lat - p1.lat);
    var dLong = rad(p2.lng - p1.lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meters
};
