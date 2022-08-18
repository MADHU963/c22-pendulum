const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint= Matter.Constraint;


var engine;
var world;


var ball;
var con;
var ball2;
var con2;


var ground,right,left,top_wall;


function setup() {
  createCanvas(400,400);
  engine = Engine.create();
  
  world = engine.world;


  ground =new Ground(200,390,400,20);
  right = new Ground(390,200,20,400);
  left = new Ground(10,200,20,400);
  top_wall = new Ground(200,10,400,20);

  var ball_options = {
    restitution: 0.8
  }
  
  
  ball = Bodies.circle(200,50,10,ball_options);
  World.add(world,ball);

  ball2 = Bodies.circle(350,10,12,ball_options);
  World.add(world,ball2);
  
  con = Constraint.create({
          pointA:{x:200,y:20},
          bodyB:ball,
          pointB:{x:0,y:0},
          length:100,
          stiffness:1
          
        });
  
      World.add(world,con);
      
  //2nd constraint
        
   con2 = Constraint.create({
          bodyA:ball,
          pointA:{x:0,y:0},
          bodyB:ball2,
          pointB:{x:0,y:0},
          length:100,
          stiffness:1
        });
  
      World.add(world,con2);
  
  rectMode(CENTER);
  ellipseMode(RADIUS);
  
}

function draw() 
{
  background(0);
  Engine.update(engine);

  push();
  strokeWeight(2);
  stroke("red");
  line(con.pointA.x, con.pointA.y, ball.position.x, ball.position.y);
  line(ball.position.x,ball.position.y,ball2.position.x,ball2.position.y);
  pop();


  ellipse(ball.position.x,ball.position.y,10);
  ellipse(ball2.position.x,ball2.position.y,12);

 


  ground.show();
  top_wall.show();
  left.show();
  right.show();
  
}

function keyPressed()
{
  if(keyCode==RIGHT_ARROW)
    {
      Matter.Body.applyForce(ball,{x:0,y:0},{x:0.05,y:0});
    }
}

