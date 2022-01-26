var APIkey = 'YzVVecqbLD53XVjKj3RLhIsTHcbfhwuYyq5vgYNI';
var NPSwebsite = 'https://developer.nps.gov/api/v1/';

 var submitSearch = document.querySelector('#submitSearch');
 var parkSearch = document.querySelector('#parkSearch');



initMap();

//Use the code below in any function to pull the Nation Parks object.  Function must be "async".
// var natParks = await pullNPSapi();

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

async function initMap() {
  var options = {
      zoom:8,
      center: {lat:32.7157,lng:-117.1611}
  }

  var map = new google.maps.Map(document.getElementById('map'), options);

  var natParks = await pullNPSapi();
}







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


