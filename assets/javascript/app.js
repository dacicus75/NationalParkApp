//  --------------------------------------------------------------------------------

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCZuRbpdVP2raZyzf4Uj75WqD4A02Qex9c",
    authDomain: "nationalparksapp.firebaseapp.com",
    databaseURL: "https://nationalparksapp.firebaseio.com",
    projectId: "nationalparksapp",
    storageBucket: "nationalparksapp.appspot.com",
    messagingSenderId: "1051240529835"
};
firebase.initializeApp(config);

var database = firebase.database();
// var queryURL = "https://www.hikingproject.com/data/get-" + (parameters) +"&key=200430087-cc29846e97dd0dc3575ba8096977c1be"
// Obtain user location
// We may want to use watchPosition() to keep track of user movements
// Will need button to bind event 
var lat;
var lon;
var userEmail;
function getLocation() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("location not available");
    }
}
function showPosition(position) {
    console.log("latitude: " + position.coords.latitude);
    console.log("longitude: " + position.coords.longitude);
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    displayParks();
}
// Grab to do list from user account
//function getToDos() {
//    userEmail = $("#email").val().trim();
//    var queryURL = "https://www.hikingproject.com/data/get-to-dos?email=" + userEmail +"&key=200430087-cc29846e97dd0dc3575ba8096977c1be";

//    $.ajax({
//        url: queryURL,
//        method: 'get'
//    }) .then(function(response){
//        var toDos = response.toDos;
//        for(var i = 0; i < response.toDos.length; i++){
//           form.append("<p>");
//            $("p").text(toDos[i]);
//        }
//    })

//}

$("#submit-user").on("click", function () {
    event.preventDefault();
    var name = $("#user-name").val().trim();
    var email = $("#user-email").val().trim();
    var password = $("#user-password").val().trim();
    var newUser = {
        name: name,
        email: email,
        password: password
    };
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + "," + errorMessage);
        console.log("welcome " + name);
    });
    database.ref().push(newUser);
    $("#user-name").val("");
    $("#user-email").val("");
    $("#user-password").val("");
})

$("#user-signin").on("click", function () {
    event.preventDefault();
    var email = $("#signin-email").val().trim();
    var password = $("#signin-password").val().trim();
    var userSignIn = {
        email: email,
        password: password
    };

    console.log(userSignIn);
    $("#user-name-display").text(userSignIn.email);
    $("#user-name-display").show();
    $("#your-trails").show();
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.

        var errorCode = error.code;
        var errorMessage = error.message;
        if (email || password === false) {
            console.log("not a user")
        }
        $("#signin-email").val(email);
        console.log(errorCode + "," + errorMessage);

    });
    $("#signin-email").val("");
    $("#signin-password").val("");
});


// User Sign Out
//firebase.auth().signOut().then(function() {
// Sign-out successful.
//  })

//  --------------------------------------------------------------------------------
 

// if you click visit, this div is created and overwrites the content
function displayParks() {

    $("p").remove();
    var queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&key=200430087-cc29846e97dd0dc3575ba8096977c1be"


    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(queryURL);
            console.log(response);
            // var results = response.data;
            for (var i = 0; i < response.trails.length; i++) {
                var parkDiv = $("<div>");

                var p = $("<p>").html(response.trails[i].name + "<br>");
                // var p = $("<p>").html("Rating: " + results[i].rating + "<br>");
                // var trailLat = response.trails[i].latitude;
                // var trailLon = response.trails[i].longitude;
              
                // var directions = "https://www.google.com/maps?q=" + trailLat + "," + trailLon

                // $("#location").html(directions)
               
                p.attr({
                    // type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
                    "type": "button",
                    
                    "data-lat": response.trails[i].latitude,
                    "data-lon": response.trails[i].longitude,
                    "data_name": response.trails[i].name,
                    "data-toggle": "modal",
                    "data-target": "#exampleModal",
                    "data_summary": response.trails[i].summary,
                    "data_image": response.trails[i].imgMedium,
                    "data_location": response.trails[i].location,
                    "data_stars": response.trails[i].stars,
                    "class": "trails"
                });
                parkDiv.prepend(p);
                // $("#displayContent").prepend(parkImage);
                $("#contentHeader").html("<h1> Trails near you </h1>");
                $("#displayContent").append(parkDiv);


            }
            $(".trails").on('click', function () {
                var latitude =$(this).attr("data-lat");
                var longitude =$(this).attr("data-lon");
                var hikeName = $(this).attr("data_name");
                var hikeSummary = $(this).attr("data_summary");
                var hikeImage = $(this).attr("data_image");
                var hikeLocation = $(this).attr("data_location");
                var hikeStars = $(this).attr("data_stars");
                console.log(longitude);
                // var parkImage = $("<img>")
                // parkImage.attr("src", hikeImage);
                $("#ModalLabel").html(hikeName);
                // $(".modal-image").html(hikeImage);
                var topicImage = $("<img>");
                topicImage.attr({
                    "src": hikeImage,
                    "class": 'hikePic'
                });
                var directionsClick = $(".directions");
                directionsClick.attr({
                    "data_lat": latitude,
                    "data_lon": longitude,
                    "class": 'btn btn-primary directions'
                });
                var favoritesClick = $(".favorite");
                favoritesClick.attr({
                    "data_name": hikeName,
                    "data_location": hikeLocation,
                    "data_summary": hikeSummary,
                    "data_image": hikeImage,
                    "class": 'btn btn-primary favorite'
                });

                $("img").remove();
                $(".modal-message").hide();
                // topicImage.prepend(".modal-image");
                $(".modal-image").prepend(topicImage);
                $("#hikeSummary").html(hikeSummary);
                $(".modal-location").html("Location: " + hikeLocation);
                $(".modal-stars").html("Trail rating: " + hikeStars + " stars");


            })

            // $("#directions").on('click', function () {
            //     $('#iframe').attr('src', 'https://www.google.com/maps?q='+ trailLat + "," + trailLon);
            //     // $("#location").html("<iframe src=https://www.google.com/maps?q=" + trailLat + "," + trailLon"></iframe>");
            //     // var directionsDiv = $("<div>");
            //     // directionsDiv.attr({
            //     //     "src": "https://www.google.com/maps?q=" + trailLat + "," + trailLon,
            //     // })
            //     // $("#location").html(directionsDiv);
            // })
        }

        );
}
//opens google maps to get directions to the hiking trail
 
    $(".directions").on('click', function () {
    var trailLat = $(this).attr("data_lat");
    console.log(this);
    console.log(trailLat);
  
    var trailLon = $(this).attr("data_lon");
    console.log(trailLon);
    window.open("https://www.google.com/maps?q=" + trailLat + "," + trailLon);

    })
