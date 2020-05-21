// Adding Physics to the project
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies
const Constraint = Matter.Constraint;
const MouseConstraint = Matter.MouseConstraint;
const Mouse = Matter.Mouse;

// Declaring the variables
var engine,world,canvas,particle,back,boxy=[],mConstraint,timeLeft=30,startTime=0,counter=0,ding;
var gameState = "PLAY",gameState1 = "PLAY",score = 0;



// Calling the function preload
function preload() {
  ding = loadSound("ding.mp3");
  gameOver = loadImage("GameOver.png");
}



// Calling the function convertSeconds
function convertSeconds(s) {
  if(gameState === "PLAY") {
    var min = floor(s / 60);
    var sec = s % 60; 
    return nf(min,2) + ':' + nf(sec,2);
  }
}



// Calling the function setup
function setup() {

  // Creating a canvas
  canvas = createCanvas(900,600);

  // Creating the engine and adding world to it
  engine = Engine.create();
  world = engine.world;

  // Getting the url's parameters
  var params = getURLParams();

  // Creating min if minute is there in url's parameters
  if(params.minute) {
    var min = params.minute;
    // Making the timeleft min * 60
    timeLeft = min * 60;
  }

  // Selecting the timer paragraph from the index file
  var timer = select('#Timer');
  // Displaying the time left
  timer.html(convertSeconds(timeLeft - counter));

  // Setting the interval at every 1000 milliseconds
  var interval = setInterval(timeIt, 1000);

  // Calling the function timmeIt
  function timeIt(){
    // Increasing the counter by 1
    counter++;
    timer.html(convertSeconds(timeLeft - counter));
    // Playing the sound and stopping the timer if counter is equal to the timer
    if(counter === timeLeft)  {
      ding.play();
      counter = 0;
      // Clearing the nterval so that the timer stops
      clearInterval(interval);
      gameState = "END";
    }
  }

  // Creating a canvas mouse
  var canvasmouse = Mouse.create(canvas.elt);

  // Changing the pixel ratio according to the density of the screen
  canvasmouse.pixelRatio = pixelDensity();

  // Adding canvas mouse to the mouse constraint
  var op = {
    Mouse: canvasmouse
  }

  // Creating the mouse constraint
  mConstraint = MouseConstraint.create(engine, op);

  // Adding it to the world
  World.add(world,mConstraint);

  // Displaying the gameOver image
  back1 = new Background1(0,0);

  if(gameState === "PLAY") {
    // Defining the air ground's options and making it static
    var air_ground_options = {
      isStatic: true,
      restitution: 0
    }

    // Creating the air ground
    air_ground = Bodies.rectangle(725,250,200,20,air_ground_options);
    
    // Adding the air ground to the world
    World.add(world,air_ground);

    // Creating a background
    back = new Background(width/2,height,width,100);

    // Creating a side line so that the boxes don't go out of the canvas
    sideline = new Background(width,height,20,height);

    // Creating a new particle
    particle = new Particle(180,150,25);

    // Creating a new catapult
    catapult = new Catapult(180,150);

    // Creating a new constraint
    constr = new Constrant(catapult.body,particle.body,0,0.25);

    // Declaring a x and a y
    var x = 620;
    var y = 530;

    // Declaring a colour
    r1 = 10;
    r2 = 10;
    r3 = 200;

    // Creating some boxes on the ground
    for(var i = 0; i < 100; i++) {

      if(i < 13) {
        box1 = new Box(x,y,20,40,r1,r2,r3);
        boxy.push(box1);
      } else if(i === 13) {
          x = 630;
          y = 490;
          r1 = 37;
          r2 = 249;
      } else if(i >= 13 && i < 24){
          box1 = new Box(x,y,20,40,r1,r2,r3);
          boxy.push(box1);
      } else if(i === 24) {
          x = 660;
          y = 450;
          r1 = 107;
          r2 = 29;
      } else if(i >= 24 && i < 32) {
          box1 = new Box(x,y,20,40,r1,r2,r3);
          boxy.push(box1);
      } else if(i === 32) {
          x = 690;
          y = 410;
          r1 = 247;
          r2 = 187;
          r3 = 65;
      } else if(i >= 32 && i < 37) {
          box1 = new Box(x,y,20,40,r1,r2,r3);
          boxy.push(box1);
      } else if(i === 37) {
          x = 720;
          y = 370;
          r1 = 0;
          r3 = 0;
      } else if(i >= 37 && i < 39) {
        box1 = new Box(x,y,20,40,r1,r2,r3);
        boxy.push(box1);
      }

      // Adding 20 to the x everytime
      x = x + 20; 
    }

    // Declaring another colour
    o1 = 100;
    o2 = 230;
    o3 = 0;

    // Declaring a p and a z
    var p = 220;
    var z = 655

    // Creating some boxes on the air ground
    for(var o = 0; o < 20; o++) {

      if(o<8) {
        box1 = new Box(z,p,20,40,o1,o2,o3);
        o1 = o1+20;
        o2 = o2+20;
        o3 = o3+20;
        boxy.push(box1);
      }

      if(o === 8) {
        z = 675;
        p = 180;
      }

      if(o >= 8 && o < 14) {
        o1 = 100;
        o2 = 255;
        o3 = 200;
        box1 = new Box(z,p,20,40,o1,o2,o3);
        boxy.push(box1);
      } 

      if(o === 14) {
        z = 695;
        p = 140;
      }

      if(o >= 14 && o < 18) {
        o1 = 100;
        o2 = 255;
        o3 = 20;
        box1 = new Box(z,p,20,40,o1,o2,o3);
        boxy.push(box1);
      }

      if(o === 18) {
        z = 715;
        p = 100;
      }

      if(o >= 18 && o < 20) {
        o1 = 10;
        o2 = 25;
        o3 = 200;
        box1 = new Box(z,p,20,40,o1,o2,o3);
        boxy.push(box1);
      }

      // Adding 20 to z everytime
      z = z + 20;
    }
  }
}



