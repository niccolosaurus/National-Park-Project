var APIkey = 'YzVVecqbLD53XVjKj3RLhIsTHcbfhwuYyq5vgYNI';
var NPSwebsite = 'https://developer.nps.gov/api/v1/';

 var submitSearch = document.querySelector('#submitSearch');
 var parkSearch = document.querySelector('#parkSearch');



initMap();

var parkChoice = JSON.parse(localStorage.getItem("parkChoice"));

if (parkChoice) {
     parkChoice = "";
 }

 console.log(parkChoice);

 submitSearch.addEventListener('click', function(event){
    event.preventDefault;

    if (parkSearch.value == "") {
        return;
    }else {
        console.log(NPSwebsite + 'parks?q=' + parkSearch.value + '&api_key=' + APIkey); 
        
        localStorage.setItem("parkChoice", JSON.stringify(parkSearch.value));

        //window.location.replace('./assets/result.html' + '?code=' + parkSearch.value);
    }
    
    
 });

 function initMap() {
    var options = {
        zoom:8,
        center: {lat:32.7157,lng:-117.1611}
    }

    var map = new google.maps.Map(document.getElementById('map'), options);
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
//document.getElementById("return").addEventListener("click", function(){
 // window.location.replace('../index.html')})
//window.location.replace('index.html'