// function getDirections(){
//     var queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + lat + 
//     "&lon=" + lon + "&key=200430087-cc29846e97dd0dc3575ba8096977c1be"


// $.ajax({
//     url: queryURL,
//     method: "GET"
// })
// .then(function (response) {
//     var trailLat = response.trails[i].latitude;
//     var trailLon =response.trails[i].longitude;

//     var directions = "https://www.google.com/maps?q="+trailLat+","+trailLon

//      $("#location").html(directions)



//     }
// }
//     getDirections();

$("close").on('click', function () {
    $(".modal-message").hide();

})


 

$("#favorite").on('click', function () {
    $(".modal-message").html("Added to Favorites");
    $(".modal-message").show();

    // setTimeout($(".modal-message" ).remove(), 3000);
    // $('#exampleModal').modal("show");

    event.preventDefault();
    //grabs the trail information from the favorite
    var trailName = $("#ModalLabel").val().trim();
    var trailImage = $(".modal-image").val().trim();
    var trailSummary = $(".modal-body").val().trim();
    var trailLocation = $(".modal-location").val().trim();
    var trailStars = $(".modal-stars").val().trim();

    //add a new document key for each line of data added and pushes that line to a set of data
    //doesnt overwrite the data that is there
    database.ref().push({
        name: trailName,
        image: trailImage,
        summary: trailSummary,
        location: trailLocation,
        rating: trailStars
    });
    // $('#favorite').click(function(){
    //     $("#message").html("You Clicked on Click here Button");
    //       $('#exampleModal').modal("show");
    //     });
})

$("#trail-info").hide();
$(".user-display").hide();

$("#your-trails").on("click", function () {
    $("#trail-info").show();
})
// weather app
var fahrenheit, celsius;
var weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather";
var apiKey = "16dd6985df4229356a7e622ae5dace0a";
getLatLong();
function getWeatherData() {
    $.ajax({
        url: weatherApiUrl,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var temperature = data.main.temp;
            celsius = temperature;
            fahrenheit = celsius * 1.8 + 32;
            var icon = data.weather[0].icon;
            var weatherDetail = data.weather[0].main + ", " + data.weather[0].description;
            $('.weatherDetail').html(weatherDetail);
            $('.iconpic>img').attr('src', 'http://openweathermap.org/img/w/' + icon + '.png');
            $('.temp').html(parseInt(temperature) + "&#8457;");
        },
        error: function (err) {
            alert('Something went wrong, Please try again.');
            console.log(err);
        }
    });
}
function getLatLong() {
    $.ajax({
        url: "https://geoip-db.com/json/",
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var lat = data.latitude;
            var long = data.longitude;
            $('.city').html(data.city);
            $('.country').html(data.country_name);
            weatherApiUrl += "?lat=" + lat + "&lon=" + long + "&APPID=" + apiKey + "&units=imperial";
            getWeatherData();
        },
        error: function (err) {
            alert('Something went wrong, Please try again.');
            console.log(err);
        }
    });
}
    //test



    //test
    // }
    // function displayParkModal() {
    //     $("p").on("click", function () {
    //         var hikeName = $(this).attr("data_name");
    //         console.loge(hikeName);
    //         var hikeSummary = $(this).attr("data_summary");
    //         console.loge(hikeSummary);
    //         var hikeImage = $(this).attr("data_image");
    //         console.loge(hikeImage);
    //         var hikeLocation = $(this).attr("data_location");
    //         console.loge(hikeLocation)
    //         var hikeStars = $(this).attr("data_stars");
    //         console.loge(hikeStars);
    //         $("#ModalLabel").html(hikeName);
    //         $(".modal-image").html(hikeImage);
    //         $(".modal-body").html(hikeSummary);
    //         $(".modal-location").html(hikeLocation);
    //         $(".modal-stars").html(hikeStars);

    //     });


    // }

    // setTimeout(displayParks, 10000);
    // displayParks();


//indiviual park information
// Directions -google maps api
//  --------------------------------------------------------------------------------

