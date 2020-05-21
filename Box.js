// Creating a function Box
function Box(x,y,w,h,color1,color2,color3) {

    // Declaring the options
    var options = {
        isStatic: false,
        restitution: 0
    }

    // Creating a body
    this.body = Bodies.rectangle(x,y,w,h,options);
    this.w = w;
    this.h = h;
    this.c1 = color1;
    this.c2 = color2;
    this.c3 = color3;

    // Adding the body to the world
    World.add(world, this.body);

    // Creatind a display function
    this.display = function() {
        var pos = this.body.position;
        push();
        rectMode(CENTER);
        fill(this.c1,this.c2,this.c3);
        stroke("black");
        strokeWeight(1);
        // Displaying the rectangle at the given position
        rect(pos.x,pos.y,this.w,this.h);
        pop();
    }
}