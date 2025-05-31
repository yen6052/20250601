/*
----- Coding Tutorial by Patt Vira ----- 
Name: Interactive Fridge Magnets
Video Tutorial: https://youtu.be/72pAzuD8tqE

Connect with Patt: @pattvira
https://www.pattvira.com/
----------------------------------------
*/

let video, handPose, hands = [];
let rocket;
let meteors = [];
let numMeteors = 5;
let grabbedMeteor = null;

function preload() {
  handPose = ml5.handPose({flipped: true});
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, {flipped: true});
  video.hide();
  handPose.detectStart(video, gotHands);

  rocket = new Rocket();
  for (let i = 0; i < numMeteors; i++) {
    meteors.push(new Meteor());
  }
}

function draw() {
  background(220);
  
  // Display video and detect index and thumb position
  image(video, 0, 0, width, height);
  if (hands.length > 0) {
    let index = hands[0].keypoints[8];
    let thumb = hands[0].keypoints[4];
    
    noFill();
    stroke(0, 255, 0);
    text("index", index.x, index.y);
    text("thumb", thumb.x, thumb.y);
  
    for (let i=0; i<numMeteors; i++) {
      meteors[i].touch(thumb.x, thumb.y, index.x, index.y);
    }
  }
  
  for (let i=0; i<numMeteors; i++) {
    meteors[i].display();
  }
}

function gotHands(results) {
  hands = results;
}