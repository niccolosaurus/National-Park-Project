var APIkey = 'YzVVecqbLD53XVjKj3RLhIsTHcbfhwuYyq5vgYNI';
var website = 'developer.nps.gov/api/v1/';
var APItemplate = "https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=YzVVecqbLD53XVjKj3RLhIsTHcbfhwuYyq5vgYNI"

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 2,
    center: new google.maps.LatLng(2.8, -187.3),
    mapTypeId: "terrain",
  });

  // Create a <script> tag and set the USGS URL as the source.
  const script = document.createElement("script");

  // This example uses a local copy of the GeoJSON stored at
  // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
  script.src =
    "https://developer.nps.gov/api/v1/parks?limit=500&api_key=YzVVecqbLD53XVjKj3RLhIsTHcbfhwuYyq5vgYNI";
  document.getElementsByTagName("head")[0].appendChild(script);
}

// Loop through the results array and place a marker for each
// set of coordinates.
const eqfeed_callback = function (results) {
  for (let i = 0; i < results.features.length; i++) {
    const coords = results.features[i].geometry.coordinates;
    const latLong = new google.maps.LatLong(coords[1], coords[0]);

    new google.maps.Marker({
      position: latLong,
      map: map,
    });
  }
};


//Use the code below in any function to pull the Nation Parks object.  Function must be "async".
// var natParks = await pullNPSapi();

//Make textbox blank instead of undefined
if (parkChoice) {
  parkChoice = "";
}

//Fetch National Parks list from 
async function pullNPSapi() {

  var response = await fetch('https://developer.nps.gov/api/v1/parks?limit=500&api_key=YzVVecqbLD53XVjKj3RLhIsTHcbfhwuYyq5vgYNI');
  var data = await response.json();

  console.log(data);
  return data;
}

function submit() {

  if (parkSearch.value == "") {
    return;
}else {
    console.log(NPSwebsite + 'parks?q=' + parkSearch.value + '&api_key=' + APIkey); 

    window.location.replace('./assets/result.html' + '?code=' + parkSearch.value);
}
}


//Search on Enter key
submitSearch.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault;

    submit();

  }
});

//Search on clicking Search button
submitSearch.addEventListener('click', function(event){
  event.preventDefault;

  submit();  
    
});


async function natParks(data) {
// var data = await pullNPSapi();
var results = []
for (let i=0; i < data.data.length; i++) {
  let name = data.data[i].fullName
  let lat = data.data[i].latitude
  let long = data.data[i].longitude

  results.push({
    name, lat, long
  }); 
}
 return results;

}

async function start() {
  let data = await pullNPSapi();
  let response = await natParks(data);
  console.log(response);
}

start();




// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.querySelector("#myBtn");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.addEventListener('click', function() {
  modal.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


