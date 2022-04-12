/***********************************************************************************
  MoodyMaze
  by Scott Kildall
  Uses the p5.2DAdventure.js class  
------------------------------------------------------------------------------------
	To use:
	Add this line to the index.html
  <script src="p5.2DAdventure.js"></script>
***********************************************************************************/

//--- TEMPLATE STUFF: Don't change

// adventure manager global  
var adventureManager;

// p5.play
var playerAvatar;

// Clickables: the manager class
var clickablesManager;    // the manager class
var clickables;           // an array of clickable objects

// keycods for W-A-S-D
const W_KEY = 87;
const S_KEY = 83;
const D_KEY = 68;
const A_KEY = 65;

//---

//-- MODIFY THIS for different speeds
var speed = 10;

//--- Your globals would go here


// Allocate Adventure Manager with states table and interaction tables
function preload() {
  //--- TEMPLATE STUFF: Don't change
  clickablesManager = new ClickableManager('data/clickableLayout.csv');
  adventureManager = new AdventureManager('data/adventureStates.csv', 'data/interactionTable.csv', 'data/clickableLayout.csv');
  //---
}

// Setup the adventure manager
function setup() {
  createCanvas(1280, 720);

  //--- TEMPLATE STUFF: Don't change
  // setup the clickables = this will allocate the array
  clickables = clickablesManager.setup();
  //---

  // MODIFY THIS: change to initial position
  playerAvatar = new Avatar("Player", 640, 400);
   
  // MODIFY THIS: to make your avatar go faster or slower
  playerAvatar.setMaxSpeed(20);

  // MODIFY THIS: add your filenames here, right now our moving animation and standing animation are the same
  playerAvatar.addMovingAnimation( 'assets/blueblob-01.png', 'assets/blueblob-05.png');
  playerAvatar.addStandingAnimation('assets/blueblob-01.png', 'assets/blueblob-05.png');

  //--- TEMPLATE STUFF: Don't change
  // use this to track movement from toom to room in adventureManager.draw()
  adventureManager.setPlayerSprite(playerAvatar.sprite);

  // this is optional but will manage turning visibility of buttons on/off
  // based on the state name in the clickableLayout
  adventureManager.setClickableManager(clickablesManager);

    // This will load the images, go through state and interation tables, etc
  adventureManager.setup();

  // call OUR function to setup additional information about the p5.clickables
  // that are not in the array 
  setupClickables(); 
  //--
}

// Adventure manager handles it all!
function draw() {
  //--- TEMPLATE STUFF: Don't change
  // draws background rooms and handles movement from one to another
  adventureManager.draw();

  // draw the p5.clickables, in front of the mazes but behind the sprites 
  clickablesManager.draw();
  //---

  //--- MODIFY THESE CONDITONALS
  // No avatar for Splash screen or Instructions screen
  if( adventureManager.getStateName() !== "Splash" && 
      adventureManager.getStateName() !== "Instructions" ) {
      
    //--- TEMPLATE STUFF: Don't change    
    // responds to keydowns
    checkMovement();

    // this is a function of p5.play, not of this sketch
    drawSprite(playerAvatar.sprite);
    //--
  } 
}

//--- TEMPLATE STUFF: Don't change 
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
//--

//-- MODIFY THIS: this is an example of how I structured my code. You may
// want to do it differently
function mouseReleased() {
  if( adventureManager.getStateName() === "Splash") {
    adventureManager.changeState("Instructions");
  }
}


//-------------- CLICKABLE CODE  ---------------//

//--- TEMPLATE STUFF: Don't change 
function setupClickables() {
  // All clickables to have same effects
  for( let i = 0; i < clickables.length; i++ ) {
    clickables[i].onHover = clickableButtonHover;
    clickables[i].onOutside = clickableButtonOnOutside;
    clickables[i].onPress = clickableButtonPressed;
  }
}
//--

