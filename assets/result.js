//Go back to index.html
document.getElementById("return").addEventListener("click", function(){
    window.location.replace('../index.html')})

//Pull "?code=___" from top of screen
const urlCode = window.location.search;
console.log(urlCode);
//Pull "___" from aforementioned variable
const query = urlCode.substring(urlCode.indexOf('=') + 1);
console.log(query);

var APIkey = 'YzVVecqbLD53XVjKj3RLhIsTHcbfhwuYyq5vgYNI';
var NPSwebsite = 'https://developer.nps.gov/api/v1/';
var APIwebsite = NPSwebsite + 'parks?q=' + query + '&api_key=' + APIkey;

async function searchParks() {

    const response = await fetch(APIwebsite);

    const parkResults = await response.json();

    console.log(parkResults);
    console.log(parkResults.data.length);

    if (parkResults.data.length > 1) {
        //Put function that calls modal here        
        parkChoices(parkResults);
        //Put function that populates result.html here
    } else {
        //Put function that populates result.html here
    }
}

function applyPark() {

}


searchParks();


//function modal() {

    
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.querySelector("#myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    var modalBody = document.getElementById('modal-body');

    btn.addEventListener('click', function() {
        modal.style.display = "block";
    });

function parkChoices(parkChoices) {
    modal.style.display = 'block';

    for (var i = 0; i < parkChoices.data.length; i++) {
        var parkName = document.createElement('h2');
        var parkDescription = document.createElement('a');

        parkName.textContent = parkChoices.data[i].fullName;
        parkDescription.textContent = parkChoices.data[i].description;

        parkDescription.addEventListener('click', function() { 
            
            // parkChoices.data[i];
            modal.style.display = 'none';
        });

        modalBody.append(parkName);
        modalBody.append(parkDescription);
    }
}

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
//}







/*
// Modal
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

*/