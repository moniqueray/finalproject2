/***********************************************************************************
  Sprite Navigation

  Simple use of the p5.play library
------------------------------------------------------------------------------------
	To use:
	Add this line to the index.html

  <script src="p5.timer.js"></script>
***********************************************************************************/

// This is a speed of the 'sprite' which we can move
var speed = 20;

// an array of all the class avaatars
var playerAvatar;
var selectedIndex = 0;

var grabbables = [];

// a static sprite representing the teleporting door
var door;

// keycods for W-A-S-D
const W_KEY = 87;
const S_KEY = 83;
const D_KEY = 68;
const A_KEY = 65;

// control variables for grabbables
var overlapCount = 0;
var preventPickup = false;        // for when you drop one
var preventRepickup = false;      // two objects

// opened 
var opened = false;

function preload() {
 
  // Add new avatar animations here
  playerAvatar = new Avatar("Player", 100, 150);
   
  // MODIFY THIS: to make your avatar go faster or slower
  playerAvatar.setMaxSpeed(5);

  door = new StaticSprite("Door", 900,700, 'assets/door.png');

  // default direction facing LEFT for the moving animation
  // MODIFY THIS: change to your avatar filenames
  playerAvatar.addMovingAnimation( 'assets/run1.png', 'assets/run2.png');
  playerAvatar.addStandingAnimation('assets/standing1.png', 'assets/standing2.png');

  // MODIFY THIS - add more grabbables beloiw
  // Add grabbables - these appear on top of the player icon
  grabbables.push(new StaticSprite("Star", 500,500, 'assets/fullStar.png'));
  grabbables.push(new StaticSprite("Key", 750,200, 'assets/key.png'));
  grabbables.push(new StaticSprite("Wheel", 400,300, 'assets/wheel.png'));
}

// Setup code goes here
function setup() {
  createCanvas(1000, 800);
  frameRate(30);

  // This will setup the animation
  for( let i = 0; i < grabbables.length; i++ ) {
    grabbables[i].setup();
  }

  // loads image for the door
  door.setup();
 }

// Draw code goes here
function draw() {
  // MODIFY THIS: if you want to do something more with the key
  if( opened ) {
    background(128,80,0);
  }
  else {
    background(128);
  }

  // trap keyboard arrow keys
  checkMovement();

  // drawSprites is a function in p5.play, draws all the sprites
  drawSprites();

  // We call this to support grabbables
  playerAvatar.update();

  checkOverlaps();
}

function checkOverlaps() {
  // We are looking for an overlap of the player avatar with the door.
  // the 2nd argument is a local callback function, that will get called repeatedly while
  // we may build better ov
 playerAvatar.sprite.overlap(door.sprite, doorCollision);

  // go through grabble array and set these 
  overlapCount = 0;
  for( let i = 0; i < grabbables.length; i++ ) {
    playerAvatar.sprite.overlap(grabbables[i].sprite, grabbableCollision);
  }

  // we aren't overlapping, so prevent re-pickup
  if( overlapCount === 0 ) {
    preventPickup = false;
  }
  if( overlapCount === 1 ) {
    preventRepickup = false;
  }
}

// This will reset position
function keyPressed() {
  if( key === ' ') {
    if( playerAvatar.grabbable !== undefined ) {
      preventPickup = true;
      playerAvatar.clearGrabbable();
    }
  }

  // MODIFY THIS
  // Comment out this code BELOW if you don't have multiple avatars
  checkSelectAvatar();
}

// MODIFY THIS: if you are using multiple avatars for selection. Change the filenames
function checkSelectAvatar() {
  // code to switch avatar animations
  if( key === '1') {
    playerAvatar.addMovingAnimation( 'assets/run1.png', 'assets/run2.png');
    playerAvatar.addStandingAnimation('assets/standing1.png', 'assets/standing2.png');
  }
  if( key === '2') {
    playerAvatar.addMovingAnimation( 'assets/blob01.png', 'assets/blob08.png');
    playerAvatar.addStandingAnimation('assets/blob01.png', 'assets/blob08.png');
  }
  if( key === '3') {
    playerAvatar.addMovingAnimation( 'assets/sun1.png', 'assets/sun5.png');
    playerAvatar.addStandingAnimation('assets/sun1.png', 'assets/sun5.png');
  }
}

// respond to W-A-S-D or the arrow keys
function checkMovement() {
  var xSpeed = 0;
  var ySpeed = 0;

  // Check x movement
  if(keyIsDown(RIGHT_ARROW) || keyIsDown(D_KEY)) {
    xSpeed = speed;
  }
  else if(keyIsDown(LEFT_ARROW) || keyIsDown(A_KEY)) {
    xSpeed = -speed;
  }
  
  // Check y movement
  if(keyIsDown(DOWN_ARROW) || keyIsDown(S_KEY)) {
    ySpeed = speed;
  }
  else if(keyIsDown(UP_ARROW) || keyIsDown(W_KEY)) {
    ySpeed = -speed;
  }

  playerAvatar.setSpeed(xSpeed,ySpeed);
}

// When the player avatar intesects with the door, gets called repeatedly
function doorCollision(spriteA, spriteB) {
  if( playerAvatar.getGrabbableName() === "Key" ) {
    opened = true;
  }
  else {
    playerAvatar.setPosition(width/2, height/2);
    opened = false;
  }
}

