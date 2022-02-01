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

    console.log(parkResults.data);

    if (parkResults.data.filter(location => location.fullName.includes(parkSearch)).length !== 1) {

        parkChoices(parkResults);

    } else {
        applyPark(parkResults);
    }
}

function applyPark(pick) {

    var hikingIcon = 'https://img.icons8.com/fluency-systems-regular/48/000000/trekking-skin-type-1.png';
    var swimmingIcon = 'https://img.icons8.com/ios-filled/50/000000/swimming.png';
    var fishingIcon = 'https://img.icons8.com/ios-glyphs/30/000000/fishing-pole.png';
    var foodIcon = 'https://img.icons8.com/android/50/000000/restaurant.png';
    var horsebackIcon = 'https://img.icons8.com/fluency-systems-filled/24/000000/horseback-riding.png';
    var watchingIcon = 'https://img.icons8.com/material/24/000000/binoculars--v1.png';
    var skiiIcon = 'https://img.icons8.com/material/24/000000/skiing.png';
    var campIcon = 'https://img.icons8.com/material/24/000000/camping-tent.png';



    var currentPark = document.getElementById('currentPark');
    currentPark.textContent = '';
    currentPark.textContent = pick.fullName;

    // Address
    var addressContainer = document.getElementById("address");
    addressContainer.textContent = '';
    var address1 = document.createElement('p');
    address1.textContent = pick.addresses[0].line1;
    var address2 = document.createElement('p');
    address2.textContent = pick.addresses[0].line2;
    var address3 = document.createElement('p');
    address3.textContent = pick.addresses[0].city + ", " + pick.addresses[0].stateCode + " " + pick.addresses[0].postalCode;
    addressContainer.append(address1, address2, address3);

    //Hours of operation
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

    //Picture of park
    var parkPic = document.getElementById('parkPic');
    var picNumber = Math.floor(Math.random() * pick.images.length);
    parkPic.src = pick.images[picNumber].url;
    parkPic.alt = pick.images[picNumber].altText;

    //Park description
    var aboutPark = document.getElementById('aboutPark');
    aboutPark.textContent = pick.description;


    // Create icons under 'Things to do'
    var activities = document.getElementById("activities");
    activities.textContent = "";
    for (var i = 0; i < pick.activities.length; i++) {
        if (pick.activities[i].name == "Hiking") {
            var icon = document.createElement('img');
            icon.src = hikingIcon;
            icon.alt = 'Hiking';
            icon.title = 'Hiking';
            activities.append(icon);
        }
        if (pick.activities[i].name == "Swimming") {
            var icon = document.createElement('img');
            icon.src = swimmingIcon;
            icon.alt = 'Swimming';
            icon.title = 'Swimming';
            activities.append(icon);
        }
        if (pick.activities[i].name == "Fishing") {
            var icon = document.createElement('img');
            icon.src = fishingIcon;
            icon.alt = 'Fishing';
            icon.title = 'Fishing';
            activities.append(icon);
        }
        if (pick.activities[i].name == "Food") {
            var icon = document.createElement('img');
            icon.src = foodIcon;
            icon.alt = 'Food';
            icon.title = 'Food';
            activities.append(icon);
        }
        if (pick.activities[i].name == "Horseback") {
            var icon = document.createElement('img');
            icon.src = horsebackIcon;
            icon.alt = 'Horseback Riding';
            icon.title = 'Horseback Riding';
            activities.append(icon);
        }
        if (pick.activities[i].name == "Watching") {
            var icon = document.createElement('img');
            icon.src = watchingIcon;
            icon.alt = 'Animal Watching';
            icon.title = 'Animal Watching';
            activities.append(icon);
        }
        if (pick.activities[i].name == "Skiing") {
            var icon = document.createElement('img');
            icon.src = skiiIcon;
            icon.alt = 'Skiing';
            icon.title = 'Skiing';
            activities.append(icon);
        }
        if (pick.activities[i].name == "Camping") {
            var icon = document.createElement('img');
            icon.src = campIcon;
            icon.alt = 'Camping';
            icon.title = 'Camping';
            activities.append(icon);
        }
    }
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

            var selectChoiceNews = selectChoice; // JRM: I added this variable to make selectchoice global--for getNews async function.



            for (var index = 0; index < parkChoices.data.length; index++) {
                if (selectChoice == parkChoices.data[index].fullName) {

                    selectChoice = parkChoices.data[index];

                    applyPark(selectChoice);

                    // JRM: Fetch for news
                    async function getNews() {

                        // JRM: variable for news API
                        var APIwebsiteNews = NPSwebsite + 'newsreleases/' + '?q=' + selectChoiceNews + '&api_key=' + APIkey;

                        const response = await fetch(APIwebsiteNews);

                        var newsResults = await response.json(); // JRM: I changed from const to var to make it global--for applyParkNews function.

                        // JRM: This section puts the news release content (first 5 results) on result.html below Current News.
                        var currentParkNews00 = document.getElementById('news-content00');
                        currentParkNews00.textContent = '';
                        var currentParkNews01 = document.getElementById('news-content01');
                        currentParkNews01.textContent = '';
                        var currentParkNews02 = document.getElementById('news-content02');
                        currentParkNews02.textContent = '';
                        var currentParkNews03 = document.getElementById('news-content03');
                        currentParkNews03.textContent = '';
                        var currentParkNews04 = document.getElementById('news-content04');
                        currentParkNews04.textContent = '';

                        
                        var newsRelease00Link00 = document.createElement('a');
                        var newsTitle = document.createTextNode(newsResults.data[0].title);
                        newsRelease00Link00.appendChild(newsTitle);
                        newsRelease00Link00.title = newsTitle.textContent;
                        newsRelease00Link00.href = newsResults.data[0].url;
                        currentParkNews00.appendChild(newsRelease00Link00);

                        var newsRelease01Link01 = document.createElement('a');
                        var newsTitle = document.createTextNode(newsResults.data[1].title);
                        newsRelease01Link01.appendChild(newsTitle);
                        newsRelease01Link01.title = newsTitle.textContent;
                        newsRelease01Link01.href = newsResults.data[1].url;
                        currentParkNews01.appendChild(newsRelease01Link01);

                        var newsRelease02Link02 = document.createElement('a');
                        var newsTitle = document.createTextNode(newsResults.data[2].title);
                        newsRelease02Link02.appendChild(newsTitle);
                        newsRelease02Link02.title = newsTitle.textContent;
                        newsRelease02Link02.href = newsResults.data[2].url;
                        currentParkNews02.appendChild(newsRelease02Link02);

                        var newsRelease03Link03 = document.createElement('a');
                        var newsTitle = document.createTextNode(newsResults.data[3].title);
                        newsRelease03Link03.appendChild(newsTitle);
                        newsRelease03Link03.title = newsTitle.textContent;
                        newsRelease03Link03.href = newsResults.data[3].url;
                        currentParkNews03.appendChild(newsRelease03Link03);

                        var newsRelease04Link04 = document.createElement('a');
                        var newsTitle = document.createTextNode(newsResults.data[4].title);
                        newsRelease04Link04.appendChild(newsTitle);
                        newsRelease04Link04.title = newsTitle.textContent;
                        newsRelease04Link04.href = newsResults.data[4].url;
                        currentParkNews04.appendChild(newsRelease04Link04);


                        
                    }

                    // Events - unable to work currently, due to the data displayed being unusable
                    // async function events() {
                    //     var APIeventsWebsite = NPSwebsite + 'events/?q=' + selectChoice + '&api_key=' + APIkey;
                    //     let res = await fetch(APIeventsWebsite);
                    //     let resEl = await res.json();

                    //     console.log(resEl);

                    //     for (var ind = 0; ind < resEl.data.length; ind++) {

                    //         var eventContainer = document.getElementById("events");
                    //         var titleEl = document.createElement("h1");
                    //         titleEl.textContent = resEl.data[ind].description;
                    //         eventContainer.append(titleEl);
                    //     }

                    // }

                    // events();

                    getNews();

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
