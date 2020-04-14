console.log("Client");
var cityID = "";
var cuisineID = "";
var cuisineName = "";
var entityID = "";
var length = 0;

function findLocation(){
	searchLocation = document.querySelector("#locationInputBox").value;
	let request = new XMLHttpRequest();
	  request.open("GET", `https://developers.zomato.com/api/v2.1/locations?query=${searchLocation}`, true)
    request.setRequestHeader("user-key", "0c4021b2746b65ff264f02481b32fb6a");

		request.onload = function() {
			let data = JSON.parse(this.response);
	    if (request.status == 200)
			{
				results = data.location_suggestions;
        // console.log(data);
        // console.log(results);
        for (let i = 0; i < results.length; i++)
        {
          // console.log(results[i].title);
          // console.log(results[i].country_name);
          // console.log(results[i].city_id);

          cityID = results[i].city_id;
          entityID = results[i].entity_id;

          //document.querySelector("#cityName").innerHTML = results[i].title;
          //document.querySelector("#countryName").innerHTML = results[i].country_name;
        }
	    }
      getCuisines();
	  }
	  request.send();
	}

function getCuisines(){
  let request = new XMLHttpRequest();
    request.open("GET", `https://developers.zomato.com/api/v2.1/cuisines?city_id=${cityID}`, true)
    request.setRequestHeader("user-key", "0c4021b2746b65ff264f02481b32fb6a");
    request.onload = function() {
      let data = JSON.parse(this.response);
      if (request.status == 200)
      {
        results = data.cuisines;
        // console.log(data);
        // console.log(results);

        for (let i = 0; i < results.length; i++)
        {
          length = results.length;
          //console.log("length: " + length);
          // console.log(results[i].cuisine.cuisine_id);
          // console.log(results[i].cuisine.cuisine_name);

          let radioBtn = document.createElement("input");
          radioBtn.setAttribute('type', 'radio');
  				radioBtn.setAttribute('id', 'radioBtn' + i);
          radioBtn.setAttribute('name', 'cuisine');
          radioBtn.setAttribute('value', results[i].cuisine.cuisine_id);

          let radioLabel = document.createElement("label");
  				let radioText = document.createTextNode(results[i].cuisine.cuisine_name);
  				radioLabel.appendChild(radioText);

					let rdiv = document.createElement("div");
  				document.querySelector("#radioButtonsDiv").appendChild(radioBtn);
          document.querySelector("#radioButtonsDiv").appendChild(radioLabel);
        }
        document.querySelector("#foodCheckButtons").style.display = "block";
      }
    }
    request.send();
  }

function getCuisineType() {
  for(i=0; i<length; i++){
    if(document.querySelector("#radioBtn" + i).checked){
      cuisineID = document.querySelector("#radioBtn" + i).value;
    }
  }
}

function getRestaurants() {
  getCuisineType();
  let request = new XMLHttpRequest();
    request.open("GET", `https://developers.zomato.com/api/v2.1/search?entity_id=${entityID}&entity_type=city&cuisines=${cuisineID}`, true)
    request.setRequestHeader("user-key", "0c4021b2746b65ff264f02481b32fb6a");
    request.onload = function() {
      let data = JSON.parse(this.response);
      if (request.status == 200)
      {
        results = data.restaurants;
        for (let i = 0; i < results.length; i++)
        {
          let r = results[0].restaurant;
          console.log("restaurantId: "+ r.id);
          document.querySelector("#restName").innerHTML = r.name;
          document.querySelector("#restUrl").innerHTML = "Website";
          document.querySelector("#restUrl").href = r.url;
          document.querySelector("#location").innerHTML = r.location.address;
          document.querySelector("#city").innerHTML = r.location.city;
          document.querySelector("#timings").innerHTML = r.timings;
          document.querySelector("#priceRange").innerHTML = r.price_range;
        }
      }
    }
    request.send();
}
