

//  --------------------------------------------------------------------------------
  



//create content with dynamic divs
//app components

//main page 
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
 

    function displayParks() {
        $("#displayContent").on("click",  function () {
            
            var park = $(this).attr("data-park");
            // example query
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                park + "&api_key=0s3GhZ60yFQgSvoDZ5rfXYPJB3urUXBN&limit=10&offset=0&rating=PG&lang=en";
               
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
                        var p = $("<p>").html("Rating: " + results[i].rating + "<br>");
                        // var topicImage = $("<img>");
                        topicImage.attr({
                            "src": results[i].images.fixed_height_still.url,
                            "data-still": results[i].images.fixed_height_still.url,
                            "data-animate": results[i].images.fixed_height.url,
                            "data-state": 'still',
                            "class": 'gif'
                        });
                      
                        
                        parkDiv.prepend(p);
                        $("#gifs-appear-here").prepend(parkDiv);
                    }
                    
                });
                
        });
       
    }

//indiviual park information
// Directions -google maps api
//  --------------------------------------------------------------------------------
  
