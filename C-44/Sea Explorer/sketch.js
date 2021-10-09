var PLAY = 1;
var END = 0;
var gameState = PLAY;
var fish, shark;
var gemsGroup, sharksGroup;
var score, gameover, restart;

function preload(){
  fishImage = loadImage("fishImg.png");
  sharkImage = loadImage("sharkImg.png");
  backGroundImg = loadImage("bgImg.jpeg");
  gemImage = loadImage("gemImg.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(1800, 900);
  
  fish = createSprite(150,500,20,20);
  fish.addImage(fishImage);
  fish.scale = 0.6;
  fish.setCollider("rectangle",0,0,135,85);

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;

  gemsGroup = new Group();
  sharksGroup = new Group();

  score = 0;

}



function draw() {
  background(backGroundImg);

  textSize(45);
  text("Score: "+ score, 1500,100);

  if (gameState===PLAY) {
    
  
  score = score + Math.round(getFrameRate()/60);

  spawnShark();
  spawnGems();

  



if (keyDown(UP_ARROW)) {
  fish.y  = fish.y - 3.5;
}

if (keyDown(DOWN_ARROW)) {
  fish.y  = fish.y + 3.5;
}



if (fish.isTouching(gemsGroup)) {
  score = score + 100;
  gem.visible = false;
  gem.destroy();
}

if(sharksGroup.isTouching(fish)){

  gameState = END;
    
}
}else if (gameState === END) {

  gameOver.visible = true;
  restart.visible = true;

  fish.velocityY = 0;
  gemsGroup.setVelocityXEach(0);
  sharksGroup.setVelocityXEach(0);

  gemsGroup.setLifetimeEach(-1);
  sharksGroup.setLifetimeEach(-1);
 
  if(mousePressedOver(restart)) {
    reset();
  }

}

 drawSprites();
}

function spawnGems() {
  if (frameCount%400 === 0) {
    rando = Math.round(random(10,850));
    gem = createSprite(1800, rando, 40, 10);
    gem.addImage(gemImage);
    gem.velocityX = -6;
    gem.scale = 0.3;
    gem.lifetime = 350;
    gem.depth = fish.depth;
    fish.depth = fish.depth + 1;
    gemsGroup.add(gem);
  }
}
function spawnShark() {
  if (frameCount%180 === 0) {
    rand = Math.round(random(10,850));
    shark = createSprite(1800, rand, 40, 10);
    shark.velocityX = -(6 + 3*score/100)
    shark.lifetime = 300;
    shark.addImage(sharkImage);
    shark.scale = 1.4;
    shark.setCollider("rectangle",0,0,225,75);
    sharksGroup.add(shark);
  }
}

function reset(){
  gameState = PLAY;

  gameOver.visible = false;
  restart.visible = false;
  
  sharksGroup.destroyEach();
  gemsGroup.destroyEach();
    
  score = 0;
  
}