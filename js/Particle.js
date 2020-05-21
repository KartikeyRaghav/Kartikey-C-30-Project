// Creating a function particle
function Particle(x,y,r) {

    // Declaring the options
    var op  = {
        isStatic: false,
        density: random(0,1)
    }

    //  Creating a body 
    this.body = Bodies.circle(x,y,r,op);
    this.r = r;
    this.c1 = 0;
    this.c2 = 0;
    this.c3 = 0;

    // Adding the body to the world
    World.add(world,this.body);

    // Creating a display function
    this.display = function() {
        if(gameState === "PLAY") {
            pos = this.body.position;
            ellipseMode(CENTER);
            stroke("yellow");
            fill(this.c1,this.c2,this.c3);
            strokeWeight(3);
            ellipse(pos.x,pos.y,this.r * 2);
        } else if(gameState === "END") {
            World.remove(world,this.body);
        }
    }
}