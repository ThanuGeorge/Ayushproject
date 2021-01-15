//variables
var BgImg , crash; 
var SpaceBg;
var Rocket;
var score , life;
var obstaclesGroup;
var Gamestate;

// preloading images and sound
function preload(){
BgImg = loadImage("SpaceBg.png");

crash = loadSound("crash.mp3")
RocketImg = loadImage("Rocket1.png")

}


function setup() {
  createCanvas(windowWidth,windowHeight);
  // Space background
  SpaceBg = createSprite(windowWidth/2, windowHeight/2, 50, 50);
  SpaceBg.addImage("BgImg", BgImg);
  SpaceBg.scale = 3.5;
  SpaceBg.velocityX = -2;
  
// Rocket
  Rocket = createSprite(180,windowHeight/2); 
Rocket.addImage(RocketImg);
Rocket.scale = 1.75;
Rocket.setCollider("rectangle",0,10,90,50);

  //create Obstacle group
  obstaclesGroup = createGroup();

  score = 0;

  life = 5;

  Gamestate = "Play";
  
  resetButton = createSprite(windowWidth/2 , windowHeight/2+100);
  //add reset image
}

function draw() {
  background(0);
 //resetting the background
  
 if(SpaceBg.x<windowWidth/2-100){
  SpaceBg.x = windowWidth/2
}

 if (Gamestate === "Play"){
         
  resetButton.visible = false;
    
//move rocket up
  if(keyDown("w")){
    Rocket.y -=4
  }  
//move rocket down
  if(keyDown("s")){
    Rocket.y +=4
  }  
//move rocket forward
  if(keyDown("d")){
    Rocket.x +=2
  }  
  //reseting rocket if it goes too front
  if(Rocket.x>windowWidth-1000){
    Rocket.x = 180;    
  }

  //reseting rocket if it goes too down 
  if(Rocket.y>windowHeight){
    //Rocket.x = 180;  
    Rocket.y = windowHeight/2;
  }
  
  //reseting rocket if it goes too up
  if(Rocket.y<windowHeight/2-500){
    //Rocket.x = 180;  
    Rocket.y = windowHeight/2;
  }
  
  score = score + Math.round(getFrameRate() / 60);

  //spawn obstacles 
  Obstacle();
// check is touching and destroy the asteroid. Also reduce the life 
  if(life >0){
    for(var i=0; i< obstaclesGroup.length;i++){
      if(Rocket.isTouching(obstaclesGroup.get(i))){
        obstaclesGroup.get(i).destroy();
        crash.play();
        life--
         //add code to remove life image;
      }
    }

  } else{
        Gamestate = "end" 
      }
    
    
  }
 drawSprites();
 //gamestate end
  if (Gamestate === "end"){
      fill("red");
      textSize(40);
      text("GAMEOVER", windowWidth/2-100 , windowHeight/2-100)
      
      resetButton.visible = true;
  }
 

  //displaying score
fill ("blue");
stroke("yellow");
textSize(32);
text("Score: " + score, 1520, 40);

fill("blue");
text("To move use W S D keys", windowWidth/2-170 , 40);


}

//asteroid creation
function Obstacle(){
   if (frameCount % 40 === 0){
    obstacle = createSprite(windowWidth,Math.round(random(10,windowHeight-10)),50,50);
    obstacle.velocityX = -(11 + score / 100);
    obstacle.lifetime = 165;
    
    obstaclesGroup.add(obstacle);
   }

}