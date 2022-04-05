/***********************************************************************************
  Sprite Navigation

  Simple use of the p5.play library
------------------------------------------------------------------------------------
	To use:
	Add this line to the index.html

  <script src="p5.timer.js"></script>
***********************************************************************************/

// This is a 'sprite' which we can move
var ghost;
var pink;
var speed = 100;d

// The is a static sprite
var star;
var starImg;

//const W_KEY = ADD LATER FROM REPO

function preload() {
  starImg = loadImage('assets/fullStar.png');
  //pinkImg = loadImage('assets/finalcircledesign');
  //starImg = loadImage('assets/finalregulardesign');
  
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

  
  // create a star in the middle of the screen
  star = createSprite(width/2, height/2);
  star.addImage('star', starImg);

  //pink avatar
  //pink = createSprite(width/2,height/2);
  //pink.addImage('pink',pinkImg);

  frameRate(30);
 }

// Draw code goes here
function draw() {
  // could draw a PNG file here
  background(255);

  // trap keyboard arrow keys
  checkMovement();
  //checkMovementAgain();

  // drawSprites is a function in p5.play, draws all the sprites
  drawSprites();

  // callback function
  // ghost.overlap(7, pink.position.x, pink.position.y);
  // pink.overlap(ghost, pinkCollision)
  //player.overlap(star,ghostCollision);
}

// This will reset position
function keyPressed() {
  if( key === ' ') {
    pinkCollision();
  }
}

function checkMovement() {
  // Check x movement
  if(keyIsDown(RIGHT_ARROW)) {
    ghost.velocity.x = speed;
  }
  else if(keyIsDown(LEFT_ARROW)) {
    ghost.velocity.x = -speed;
  }
  else {
    ghost.velocity.x = 0;
  }

  // Check y movement
  if(keyIsDown(DOWN_ARROW)) {
    ghost.velocity.y = speed;
  }
  else if(keyIsDown(UP_ARROW)) {
    ghost.velocity.y = -speed;
  }
  else {
    ghost.velocity.y = 0;
  }

    //x movmement
    if(keyIsDown(68)) {
      //D key
      pink.velocity.x = speed;
    }
    else if(keyIsDown(65)) {
      //a
      pink.velocity.x = -speed;
    }
    else {
      pink.velocity.x = 0;
    }
    //check y movement
    if(keyIsDown(83)) {
      //s
      pink.velocity.y = speed;
    }
    else if(keyIsDown(87)) {
      //w
      pink.velocity.y = -speed;
    }
    else {
      pink.velocity.y = 0;
    }

}

function checkMovementAgain() {
  //x movmement
  if(keyIsDown(68)) {
    //D key
    pink.velocity.x = speed;
  }
  else if(keyIsDown(65)) {
    //a
    pink.velocity.x = -speed;
  }
  else {
    pink.velocity.x = 0;
  }
  //check y movement
  if(keyIsDown(83)) {
    //s
    pink.velocity.y = speed;
  }
  else if(keyIsDown(87)) {
    //w
    pink.velocity.y = -speed;
  }
  else {
    pink.velocity.y = 0;
  }

}

// SpriteA is the sprite in question, spriteA will be ghost in this case
// SpriteB is the one that it collided with
function avatarCollision(spriteA, spriteB) {
  pink.position.x = random(50,500);
  pink.position.y = random(50,500);

  ghost.position.x = random(50,500);
  ghost.position.y = random(50,500);

  //spriteB.position.x = random(50,500);
  //spriteB.position.y = random(50,500);
  
}