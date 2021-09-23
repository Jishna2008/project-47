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
    runner_Img=loadAnimation("images/img1.png","images/img2.png"," images/img3.png",
                 " images/img4.png"," images/img5.png"," images/img6.png");
    diedImg=loadAnimation("images/endImg.png");

    foodImg=loadImage(" images/fruit.png");
    jewelImg=loadImage(" images/ruby.png");
    treasureImg=loadImage(" images/jewel.png");

    gameOver=loadImage("images/gameOver.png");
    obstacleImg1=loadImage(" images/ufo.png");
    obstacleImg2=loadImage(" images/alien.png");

    bg1=loadImage(" images/moon run.PNG");
    bg2=loadImage(" images/bg2.PNG");
    bg3=loadImage(" images/bg3.PNG");
    bg=loadImage(" images/Good.png");

    backSound1=loadSound("sounds/bgS.mp3");
    pointSound=loadSound("sounds/scoreSound.wav")
    endSound=loadSound("sounds/end sound.wav");
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

