// Creating a function catapult
function Catapult(x,y) {

    // Declaring the options
    var op  = {
        isStatic: true
    }

    //  Creating a body 
    this.body = Bodies.rectangle(x,y,0,0,op);
    
    // Loading the image
    this.image = loadImage("Catapult.png");

    // Adding the body to the world
    World.add(world,this.body);

    // Creating a display function
    this.display = function() {
        if(gameState === "PLAY") {
            var pos = this.body.position;
            // Displaying the image
            rectMode(CENTER);
            rect(pos.x,pos.y,10,10);
            image(this.image,0,40);
        } else if (gameState == "END") {
            World.remove(world,this.body);
        }
    }
}