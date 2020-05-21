// Creating a function constrant
function Constrant(bodyA,bodyB,length,stiffness) {

    // Declaring the constraint options
    var constraint_options = {

        bodyA: bodyA,
    
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
            if(gameState === "PLAY") {
                var pointAx = this.body.bodyA.position.x;
                var pointAy = this.body.bodyA.position.y;
                var pointBx = this.body.bodyB.position.x;
                var pointBy = this.body.bodyB.position.y;

                stroke("black");
                strokeWeight(3);

                // Making a line between the point and the bodyB
                line(pointAx,pointAy,pointBx,pointBy);
            } else if(gameState === "END") {
                World.remove(world,this.body);
            }
        }
    }
}