// When the player avatar intesects with the door, gets called repeatedly
// SpriteB = grabble sprite
function grabbableCollision(spriteA, spriteB) {  
  overlapCount++;

  if( preventPickup || preventRepickup ) {
    return;
  }

  // check for new grabble (not self)
  if( playerAvatar.grabbable === undefined || playerAvatar.grabbable.sprite !== spriteB ) {
    for( let i = 0; i < grabbables.length; i++ ) {
      if( grabbables[i].sprite === spriteB ) {
        //console.log("new set: " + i);
        playerAvatar.setGrabbable(grabbables[i]);
        preventRepickup = true;
        break;
      }
    }    
  }
}








// This is a 'sprite' which we can move
var ghost;
var pink;
var speed = 100;

// The is a static sprite
var star;
var starImg;

//this is a moveable grabbable
var 

// constant keycods for W-A-S-D
const W_KEY = 87;
const S_KEY = 83;
const D_KEY = 68;
const A_KEY = 65;

//preload
function preload() {
  starImg = loadImage('assets/fullStar.png');
  initialAvatar = new Avatar("New Player", 100, 150, "assets/girlavata01.png","assets/girlavatar02.png");
}

// Setup code goes here
function setup() {
  createCanvas(windowWidth, windowHeight);

  // create a sprite with dimensions
  ghost = createSprite(200, 200);
  pink = createSprite(200,200);

  // This is a *numbered* sequence of PNG files
  // We add animation to different sprites
  ghost.addAnimation('floating', 'assets/ghost_standing0001.png', 'assets/ghost_standing0007.png');
  pink.addAnimation('floating','assets/pink03.png', 'assets/pink04.png');

  
//   // create a star in the middle of the screen
//   star = createSprite(width/2, height/2);
//   star.addImage('star', starImg);

//   frameRate(30);
//  }

// Draw code goes here
function draw() {
  // could draw a PNG file here
  background(255);

  // trap keyboard arrow keys
  checkMovement();
  //checkMovementAgain();

  // drawSprites is a function in p5.play, draws all the sprites
  drawSprites();

  initialAvatar.update();

}

// This will reset position
function keyPressed() {
  if( key === ' ') {
    pinkCollision();
  }
}

//WASD oe arrow
function checkMovement() {
  // Check x movement
  if(keyIsDown(RIGHT_ARROW) || keyIsDown(D_KEY)) {
    xSpeed = 0;
    //ghost.velocity.x = speed;
  }
  else if(keyIsDown(LEFT_ARROW) || keyIsDown(A_KEY)) {
    xSpeed = -speed;
    //ghost.velocity.x = -speed;
  }
  //else {
   //ghost.velocity.x = 0;
  //}



  // Check y movement
  if(keyIsDown(DOWN_ARROW) || keyIsDown(S_KEY)) {
    ySpeed = speed;
    //ghost.velocity.y = speed;
  }
  else if(keyIsDown(UP_ARROW) || keyIsDown(W_KEY)) {
    ySpeed = speed;
    //ghost.velocity.y = -speed;
  }
  //else {
    //ghost.velocity.y = 0;
  //}
}

//the animated avatar and avatar class
class Avatar {
  constructor(name, x, y, startPNGPath, endPNGPath) {
    this.name = name;
    this.sprite = createSprite(x, y);
    this.sprite.addAnimation('walking', startPNGPath, endPNGPath);
    this.maxSpeed = 7;
    this.hadStandingAnimation = false;
    this.currentAnimation = 'walking';


  //   //console
  //   this.grabbable = undefined;

  //   //avatar no speed
  //   this.setSpeed(0,0);

  //   //standing animation
  //   addStandingAnimation(startPNGPath, endPNGPath) {
  //     this.sprite.addAnimation('standing', startPNGPath, endPNGPath);
  //     this.hadStandingAnimation = true;
  //   }
  // }

//accessor function for avatar to have a grabbable
// setGrabbable((grabbable) {
// this.grabbable = grabbable;
// }

// //if has grabbable, update avatar's position
// update() {
//   if(this.grabbable !== undefined ) {
//     this.grabbable.sprite.position.x = this.sprite.position.x +10;
//     this.grabbable.sprite.position.y = this.sprite.position.y + 10;
//   }
// }

// // 2D sprite which we will be able to pick up
// class Grabbable {
//   // call upon preload() of p5.js to acutally load the image
//   constructor(x, y, pngPath) {
//     this.img = loadImage(pngPath);
//     this.sprite = createSprite(x, y);
//   }

//   setup() {
//     this.sprite.addImage('static', this.img );
//   }
// }

// function checkMovementAgain() {
//   //x movmement
//   if(keyIsDown(68)) {
//     //D key
//     pink.velocity.x = speed;
//   }
//   else if(keyIsDown(65)) {
//     //a
//     pink.velocity.x = -speed;
//   }
//   else {
//     pink.velocity.x = 0;
//   }
//   //check y movement
//   if(keyIsDown(83)) {
//     //s
//     pink.velocity.y = speed;
//   }
//   else if(keyIsDown(87)) {
//     //w
//     pink.velocity.y = -speed;
//   }
//   else {
//     pink.velocity.y = 0;
//   }

// }

// SpriteA is the sprite in question, spriteA will be ghost in this case
// SpriteB is the one that it collided with
// function avatarCollision(spriteA, spriteB) {
//   pink.position.x = random(50,500);
//   pink.position.y = random(50,500);

//   ghost.position.x = random(50,500);
//   ghost.position.y = random(50,500);

  //spriteB.position.x = random(50,500);
  //spriteB.position.y = random(50,500);
  
// } }  
