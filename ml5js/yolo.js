let model
let objects = null
let video
let ready = false

function setup() {
	createCanvas(640,480)
	video = createCapture(VIDEO)
	video.size(640,480)
	video.hide()

	model = ml5.YOLO(video, modelReady) // initialize YOLO model
}

function modelReady() {
	console.log("model is ready!")
	ready = true
}

function detect() {
	// object detection & bounding box
	console.log("detect()")
	model.detect(function(error, result){
		/*objects = result // array of all objects in image (with their coords and class names)
		console.log(result)
		//detect() // recursion*/
	})
}

function draw() {
	background(51)
	image(video,0,0, 640,480) // Draw video in the canvas

	if (ready == true) {
		 detect()
	}

/*	// Draw the bounding boxes
	if (objects == null) {
		return
	} else {
		console.log(objects.length)
	}
	for (let i = 0; i < objects.length; i++) {
		//fill(0,0,255) // blue
		//noStroke()
		//text(objects[i].className, objects[i].x*640, objects[i].y*480-5)
	}*/
}