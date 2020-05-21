// Creating a function background
function Background(x,y,w,h) {

    // Declaring the options
    var op  = {
        isStatic: true
    }

    //  Creating a body 
    this.body = Bodies.rectangle(x,y,w,h,op);
    this.w = w;
    this.h = h;

    // Adding the body to the world
    World.add(world,this.body);

    // Creating a display function
    this.display = function() {
        if(gameState === "PLAY") {
            var pos = this.body.position;
            push();
            rectMode(CENTER);
            fill("grey");
            stroke("black");
            strokeWeight(2);
            // Displaying the rectangle at the given position
            rect(pos.x,pos.y,this.w,this.h);
            pop();
        } else if(gameState === "END") {
            World.remove(world,this.body);
        }
    }
}

// Creating a function background
function Background1(x,y) {

    // Declaring the options
    var op  = {
        isStatic: true
    }

    //  Creating a body 
    this.body = Bodies.rectangle(x,y,10,10,op);

    this.image = loadImage("GameOver.png");

    // Adding the body to the world
    World.add(world,this.body);

    // Creating a display function
    this.display = function() {
        push();
        rectMode(CENTER);
        fill("grey");
        stroke("black");
        strokeWeight(2);
        image(this.image,0,0,width,height,0,0,width,height);
        pop();
    }
}