//-- MODIFY THIS:
// tint when mouse is over
clickableButtonHover = function () {
  this.color = "#AA33AA";
  this.noTint = false;
  this.tint = "#FF0000";
}

//-- MODIFY THIS:
// color a light gray if off
clickableButtonOnOutside = function () {
  // backto our gray color
  this.color = "#AAAAAA";
}

//--- TEMPLATE STUFF: Don't change 
clickableButtonPressed = function() {
  // these clickables are ones that change your state
  // so they route to the adventure manager to do this
  adventureManager.clickablePressed(this.name); 
}
//



//-------------- SUBCLASSES / YOUR DRAW CODE CAN GO HERE ---------------//

//-- MODIFY THIS:
// Change for your own instructions screen

// Instructions screen has a backgrounnd image, loaded from the adventureStates table
// It is sublcassed from PNGRoom, which means all the loading, unloading and drawing of that
// class can be used. We call super() to call the super class's function as needed
class InstructionsScreen extends PNGRoom {
  // preload is where we define OUR variables
  // Best not to use constructor() functions for sublcasses of PNGRoom
  // AdventureManager calls preload() one time, during startup
  preload() {
    // These are out variables in the InstructionsScreen class
    this.textBoxWidth = (width/6)*4;
    this.textBoxHeight = (height/6)*4; 

    // hard-coded, but this could be loaded from a file if we wanted to be more elegant
    this.instructionsText = "You are navigating through the interior space of your moods. There is no goal to this game, but just a chance to explore various things that might be going on in your head. Use the ARROW keys to navigate your avatar around.";
  }

  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our instructions on top of this
  draw() {
    // tint down background image so text is more readable
    tint(128);
      
    // this calls PNGRoom.draw()
    super.draw();
      
    // text draw settings
    fill(255);
    textAlign(CENTER);
    textSize(30);

    // Draw text in a box
    text(this.instructionsText, width/6, height/6, this.textBoxWidth, this.textBoxHeight );
  }
}

//-- MODIFY THIS: for your own classes
// (1) copy this code block below
// (2) paste after //-- done copy
// (3) Change name of TemplateScreen to something more descriptive, e.g. "PuzzleRoom"
// (4) Add that name to the adventureStates.csv file for the classname for that appropriate room
class TemplateScreen extends PNGRoom {
  preload() {
    // define class varibles here, load images or anything else
  }

  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our code adter this
  draw() {
    // this calls PNGRoom.draw()
    super.draw();

    // Add your code here
  }
}
//-- done copy
//   // default direction facing LEFT for the moving animation
//   // MODIFY THIS: change to your avatar filenames
//   playerAvatar.addMovingAnimation( 'assets/run1.png', 'assets/run2.png');
//   playerAvatar.addStandingAnimation('assets/standing1.png', 'assets/standing2.png');

//   // MODIFY THIS - add more grabbables beloiw
//   // Add grabbables - these appear on top of the player icon
//   grabbables.push(new StaticSprite("Star", 500,500, 'assets/fullStar.png'));
//   grabbables.push(new StaticSprite("Key", 750,200, 'assets/key.png'));
//   grabbables.push(new StaticSprite("Wheel", 400,300, 'assets/wheel.png'));
// }

// // Setup code goes here
// function setup() {
//   createCanvas(1000, 800);
//   frameRate(30);

//   // This will setup the animation
//   for( let i = 0; i < grabbables.length; i++ ) {
//     grabbables[i].setup();
//   }

//   // loads image for the door
//   door.setup();
//  }

// // Draw code goes here
// function draw() {
//   // MODIFY THIS: if you want to do something more with the key
//   if( opened ) {
//     background(128,80,0);
//   }
//   else {
//     background(128);
//   }

//   // trap keyboard arrow keys
//   checkMovement();

//   // drawSprites is a function in p5.play, draws all the sprites
//   drawSprites();

