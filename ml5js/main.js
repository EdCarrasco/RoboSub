// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
const classifier = ml5.imageClassifier('MobileNet', modelReady);

// A variable to hold the image we want to classify
let img;

function setup() {
  noCanvas();
  // Load the image
  console.log("setup")
  img = loadImage('images/bird3.jpg', imageReady);
  //img.size(400, 400);
}

// Change the status when the model loads.
function modelReady(){
  document.getElementById('status').innerHTML = 'Model Loaded'
}

// When the image has been loaded,
// get a prediction for that image
function imageReady() {
	console.log("imageReady")
  classifier.predict(img, gotResult);
  // You can also specify the amount of classes you want
  // classifier.predict(img, 10, gotResult);
}

// A function to run when we get any errors and the results
function gotResult(err, results) {
  if (err) {
    console.error(err);
  }
  // The results are in an array ordered by probability.
  document.getElementById('result').innerHTML = results[0].className;
  document.getElementById('probability').innerHTML  = results[0].probability;//, 0, 2));
}