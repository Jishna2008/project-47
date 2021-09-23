var form,game,player,allPlayer;
var database,gameState=0,playerCount=0;

var runner1,runner2,runner_Img;
var obstacles,obstacleImg1,obstacleImg2;
var reward,foodImg,jewelImg,treasureImg;
var bg1,bg2,bg3,bg,invisibleground;
var rewardGroup,obstacleGroup;
var score=0;
var backg1,gameOver,over,diedImg;

var backSound1,backSound2,pointSound,endSound;
function preload()
{
    runner_Img=loadAnimation("img1.png","img2.png"," img3.png",
                 " img4.png"," img5.png"," img6.png");
    diedImg=loadAnimation("endImg.png");

    foodImg=loadImage("fruit.png");
    jewelImg=loadImage("ruby.png");
    treasureImg=loadImage("jewel.png");

    gameOver=loadImage("gameOver.png");
    obstacleImg1=loadImage("ufo.png");
    obstacleImg2=loadImage("alien.png");

    bg1=loadImage("moon run.PNG");
    bg2=loadImage("bg2.PNG");
    bg3=loadImage("bg3.PNG");
    bg=loadImage("Good.png");

   
    pointSound=loadSound("scoreSound.wav")
    endSound=loadSound("end sound.wav");
}

function setup(){
    
var canvas= createCanvas(windowWidth,windowHeight);
database=firebase.database();
game=new Game();
game.getState();
game.start();

}

function draw(){
 
     background(bg);

    if(playerCount===1){
        game.updateState(1);
   
    }
    if(gameState===1){
        game.play();  
        game.Obstacles();
        game.Rewards();   
    }
    if(gameState===2)
    {
    game.end();
    game.updateState(2);
    
    }
      drawSprites();

push();
fill("white");
textSize(32);
textFont("French Script MT")
text("Score :"+score,camera.x-650,50)
pop();


}

