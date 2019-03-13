//  --------------------------------------------------------------------------------
// var queryURL = "https://www.hikingproject.com/data/get-" + (parameters) +"&key=200430087-cc29846e97dd0dc3575ba8096977c1be"
// Obtain user location
// We may want to use watchPosition() to keep track of user movements
// Will need button to bind event 
var lat;
var lon;
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }   else {
        console.log("location not available");
    }
}
function showPosition(position) {
    console.log("latitude: " + position.coords.latitude);
    console.log("longitude: " + position.coords.longitude);
    lat = position.coords.latitude;
    lon = position.coords.longitude;
 
}


//  --------------------------------------------------------------------------------
  



//create content with dynamic divs
//app components

//main page 
//displays a description of that park
function displayMainPage() {
    $(".nav-item").on("click",  function () {
        
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
    $(".nav-item").on("click",  function () {
        
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
        // $(".nav-item").on("click",  function () {
            
            // debugger
            // var parameters = $(this).attr("data-park");
            // example query
           // https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=YOUR_KEY_HERE
            var queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + lat +"&lon=" +lon +"&key=200430087-cc29846e97dd0dc3575ba8096977c1be"
            // var queryURL = "https://developer.nps.gov/api/v1/parks?stateCode=" +
            // park + "&fields=images&api_key=OwgdUWK3Ipvp6hzFSLfmbugYLQWBDZhNPmGqyXRq";
               
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                .then(function (response) {
                    console.log(queryURL);
                    console.log(response);
                    var results = response.data;
                    for (var i = 0; i < results.length; i++) {
                        var parkDiv = $("<div>");
                        
                        var p = $("<p>").html( results[i].trails[i].name + "<br>");
                        // var p = $("<p>").html("Rating: " + results[i].rating + "<br>");
                    //     var parkImage = $("<img>");
                    //    parkImage.attr({
                    //         "src": results[i].images[i].url,
                    //       "data_park": 'parkPic',
                    //         "class": 'parkIMG'
                    //     });
                      
                     
                        parkDiv.prepend(p);
                        // $("#displayContent").prepend(parkImage);
                        $("#contentHeader").html("<h1> Trails near you </h1>");
                        
                        $("#displayContent").prepend(parkDiv);


                        var displayImage = $("<div>");
                        displayImage.attr({
                            "class": 'displayImage',
                            // "data-click": userClick,
                            "id": 'displayPicture'
                        })
                        displayImage.css({
                            "background-image": "url('" + results[i].imgSmallMed.url+ "')",
                            "background-size": "cover"
                        });
                        $(".appContent").append(displayImage);
                    }
                    
                });
               
        // });
       
    }
    setTimeout(displayParks, 10000);
    // displayParks();
  

//indiviual park information
// Directions -google maps api
//  --------------------------------------------------------------------------------
  
