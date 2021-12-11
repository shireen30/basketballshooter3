var hoopImg,hoop;
var basketballImg,basketball;
var obstacle, obstacleImg;
var backgroundSound;
var restartImg;
var restartButton;
var hits=4;
var score=0;
var gamestate="play";

function preload(){
hoopImg=loadImage("hoop.png")
basketballImg = loadImage("basketball.png");
//restartImg=loadImage("restart.png");
obstacleImg= loadImage("bomb.png");
backgroundSound = loadSound("basketball_beat.mp3");

}

function setup(){

  createCanvas(600,700);
 
  if(gamestate=="play")
{
  backgroundSound.loop();

  restartButton=createButton("Restart");
  restartButton.position(420,600);
  //restartButton.size(50,50);
   restartButton.mouseClicked(hitAgain)


 hoop=createSprite(300,10)
 hoop.addImage(hoopImg);
 hoop.scale=0.5
hoop.debug=false;
hoop.setCollider("circle",0,0,100);

 basketball = createSprite(300,400);
 basketball.addImage(basketballImg);
 basketball.scale = 0.2;
 basketball.debug=false;

 obstacle=createSprite(Math.round(random(50,500)),100,50,50);
 obstacle.addImage(obstacleImg);
 obstacle.scale = 0.2;
 obstacle.velocityX = 3;
 obstacle.velocityY = 4;

 hoop.velocityX=5;
 edges=createEdgeSprites();
}
}

function hitAgain(){
 
basketball.x=300;
basketball.y=400;
basketball.velocityY = 0;
hits = hits-1;
console.log("hits "+hits)
}

function draw(){
  background("green");
  hoop.depth=basketball.depth+1
 hoop.bounceOff(edges[1]);
 hoop.bounceOff(edges[0]);
 obstacle.bounceOff(edges[0]);
 obstacle.bounceOff(edges[1]);
 obstacle.bounceOff(edges[2]);
 obstacle.bounceOff(edges[3]);
console.log(gamestate);
if(gamestate=="play"){
  
  textSize(20);
  fill("black")
  text("Score:"+score,430,50);
  text("Chances Left:"+(hits-1),430,70);
  //moving  the basketball with the arrow keys
  if(keyWentDown("UP_ARROW")){
    basketball.velocityY = -19;
    
  }
  if(keyDown("LEFT_ARROW")){
    basketball.x = basketball.x-5;
  }
  if(keyDown("RIGHT_ARROW")){
    basketball.x=basketball.x+5;
  }
//fixing the depth to make the hoop more prominent

 if(frameCount%100==0){
var rand=Math.round(random(1,3));
//console.log(frameCount)
if(rand>1){
  hoop.velocityX=-7;
}
else{
  hoop.velocityX=7;
}

 }
 if(basketball.isTouching(hoop)){
   score+=10;
   hoop.x=10

 }
 
 if(score==40){
   gamestate="won";
 }

 if(obstacle.isTouching(basketball) ||hits<=0){
      gamestate="end"
   }
   drawSprites();
}
if(gamestate=="won"){
  background("yellow");
  textSize(30)
  fill("black")
  text("CONGRATULATIONS YOU WIN!!!",100,300);
  basketball.visible=false;
  obstacle.visible=false;
}
else if(gamestate=="end"){
  background("black");
  textSize(30)
  fill("yellow")
  text("GAME OVER: YOU LOST!",200,300);
  basketball.visible=false;
  obstacle.visible=false;
//  hoop.visible=false;
  restartButton.mouseClicked(reset)
  
}

 

}

function reset(){
  gamestate="play";
  basketball.visible=true;
  obstacle.visible=true;
  hoop.visible=true;
  console.log("restart");
  score=0;
  hits=4;
  basketball.x=300;
  basketball.y=400;
  basketball.velocityY=0;
  obstacle.velocityX = 3;
 obstacle.velocityY = 4;

 hoop.velocityX=5;
 restartButton.mouseClicked(hitAgain)
}