// Main part of the function called
function draw() {

  // Colouring the background white
  background(255,255,255);
  
  // Updating the engine
  Engine.update(engine);

  text(mouseX + "," +  mouseY,10,15);

  if(gameState === "PLAY") {
    textSize(30);
    textFont("Algerian");
    fill("red");
    stroke("yellow");
    strokeWeight(2);
    text("SCORE : " + score, 700,40);
    fill("green");
    textSize(15);
    text("Write '?minute=' and then the time in minutes in the url to set the timer.",0,400);
    text("A default timer of 30 seconds is set.",0,450);

    // Displaying the back
    back.display();

    // Making a rectangle at the air ground's position
    rectMode(CENTER);
    fill("grey");
    stroke("black");
    rect(air_ground.position.x,air_ground.position.y,200,20);

    // Displaying the catapult
    catapult.display();

    // Displaying the boxes
    for(var j = 0; j < boxy.length; j++) {
      boxy[j].display();
    }

    // Removing the bodies from the array if there speed is more than 4
    if(boxy[0]) {
      if(boxy[0].body.speed > 4) {
        score++;
        boxy.splice(0,1);
      }
    }

    if(boxy[1]) {
      if(boxy[1].body.speed > 4) {
        score++;
        boxy.splice(1,1);
      }
    }

    if(boxy[2]) {
      if(boxy[2].body.speed > 4) {
        score++;
        boxy.splice(2,1);
      }
    }

    if(boxy[3]) {
      if(boxy[3].body.speed > 4) {
        score++;
        boxy.splice(3,1);
      }
    }

    if(boxy[4]) {
      if(boxy[4].body.speed > 4) {
        score++;
        boxy.splice(4,1);
      }
    }

    if(boxy[5]) {
      if(boxy[5].body.speed > 4) {
        score++;
        boxy.splice(5,1);
      }
    }

    if(boxy[6]) {
      if(boxy[6].body.speed > 4) {
        score++;
        boxy.splice(6,1);
      }
    }

    if(boxy[7]) {
      if(boxy[7].body.speed > 4) {
        score++;
        boxy.splice(7,1);
      }
    }

    if(boxy[8]) {
      if(boxy[8].body.speed > 4) {
        score++;
        boxy.splice(8,1);
      }
    }

    if(boxy[9]) {
      if(boxy[9].body.speed > 4) {
        score++;
        boxy.splice(9,1);
      }
    }

    if(boxy[10]) {
      if(boxy[10].body.speed > 4) {
        score++;
        boxy.splice(10,1);
      }
    }

    if(boxy[11]) {
      if(boxy[11].body.speed > 4) {
        score++;
        boxy.splice(11,1);
      }
    }

    if(boxy[12]) {
      if(boxy[12].body.speed > 4) {
        score++;
        boxy.splice(12,1);
      }
    }

    if(boxy[13]) {
      if(boxy[13].body.speed > 4) {
        score++;
        boxy.splice(13,1);
      }
    }

    if(boxy[14]) {
      if(boxy[14].body.speed > 4) {
        score++;
        boxy.splice(14,1);
      }
    }

    if(boxy[15]) {
      if(boxy[15].body.speed > 4) {
        score++;
        boxy.splice(15,1);
      }
    }

    if(boxy[16]) {
      if(boxy[16].body.speed > 4) {
        score++;
        boxy.splice(16,1);
      }
    }

    if(boxy[17]) {
      if(boxy[17].body.speed > 4) {
        score++;
        boxy.splice(17,1);
      }
    }

    if(boxy[18]) {
      if(boxy[18].body.speed > 4) {
        score++;
        boxy.splice(18,1);
      }
    }

    if(boxy[19]) {
      if(boxy[19].body.speed > 4) {
        score++;
        boxy.splice(19,1);
      }
    }

    if(boxy[20]) {
      if(boxy[20].body.speed > 4) {
        score++;
        boxy.splice(20,1);
      }
    }

    if(boxy[21]) {
      if(boxy[21].body.speed > 4) {
        score++;
        boxy.splice(21,1);
      }
    }

    if(boxy[22]) {
      if(boxy[22].body.speed > 4) {
        score++;
        boxy.splice(22,1);
      }
    }

    if(boxy[23]) {
      if(boxy[23].body.speed > 4) {
        score++;
        boxy.splice(23,1);
      }
    }

    if(boxy[24]) {
      if(boxy[24].body.speed > 4) {
        score++;
        boxy.splice(24,1);
      }
    }

    if(boxy[25]) {
      if(boxy[25].body.speed > 4) {
        score++;
        boxy.splice(25,1);
      }
    }

    if(boxy[26]) {
      if(boxy[26].body.speed > 4) {
        score++;
        boxy.splice(26,1);
      }
    }

    if(boxy[27]) {
      if(boxy[27].body.speed > 4) {
        score++;
        boxy.splice(27,1);
      }
    }

    if(boxy[28]) {
      if(boxy[28].body.speed > 4) {
        score++;
        boxy.splice(28,1);
      }
    }

    if(boxy[29]) {
      if(boxy[29].body.speed > 4) {
        score++;
        boxy.splice(29,1);
      }
    }

    if(boxy[30]) {
      if(boxy[30].body.speed > 4) {
        score++;
        boxy.splice(30,1);
      }
    }

    if(boxy[31]) {
      if(boxy[31].body.speed > 4) {
        score++;
        boxy.splice(31,1);
      }
    }

    if(boxy[32]) {
      if(boxy[32].body.speed > 4) {
        score++;
        boxy.splice(32,1);
      }
    }

    if(boxy[33]) {
      if(boxy[33].body.speed > 4) {
        score++;
        boxy.splice(33,1);
      }
    }

    if(boxy[34]) {
      if(boxy[34].body.speed > 4) {
        score++;
        boxy.splice(34,1);
      }
    }

    if(boxy[35]) {
      if(boxy[35].body.speed > 4) {
        score++;
        boxy.splice(35,1);
      }
    }

    if(boxy[36]) {
      if(boxy[36].body.speed > 4) {
        score++;
        boxy.splice(36,1);
      }
    }

    if(boxy[37]) {
      if(boxy[37].body.speed > 4) {
        score++;
        boxy.splice(37,1);
      }
    }

    if(boxy[38]) {
      if(boxy[38].body.speed > 4) {
        score++;
        boxy.splice(38,1);
      }
    }

    if(boxy[39]) {
      if(boxy[39].body.speed > 4) {
        score++;
        boxy.splice(39,1);
      }
    }

    if(boxy[40]) {
      if(boxy[40].body.speed > 4) {
        score++;
        boxy.splice(40,1);
      }
    }

    if(boxy[41]) {
      if(boxy[41].body.speed > 4) {
        score++;
        boxy.splice(41,1);
      }
    }

    if(boxy[42]) {
      if(boxy[42].body.speed > 4) {
        score++;
        boxy.splice(42,1);
      }
    }

    if(boxy[43]) {
      if(boxy[43].body.speed > 4) {
        score++;
        boxy.splice(43,1);
      }
    }

    // Displaying the constraint and the particle
    constr.display();
    particle.display();
  }

  // Displaying the game over image when game ends
  if(gameState === "END") {
    back1.display();
  }
}


// Using the function key pressed
function keyPressed() {

  if(gameState === "PLAY") {
    // Attaching the particle's body if space is pressed
    if(keyCode === 32) {
      particle.body.x = 100;
      particle.body.y = 300;
      constr.attach(particle);

      // Changing the colour everytime space is pressed
      particle.c1 = particle.c1 + random(0,100);
      particle.c2 = particle.c2 + random(0,100);
      particle.c3 = particle.c3 + random(0,100);
    }

    // Making the colour as 0 if it is more than 255
    if(particle.c1 > 255) {
      particle.c1 = 0;
    }

    if(particle.c2 > 255) {
      particle.c2 = 0;
    }

    if(particle.c3 > 255) {
      particle.c3 = 0;
    }
  }
}


// Using mouse dragged function
function mouseDragged(){

  if(gameState === "PLAY") {
    // Changing the x and the y position of particle when the mouse is dragged
    Matter.Body.setPosition(particle.body, {x: mouseX , y: mouseY});
  }
}


// Using mouse released function
function mouseReleased(){

  if(gameState === "PLAY") {
    // Making the partilce fly
    constr.fly();
  }
}
