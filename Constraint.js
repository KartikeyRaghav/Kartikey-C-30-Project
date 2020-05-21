// Creating a function constrant
function Constrant(x,y,bodyB,length,stiffness) {

    // Declaring the constraint options
    var constraint_options = {

        pointA: {
          x: x,
          y: y
        },
    
        bodyB: bodyB,
    
        length: length,
    
        stiffness: stiffness
    }
    
    // Creating a body
    this.body = Constraint.create(constraint_options);

    // Adding the body to the world
    World.add(world,this.body);

    // Creating a fly function
    this.fly = function() {
        this.body.bodyB = null;
    }

    // Creating an attach function
    this.attach = function() {
        this.body.bodyB = bodyB;
    }

    // Creating a display function
    this.display = function() {

        if(this.body.bodyB) {
            var pointAx = this.body.pointA.x;
            var pointAy = this.body.pointA.y;
            var pointBx = this.body.bodyB.position.x;
            var pointBy = this.body.bodyB.position.y;

            stroke("black");
            strokeWeight(3);

            // Making a line between the point and the bodyB
            line(pointAx,pointAy,pointBx,pointBy);
        }
    }
}