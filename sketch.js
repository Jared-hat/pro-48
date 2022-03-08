var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obTop1, obTop2, obTop3;
var obstacleA, obstacleB, obstacleC;

var score=0;

var hiscore;

var PLAY=1;
var END=0 ;
var gameState=PLAY;

function preload(){
  bgImg = loadImage("assets/bg.png")

  obTop1 = loadImage("assets/obsTop1.png")
  obTop2 = loadImage("assets/obsTop2.png")
  obTop3 = loadImage("assets/t1.png")
  obstacleA = loadImage("assets/obsBottom1.png")
  obstacleB = loadImage("assets/obsBottom2.png")
  obstacleC = loadImage("assets/obsBottom3.png")

  balloonImg = loadImage("assets/p1.png")//,"assets/balloon2.png","assets/balloon3.png")
  gameOverImg = loadImage("assets/gameOver.png")
  resetImg = loadImage("assets/restart.png")

  jump = loadSound("assets/jump.mp3")
  death = loadSound("assets/die.mp3")


}

function setup(){

//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3

//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;

bottomObstaclesGroup = new Group()
topObstaclesGroup = new Group()
barGroup = new Group()

gameOver = createSprite(200,200)
gameOver.addImage(gameOverImg)
gameOver.visible=false

restart = createSprite(220,240)
restart.addImage(resetImg)
restart.visible=false
}

function draw() {
  
  background("black");
     if(gameState===PLAY){  
          //making the hot air balloon jump
          if(keyDown("space")) {
            balloon.velocityY = -6 ; 
            jump.play()
          }

          //adding gravity
           balloon.velocityY = balloon.velocityY + 2;
   
        bar()
        spawnObstaclesTop()
        spawnObstaclesBottom()
if(topObstaclesGroup.isTouching(balloon)||balloon.isTouching(topGround)||balloon.isTouching(bottomGround)||bottomObstaclesGroup.isTouching(balloon)){
  death.play()
  gameState=END
  }
}

if(gameState===END){
  gameOver.visible=true;
  restart.visible=true;

  balloon.velocityX=0
  balloon.velocityY=0

  topObstaclesGroup.setVelocityXEach(0)
  bottomObstaclesGroup.setVelocityXEach(0)
  barGroup.setVelocityXEach(0)

  topObstaclesGroup.setLifetimeEach(-1)
  bottomObstaclesGroup.setLifetimeEach(-1)
  barGroup.setLifetimeEach(-1)

  balloon.y=200

  score = score;

  if(mousePressedOver(restart)){

    reset();
  }
}
drawSprites();
Score();

}
function spawnObstaclesTop(){
  if(World.frameCount%60===0){
    obstacleTop=createSprite(400,50,40,50)
    obstacleTop.velocityX=-4

    obstacleTop.y=Math.round(random(10,100))

    var r = Math.round(random(1,3))
    
    switch(r){
      case 1: obstacleTop.addImage(obTop1);
      break;
      case 2: obstacleTop.addImage(obTop2);
      break;
      case 3: obstacleTop.addImage(obTop3);
      break;
      default:break
    }
    obstacleTop.scale=0.1;

    obstacleTop.lifetime=200;
    balloon.depth=balloon.depth+1;

    topObstaclesGroup.add(obstacleTop);
  }
  
}

function spawnObstaclesBottom(){
  if(World.frameCount%60===0){
    obstacleBottom=createSprite(300,800,40,50)
    obstacleBottom.velocityX=-4

 obstacleBottom.y=Math.round(random(10,350))

    var r1 = Math.round(random(1,3))
    
    switch(r1){
      case 1: obstacleBottom.addImage(obstacleA);
      break;
      case 2: obstacleBottom.addImage(obstacleB);
      break;
      case 3: obstacleBottom.addImage(obstacleC);
      break;
      default:break
    }
obstacleBottom.scale=0.1;

    obstacleBottom.lifetime=100;
    
    balloon.depth=balloon.depth+1;
    bottomObstaclesGroup.add(obstacleBottom);
  }
  
}

function bar(){
  if(World.frameCount%60===0){
  var b1 = createSprite(400,200,10,800)
  b1.velocityX=-6;
  b1.depth=balloon.depth;
  b1.lifetime=80;
  b1.visible=false;
  barGroup.add(b1);
  }
}

function Score(){
  if(balloon.isTouching(barGroup)){
    score = score+1;
  }
  textSize(20)
  fill("black")
  text("Score: " + score, 250,50)


textSize(20)
  fill("red")

if (score > hiscore){
  hiscore = score
  text("Top: " + hiscore, 50,50)

}
else 
  hiscore = hiscore
  text("Top: " + hiscore, 50,50)

  
}

function reset(){
  gameState=PLAY

  gameOver.visible=false
  restart.visible=false

  topObstaclesGroup.destroyEach()
  bottomObstaclesGroup.destroyEach()
  hiscore = score
  score=0

}