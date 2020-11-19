
PLAY = 1;
END = 0;


gameState = PLAY;

var monkey , monkey_running,backGround;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,ground;
var survivalTime = 0;
var score = 0 ;



function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  backGround = loadImage("jungle.jpg")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,355);
  
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10); 
  console.log(ground.x);
  
  background = createSprite(300,130);
  background.addImage(backGround);
  background.scale = 1
  
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
 

}


function draw() {
    


    background.velocityX = -4; 

    if (background.x < 20){
      background.x = background.width/2;
    }
  
  
  if(gameState === PLAY){
    
  
    
   if(keyDown("space")&&monkey.y>200){
      monkey.velocityY = -20;

   }
    
     survivalTime = Math.ceil(frameCount/frameRate());
    
    
   if(monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      score = score +1;
     monkey.scale = monkey.scale +.02;
     
     
           }

    
    
     spawnObstacle();
     food(); 
  }
  

  
  if(gameState=== END){
    
    
    background.velocityX = 0;
    score = 0;
    
    bananaGroup.destroyEach();
    
   obstaclesGroup.setLifetimeEach(-1);
     
   obstaclesGroup.setVelocityXEach(0);
    
    monkey.collide(obstaclesGroup);
    monkey.velocityX= 0 ;
    
    if(keyDown("enter")){
        
        survivalTime=0;
        score=0;
      
        obstaclesGroup.destroyEach();
       
      
        gameState = PLAY;
    }
        
  }
  
  

  if(monkey.isTouching(obstaclesGroup)){
    
    monkey.scale = .1;
    gameState = END; 
    
  }
  
 

  
  monkey.velocityY = monkey.velocityY +1;
  

  ground.visible = false;
  monkey.collide(ground); 
  
  monkey.depth = background.depth+1
  
  drawSprites();

  
  stroke("white");
  textSize(20);
  fill("black");
  text("Score: "+score,300,50);
  
  stroke("white");
  textSize(20);
  fill("black");
  text("Survival Time: "+survivalTime,100,50 );
  
  
}


function spawnObstacle(){
  
  if(frameCount %200==0){
    obstacle = createSprite(500,315,20,20);
    obstacle.addImage("obstac",obstacleImage)
    obstacle.velocityX = -6;
    obstacle.scale = 0.2;
    obstacle.lifetime = -1;
  

      
    
     obstaclesGroup.add(obstacle);
    obstaclesGroup.setColliderEach("circle",0,0,160)
    
  } 
  
}

function food(){
  
  if(frameCount %60==0){
    banana = createSprite(500,315,20,20);
    banana.y = Math.round(random(120,200));
    banana.addImage("food",bananaImage)
    banana.velocityX = -6;
    banana.scale = 0.1;
    banana.lifetime = -1;
     
    bananaGroup.add(banana);
  }
  
  
}






