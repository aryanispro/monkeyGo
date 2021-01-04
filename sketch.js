//Hungry monkey

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, survivalTime;
var ground;


//GameStates
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//Preload
function preload(){
  
  backgroundImage = loadImage("bg.jpg");
  //Monkey
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  //Banana
  bananaImage = loadImage("banana.png");
  //Obstacle
  obstacleImage = loadImage("obstacle.png");
 
}


//Setup
function setup() {
  //Canvas
  createCanvas(400,400);
  
   background = createSprite(0,0,600,500);
  background.addImage(backgroundImage);
  background.scale = 2.5
  
  
  //Groups
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  TimeGroup = createGroup();
  
  //Monkey
  monkey = createSprite(50, 250, 10, 10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
 //Ground
  ground = createSprite(70, 350, 800, 10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  
  //score
  score = 0;
  survivalTime = 0;
  
}

//Draw
function draw() {
  
  
  
 
  
   background.velocityX = -3 

    if (background.x < 0){
      background.x = background.width/2;
    }
  
  
  
 //Monkey
  monkey.collide(ground);
  //PLAY
  if(gameState === PLAY){
      monkey.changeAnimation("running", monkey_running);
    
    //survialTime = Math.round(getframeRate/30 ());
 survivalTime = survivalTime + Math.round(getFrameRate() / 60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space") && monkey.y >= 300) {
        monkey.velocityY = -18;
    }    
    
    if(FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score = score+1;
    }
   
  //Gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  
    
  
  
  //groups lifetime
  obstacleGroup.setLifetimeEach(-1);
  
  //Adding Functions
  food();
  obstacles();
    
    
      
    drawSprites();
    
    if(obstacleGroup.isTouching(monkey)){
        
        gameState = END;
      
    }
  }
  //END
   if (gameState === END) {
     obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
     survivalTime.visible = false;
     

     stroke("red");
    fill("red");
       textSize(30);
  text("Game Over", 110, 200);
     
      stroke("black");
    fill("red");
       textSize(30);
     text("Monkey is dead", 90, 240);
   }
 
  
    //displaying survialtime
  stroke("white");
    fill("blue");
      textSize(20);
  text("Survival Time:"+  survivalTime, 200, 50);
 // text("Survival Time:"+  survivalTime, 200, 50);
  
  //displaying score
  stroke("white");
    fill("red");
      textSize(20);
  text("Banana Eaten:"+  score, 200, 100);
}

//Banana
function food() {
  if (frameCount % 99 === 0) {
    banana = createSprite(400,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    FoodGroup.add(banana);
  }
}

//Obstacles
function obstacles() {
  if (frameCount % 300 === 0){
    obstacle = createSprite(400,325,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -5;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1 ;
     obstacleGroup.add(obstacle);
  }

}

 
 


