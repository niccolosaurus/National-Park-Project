//Go back to index.html
document.getElementById("return").addEventListener("click", function () {
    window.location.replace('../index.html')
})

//Pull "?code=___" from top of screen
const urlCode = window.location.search;
//Pull "___" from aforementioned variable
const query = urlCode.substring(urlCode.indexOf('=') + 1);
console.log(query);

var APIkey = 'YzVVecqbLD53XVjKj3RLhIsTHcbfhwuYyq5vgYNI';
var NPSwebsite = 'https://developer.nps.gov/api/v1/';
var APIwebsite = NPSwebsite + 'parks?q=' + query + '&api_key=' + APIkey;

async function searchParks() {

    const response = await fetch(APIwebsite);
    const parkSearch = sessionStorage.getItem("parkSearch");
    const parkResults = await response.json();

    // console.log(parkResults.data.filter(location => location.fullName.includes(parkSearch)));
    console.log(parkResults.data);

    if (parkResults.data.filter(location => location.fullName.includes(parkSearch)).length !== 1) {

        parkChoices(parkResults);

    } /* else if (parkResults.data.filter(location => location.fullName.includes(parkSearch)).length == 1) { /* JRM: I attempted this part--doesn't work */
        //Put function that calls modal here        
        /* window.location.replace('../index.html'); 
    } */ else {
        applyPark(parkResults);
    }
}



function applyPark(pick) {

    var hikingIcon = '<img src="https://img.icons8.com/fluency-systems-regular/48/000000/trekking-skin-type-1.png"/>';
    var swimmingIcon = '<img src="https://img.icons8.com/ios-filled/50/000000/swimming.png"/>';
    var fishingIcon = '<img src="https://img.icons8.com/ios-glyphs/30/000000/fishing-pole.png"/>';
    var foodIcon = '<img src="https://img.icons8.com/ios-glyphs/30/000000/fishing-pole.png"/>';
    var horsebackIcon = '<img src="https://img.icons8.com/fluency-systems-filled/24/000000/horseback-riding.png"/>';
    var watchingIcon = '<img src="https://img.icons8.com/material/24/000000/binoculars--v1.png"/>';
    var skiiIcon = '<img src="https://img.icons8.com/material/24/000000/skiing.png"/>';
    var campIcon = '<img src="https://img.icons8.com/material/24/000000/camping-tent.png"/>';

    console.log(pick);

    var currentPark = document.getElementById('currentPark');
    currentPark.textContent = '';
    currentPark.textContent = pick.fullName;

    var addressContainer = document.getElementById("address");
    addressContainer.textContent = '';
    var address1 = document.createElement('p');
    address1.textContent = pick.addresses[0].line1;
    var address2 = document.createElement('p');
    address2.textContent =  pick.addresses[0].city + ", " + pick.addresses[0].stateCode + " " + pick.addresses[0].postalCode;
    addressContainer.append(address1, address2);

    var hoursContainer = document.getElementById("hours");
    hoursContainer.textContent = "";
    var monday = document.createElement('p');
    monday.textContent = 'Monday: ' + pick.operatingHours[0].standardHours.monday;
    hoursContainer.append(monday);
    var tuesday = document.createElement('p');
    tuesday.textContent = 'Tuesday: ' + pick.operatingHours[0].standardHours.tuesday;
    hoursContainer.append(tuesday);
    var wednesday = document.createElement('p');
    wednesday.textContent = 'Wednesday: ' + pick.operatingHours[0].standardHours.wednesday;
    hoursContainer.append(wednesday);
    var thursday = document.createElement('p');
    thursday.textContent = 'Thursday: ' + pick.operatingHours[0].standardHours.thursday;
    hoursContainer.append(thursday);
    var friday = document.createElement('p');
    friday.textContent = 'Friday: ' + pick.operatingHours[0].standardHours.friday;
    hoursContainer.append(friday);
    var saturday = document.createElement('p');
    saturday.textContent = 'Saturday: ' + pick.operatingHours[0].standardHours.saturday;
    hoursContainer.append(saturday);
    var sunday = document.createElement('p');
    sunday.textContent = 'Sunday: ' + pick.operatingHours[0].standardHours.sunday;
    hoursContainer.append(sunday);

    var parkPic = document.getElementById('parkPic');
    parkPic.src = pick.images[0].url;
    parkPic.alt = pick.images[0].altText;

    var events = document.getElementById("events");
    var eventContent = document.createElement('h3');
    eventContent.textContent = pick.events;
    events.append(eventContent);

    var activities = document.getElementById("activities");
    var activitiesContent = document.createElement('p');

    for (var i=0; i < pick.activities.length; i++)
    activitiesContent.textContent = pick.activities.name;
    activities.append(activitiesContent);

    // var news = document.getElementById("news");
    // var newsContent = document.createElement('p');
    // newsContent.textContent = pick.data[i].fullName;
    // news.append(newsContent);


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

btn.addEventListener('click', function () {
    modal.style.display = "block";
});

function parkChoices(parkChoices) {
    modal.style.display = 'block';

    for (var i = 0; i < parkChoices.data.length; i++) {

        var choiceBlock = document.createElement('div');
        choiceBlock.classList.add('choice');

        var parkName = document.createElement('h2');
        var parkDescription = document.createElement('a');
        choiceBlock.setAttribute('href', '#'); /* JRM: this works in making each description a link. but it needs to also close the modal. */

        parkName.textContent = parkChoices.data[i].fullName;
        parkDescription.textContent = parkChoices.data[i].description;

        choiceBlock.addEventListener('click', function (event) {
            event.preventDefault();

            // JRM: I think here is where the user's selection needs to be saved

            var selectChoice = this.getElementsByTagName('h2')[0].textContent;

            console.log(selectChoice);

            for (var index = 0; index < parkChoices.data.length; index++) {
                if (selectChoice == parkChoices.data[index].fullName) {

                    selectChoice = parkChoices.data[index];

                    applyPark(selectChoice);
                };

            };

            modal.style.display = "none";
        });

        choiceBlock.append(parkName);
        choiceBlock.append(parkDescription);
        modalBody.append(choiceBlock);
    }
}



// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
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