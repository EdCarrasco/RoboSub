let video
let features
let knn
let labelP

function setup() {
	createCanvas(640,480)
	video = createCapture(VIDEO)
	video.size(640,480)
	video.hide()
	features = ml5.featureExtractor("MobileNet", function() {
		console.log("model is ready!")
	})

	knn = ml5.KNNClassifier()
	labelP = createP("need training data")
	labelP.style("font-size: 32pt;")
}

function draw() {
	background(51)
	image(video, 0, 0)

	if (knn.getNumLabels() > 0) {
		classifyVideoSnapshot()
	}
}

function classifyVideoSnapshot() {
	// Get the current frame from the111111111 video
	// and determine its class
	const logits = features.infer(video)
	knn.classify(logits, function(error, result) {
		if (error) {
			labelP.html(error)
		} else {
			labelP.html("class: " + result.label)
		}
	})
}

function keyPressed() {
	// train model (by adding examples)
	// NOTE: in KNN, the model is the entire dataset itself
	const logits = features.infer(video)
	switch(key) {
		case '1':
		case '2':
		case '3':
		case '4':
		case '5':
			knn.addExample(logits, key)
			console.log("train -- " + key)
			break;
		default:
			break;
	}

	// Save data to a json file
	if (key == "s") {
		knn.save("model.json")
	}
}

/*function mousePressed() {
	// classify input
	if (knn.getNumLabels() > 0) {
		const logits = features.infer(video)
		knn.classify(logits, gotResult)
	}
}*/

/*function mousePressed_OLD() {
	// infer logits from image (snapshot of video)
	const logits = features.infer(video)
	console.log(logits)
	logits.print() // print tensor array
	console.log(logits.dataSync()) // print as "regular" array
}*/

// tensorflow
// ml5.js

// Input (224 x 244 image)
// MobileNet model
// NEURAL NETWORK
// logits layer (1000 x 1 vector) "image fingerprint"
// softmax layer
// Output


// KKN distance:
// - eucledian distance (good for 2d, 3d)
// - cosine similarity (good for higher dimensions)