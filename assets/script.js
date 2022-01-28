var APIkey = 'YzVVecqbLD53XVjKj3RLhIsTHcbfhwuYyq5vgYNI';
var website = 'developer.nps.gov/api/v1/';
var APItemplate = "https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=YzVVecqbLD53XVjKj3RLhIsTHcbfhwuYyq5vgYNI"
const treeIcon= "https://img.icons8.com/color/48/000000/deciduous-tree.png"


let map;

//This is the function that opens the google map on our main page
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: new google.maps.LatLng(37.0902, -95.7129),
    mapTypeId: "terrain",
  });

  async function fetchParksJSON() {
    const response = await fetch('https://developer.nps.gov/api/v1/parks?limit=500&api_key=YzVVecqbLD53XVjKj3RLhIsTHcbfhwuYyq5vgYNI');
  
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


//Use the code below in any function to pull the Nation Parks object.  Function must be "async".
// var natParks = await pullNPSapi();

// Make textbox blank instead of undefined
// if (parkChoice) {
//   parkChoice = "";
// }

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
    console.log(website + 'parks?q=' + parkSearch.value + '&api_key=' + APIkey); 

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







