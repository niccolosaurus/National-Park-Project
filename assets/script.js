var APIkey = 'YzVVecqbLD53XVjKj3RLhIsTHcbfhwuYyq5vgYNI';
var website = 'developer.nps.gov/api/v1/';
var APItemplate = "https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=YzVVecqbLD53XVjKj3RLhIsTHcbfhwuYyq5vgYNI"
const iconBase ="https://developers.google.com/maps/documentation/javascript/examples/full/images/"
const treeIcon= "https://img.icons8.com/color/48/000000/deciduous-tree.png"

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: new google.maps.LatLng(37.0902, -95.7129),
    mapTypeId: "terrain",
  });

  async function fetchParksJSON() {
    const response = await fetch('https://developer.nps.gov/api/v1/parks?limit=500&api_key=YzVVecqbLD53XVjKj3RLhIsTHcbfhwuYyq5vgYNI')
  
    const parks = await response.json();
    return parks;
  }
  
  fetchParksJSON().then(parks => {
   parks; // fetched parks
   console.log(parks.data)
   let parkData = parks.data
   for (let i=0; i < parkData.length; i++) {
    let name = parkData[i].fullName
    let lat = parseFloat(parkData[i].latitude)
    let long = parseFloat(parkData[i].longitude)
    
    let coords = { lat: lat, lng: long };
  
  
    new google.maps.Marker({
      position: coords,
      map: map,
      title: name,
      icon: treeIcon
    });
    }
  
  });


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

// function start() {
//   // let markerData = pullNPSapi();
//   // console.log(markerData)
//   // let response = natParks(markerData);
//   // console.log(response);
//   // return response;
// }

// // start();

// console.log(start());

// let markerData = start().then(function(res) {
//   console.log('res', res)
//   return res;
// });



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


