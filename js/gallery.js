// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {
	//Add code here to access the #slideShow element.
	
	//Access the img element and replace its source
	//with a new image from your images array which is loaded 
	//from the JSON string
	console.log('swap photo');
}

// Counter for the mImages array
var mCurrentIndex = 0;


// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages = [];


// Holds the retrived JSON information
var mJson;


// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl;


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
	
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
	
});

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);


mImages.push(new GalleryImage("../img/places/australia.jpg", "Australia", "Loch Ard Gorge", "01/01/2016" ));
mImages.push(new GalleryImage("../img/places/austria.jpg", "Austria", "Austrian chapel", "01/02/2016"));
mImages.push(new GalleryImage("../img/places/france.jpg", "Paris", "Eiffel Tower", "01/03/2016"));
mImages.push(new GalleryImage("../img/places/greece.jpg", "Greece", "Greek coastline", "01/04/2016"));


function GalleryImage(plc, des, dat, img) {
	//implement me as an object to hold the following data about an image:
	
	this.img = image;			//1. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
	this.plc = place;			//2. location where photo was taken
	this.des = description;		//3. description of photo
	this.dat = date; 			//4. the date when the photo was taken
}


mUrl = "../images.json";
var mRequest = new XMLHttpRequest();
mRequest.onreadystatechange = function() {
	
	if (mRequest.readyState == 4 && mRequest.status == 200) {
		try {
			// Let’s try and see if we can parse JSON (see next slide)
	
			mJson = JSON.parse(mRequest.responseText);
			// LOOP THROUGH the mJSON array here and fill up the
			// mImages array with GalleryImage objects
			// Let’s print out the JSON; It will likely show as “obj”
			
			for( var i = 0; mJson.images.length; i++) {
				mImages.push(new GalleryImage((mJson.images[i].image, mJson.images[i].place, mJson.images[i].description, mJson.images[i].date)));
				console.log(mJson);
			} catch(err) {
				console.log(err.message)
			}
		}
	}
	else alert("ERROR ACCESS JSON FILE!!!!!")
};

mRequest.open("GET",mUrl, true);
mRequest.send();