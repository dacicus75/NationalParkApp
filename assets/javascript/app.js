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

$("#submit-user").on("click", function() {
    event.preventDefault();
    var name = $("#user-name").val().trim();
    var email = $("#user-email").val().trim();
    var password = $("#user-password").val().trim();
    var newUser = {
        name: name,
        email: email,
        password: password
    };
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
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

$("#user-signin").on("click", function() {
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
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
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




//create content with dynamic divs
//app components

//main page 
//displays a description of that park
function displayMainPage() {
    $(".nav-item").on("click", function () {

        var park = $(this).attr("data-park");
        // example query

        var queryURL = "https://developer.nps.gov/api/v1/parks?stateCode=" +
            park + "&api_key=OwgdUWK3Ipvp6hzFSLfmbugYLQWBDZhNPmGqyXRq";


        $.ajax({
            url: queryURL,
            method: "GET"
        })


            .then(function (response) {
                console.log(queryURL);
                console.log(response);
                var results = response.data;
                console.log(results);
                var parkDiv = $("<div>");
                var p = $("<p>").html("Park info: " + results[0].description + "<br>");
                // var topicImage = $("<img>");
                // parkDiv.attr({
                //     "src": results[i].images.fixed_height_still.url,
                //     "data-still": results[i].images.fixed_height_still.url,
                //     "data-animate": results[i].images.fixed_height.url,
                //     "data-state": 'still',
                //     "class": 'gif'
                // });


                parkDiv.prepend(p);
                $("#displayContent").prepend(parkDiv);


            });

    });

}
//when you click for directions it displays directions for that park
//this is just an example of grabbing info from the API. The hard part will be to grab several parks from the API that are within a certain range of the user
function displayMainPageDirections() {
    $(".nav-item").on("click", function () {

        var park = $(this).attr("data-directions");
        // example query

        var queryURL = "https://developer.nps.gov/api/v1/parks?parkCode=" +
            park + "&api_key=OwgdUWK3Ipvp6hzFSLfmbugYLQWBDZhNPmGqyXRq";


        $.ajax({
            url: queryURL,
            method: "GET"
        })


            .then(function (response) {
                console.log(queryURL);
                console.log(response);
                var results = response.data;
                console.log(results);
                var parkDiv = $("<div>");
                var p = $("<p>").html("Directions to the park: " + results[0].directionsInfo + "<br>");
                // var topicImage = $("<img>");
                // parkDiv.attr({
                //     "src": results[i].images.fixed_height_still.url,
                //     "data-still": results[i].images.fixed_height_still.url,
                //     "data-animate": results[i].images.fixed_height.url,
                //     "data-state": 'still',
                //     "class": 'gif'
                // });


                parkDiv.prepend(p);
                $("#displayContent").append(parkDiv);


            });

    });

}
// displayMainPage();
// displayMainPageDirections();
// Articles – NPS API (homepage limit 3 articles)
// dropdown with the following
// Find campsite/lodging/visitor center - NPS API
// button to initiate the search for National Park services
// Search for nearest parks - NPS API (limit 3)



//individual campsite
// Directions -google maps api


//individual lodging
// Directions -google maps api



//individual visitor centers
// Directions -google maps api



//parks list page

// if you click visit, this div is created and overwrites the content
function displayParks() {
    $("p").remove();
    // $(".nav-item").on("click",  function () {

    // debugger
    // var parameters = $(this).attr("data-park");
    // example query
    // https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=YOUR_KEY_HERE
    var queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&key=200430087-cc29846e97dd0dc3575ba8096977c1be"
    // var queryURL = "https://developer.nps.gov/api/v1/parks?stateCode=" +
    // park + "&fields=images&api_key=OwgdUWK3Ipvp6hzFSLfmbugYLQWBDZhNPmGqyXRq";

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

                p.attr({
                    // type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
                    "type": "button",
                    "data_name": response.trails[i].name,
                    "data-toggle": "modal",
                    "data-target": "#exampleModal",
                    "data_summary": response.trails[i].summary,
                    "data_image": response.trails[i].imgSmall,
                    "data_location": response.trails[i].location,
                    "data_stars": response.trails[i].stars,
                    "class": "test"
                });
                parkDiv.prepend(p);
                // $("#displayContent").prepend(parkImage);
                $("#contentHeader").html("<h1> Trails near you </h1>");
                $("#displayContent").append(parkDiv);  
                
                
            }
            $(".test").on('click', function () {
                var hikeName = $(this).attr("data_name");
                console.log(hikeName);
                var hikeSummary = $(this).attr("data_summary");
                console.log(hikeSummary);
                var hikeImage = $(this).attr("data_image");
                console.log(hikeImage);
                var hikeLocation = $(this).attr("data_location");
                console.log(hikeLocation)
                var hikeStars = $(this).attr("data_stars");
                console.log(hikeStars);
                var parkImage = $("<img>")
                parkImage.attr("src", hikeImage);
                $("#ModalLabel").html(hikeName);
                // $(".modal-image").html(hikeImage);
                var topicImage = $("<img>");
                topicImage.attr({
                    "src": hikeImage,
                    "class": 'hikePic'
                });
                $("img").remove();
                // topicImage.prepend(".modal-image");
                $(".modal-image").prepend(topicImage);
                $(".modal-body").html(hikeSummary);
                $(".modal-location").html("<img src= "+ "'" +hikeImage +"'" + " >");
                $(".modal-stars").html(hikeStars);

            })
        }

        );
    }

    $("#trail-info").hide();
    $(".user-display").hide();
    
    $("#your-trails").on("click", function(){
        $("#trail-info").show();
    })
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

