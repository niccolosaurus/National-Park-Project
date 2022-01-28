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

function searchParks() {

}