//   // We call this to support grabbables
//   playerAvatar.update();

//   checkOverlaps();
// }

// function checkOverlaps() {
//   // We are looking for an overlap of the player avatar with the door.
//   // the 2nd argument is a local callback function, that will get called repeatedly while
//   // we may build better ov
//  playerAvatar.sprite.overlap(door.sprite, doorCollision);

//   // go through grabble array and set these 
//   overlapCount = 0;
//   for( let i = 0; i < grabbables.length; i++ ) {
//     playerAvatar.sprite.overlap(grabbables[i].sprite, grabbableCollision);
//   }

//   // we aren't overlapping, so prevent re-pickup
//   if( overlapCount === 0 ) {
//     preventPickup = false;
//   }
//   if( overlapCount === 1 ) {
//     preventRepickup = false;
//   }
// }

// // This will reset position
// function keyPressed() {
//   if( key === ' ') {
//     if( playerAvatar.grabbable !== undefined ) {
//       preventPickup = true;
//       playerAvatar.clearGrabbable();
//     }
//   }

//   // MODIFY THIS
//   // Comment out this code BELOW if you don't have multiple avatars
//   checkSelectAvatar();
// }

// // MODIFY THIS: if you are using multiple avatars for selection. Change the filenames
// function checkSelectAvatar() {
//   // code to switch avatar animations
//   if( key === '1') {
//     playerAvatar.addMovingAnimation( 'assets/run1.png', 'assets/run2.png');
//     playerAvatar.addStandingAnimation('assets/standing1.png', 'assets/standing2.png');
//   }
//   if( key === '2') {
//     playerAvatar.addMovingAnimation( 'assets/blob01.png', 'assets/blob08.png');
//     playerAvatar.addStandingAnimation('assets/blob01.png', 'assets/blob08.png');
//   }
//   if( key === '3') {
//     playerAvatar.addMovingAnimation( 'assets/sun1.png', 'assets/sun5.png');
//     playerAvatar.addStandingAnimation('assets/sun1.png', 'assets/sun5.png');
//   }
// }

// // respond to W-A-S-D or the arrow keys
// function checkMovement() {
//   var xSpeed = 0;
//   var ySpeed = 0;

//   // Check x movement
//   if(keyIsDown(RIGHT_ARROW) || keyIsDown(D_KEY)) {
//     xSpeed = speed;
//   }
//   else if(keyIsDown(LEFT_ARROW) || keyIsDown(A_KEY)) {
//     xSpeed = -speed;
//   }
  
//   // Check y movement
//   if(keyIsDown(DOWN_ARROW) || keyIsDown(S_KEY)) {
//     ySpeed = speed;
//   }
//   else if(keyIsDown(UP_ARROW) || keyIsDown(W_KEY)) {
//     ySpeed = -speed;
//   }

//   playerAvatar.setSpeed(xSpeed,ySpeed);
// }

// // When the player avatar intesects with the door, gets called repeatedly
// function doorCollision(spriteA, spriteB) {
//   if( playerAvatar.getGrabbableName() === "Key" ) {
//     opened = true;
//   }
//   else {
//     playerAvatar.setPosition(width/2, height/2);
//     opened = false;
//   }
// }

// // When the player avatar intesects with the door, gets called repeatedly
// // SpriteB = grabble sprite
// function grabbableCollision(spriteA, spriteB) {  
//   overlapCount++;

//   if( preventPickup || preventRepickup ) {
//     return;
//   }

//   // check for new grabble (not self)
//   if( playerAvatar.grabbable === undefined || playerAvatar.grabbable.sprite !== spriteB ) {
//     for( let i = 0; i < grabbables.length; i++ ) {
//       if( grabbables[i].sprite === spriteB ) {
//         //console.log("new set: " + i);
//         playerAvatar.setGrabbable(grabbables[i]);
//         preventRepickup = true;
//         break;
//       }
//     }    
//   }
// }