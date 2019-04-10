let video;
let poseNet;
let noseX = 0;
let noseY = 0;
let eyelX = 0;
let eyelY = 0;
let p;
let allX = [];
let allY = [];
 
function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
  poseNet = ml5.YOLO(video, modelReady);
}

function gotPoses(poses) {
  //console.log(poses);
  allX = []
  allY = []
  p = poses
  if (poses.length > 0) {
    for (let i = 0; i < poses.length; i++) {
      for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
        let x = poses[i].pose.keypoints[j].position.x;
        let y = poses[i].pose.keypoints[j].position.y;
        allX.push(x);
        allY.push(y);
      }
    }
    /*let nX = poses[0].pose.keypoints[0].position.x;
    let nY = poses[0].pose.keypoints[0].position.y;
    let eX = poses[0].pose.keypoints[1].position.x;
    let eY = poses[0].pose.keypoints[1].position.y;
    noseX = lerp(noseX, nX, 0.5);
    noseY = lerp(noseY, nY, 0.5);
    eyelX = lerp(eyelX, eX, 0.5);
    eyelY = lerp(eyelY, eY, 0.5);*/
  }
}

function modelReady() {
  console.log('model ready');
}

function draw() {
  image(video, 0, 0);
  
  /*let d = dist(noseX, noseY, eyelX, eyelY);

  fill(0, 255, 0);
  ellipse(noseX, noseY, 10);
  fill(255,0,0);
  ellipse(eyelX, eyelY, 10);*/

  for (let i = 0; i < allX.length; i++) {
    fill(255)
    ellipse(allX[i], allY[i], 15)
  }
}