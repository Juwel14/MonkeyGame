// creating global variables 
var monkey , monkey_running;

var banana ,bananaimage;

var ground;

var obstacle, obstacleimage;

var bananaGroup, obstacleGroup;

var score;
var survivalTime;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload()
{
  // loading monkey animation
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

  // loading banana images
  bananaimage = loadImage("banana.png");
  
  // loading obstacle images
  obstacleimage = loadImage("obstacle.png");
}

function setup() 
{
  // creating the size of the canvas
  createCanvas(600,400);
  
  // creating the ground sprite
  ground = createSprite(400,345,1200,10);
  ground.shapeColor = "lawngreen";
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  // creating the monkey sprite
  monkey = createSprite(70,340,10,10);
  monkey.addAnimation("running" , monkey_running);
  monkey.scale = 0.12;
  
  // creating groups
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  // setting collider for monkey
  monkey.setCollider("circle" ,0,0,300);
  monkey.debug = false;
  
  // setting the score and survival time as 0
  score = 0;
  survivalTime = 0;
}

function draw() 
{
  // setting the background color
  background("skyblue");
  
  // displaying the score
  stroke("black");
  fill("blue");
  textSize(20);
  text("Banana Collected : "+ score , 300 , 50);
  
  // displaying the survival time
  stroke("black");
  fill("green");
  textSize(20);
  text("Survival Time - "+ survivalTime , 100 , 50);
  
  //creating game state play
  if (gameState === PLAY)
  {
    survivalTime = Math.ceil(frameCount/frameRate());
    
    // creating infinite grounds
    if (ground.x < 0)
    {
      ground.x = ground.width/2;
    }
  
    // jumping the monkey by pressing space key
    if(keyDown("space") && monkey.y >= 300) 
    {
      monkey.velocityY = -15;
    }

    // creating gravity for monkey
    monkey.velocityY = monkey.velocityY + 0.8;
    
    // spawn food
    spawnFood();
    
    // spawn obstacles
    spawnObstacles();
        
    // getting score when the monkey touches banana
    if (bananaGroup.isTouching(monkey))
    {
      bananaGroup.destroyEach();
      score = score + 1;
    }
    
    // ending the game when the monkey touches obstacles
    if (obstacleGroup.isTouching(monkey))
    {
      gameState = END;
    }
    
  } // stopping everything when game state is in end
   else if (gameState === END) 
   {
     ground.velocityX = 0;
     monkey.velocityY = 0;
      
     obstacleGroup.setLifetimeEach(-1);
     bananaGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0); 
   }
  
  // stopping the monkey from falling down
  monkey.collide(ground);
  
  drawSprites();
}

function spawnFood()
{
  if (frameCount % 150 === 0)
  {
    banana = createSprite(600,Math.round(random(120,200)),10,10);
    banana.addImage(bananaimage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    banana.lifetime = 145;
    bananaGroup.add(banana);
  }
}

function spawnObstacles()
{
  if (frameCount % 300 === 0)
  {
    obstacle = createSprite(600,320 ,10,10);
    obstacle.addImage(obstacleimage);
    obstacle.scale = 0.13;
    obstacle.velocityX = -5;
    obstacle.lifetime = 120;
    obstacleGroup.add(obstacle);
  }
}