 class Game
{
    constructor(){}

  getState()
  {
      var  gameStateRef =database.ref('gameState');
      gameStateRef.on("value",function(data){gameState=data.val()});

  }

  updateState(state)
  {
    gameState=state;
    database.ref('/').update({gameState:gameState});
  }

  async start()
  {
      if(gameState===0)
    {
      player= new Player();
      var playerCountRef=await database.ref('playerCount').once("value");

      if(playerCountRef.exists())
      {
        player.getCount();
      }

      form= new Form();
      form.display();
      
      obstacleGroup= createGroup();
      rewardGroup =createGroup();

      runner1=createSprite(displayWidth/8,displayHeight/2-25,50,50);
      runner1.addAnimation("running",runner_Img);
      runner1.addAnimation("died",diedImg);
      runner1.scale=0.7;
      //runner1.debug=true
      runner1.setCollider("rectangle",0,0,runner1.width-200,runner1.height-300)
      invisibleground=createSprite(runner1.x,runner1.y+100,80,20);
      invisibleground.visible=false;
   
      backg1=createSprite(displayWidth/2+50,displayHeight/2-50,displayWidth+50,displayHeight+50);
      backg1.addImage(bg1);
      backg1.scale=2.5;

      backg1.depth=runner1.depth;
      runner1.depth+=1
      backg1.visible= false;
      runner1.visible=false;
      invisibleground.x=runner1.x;

      over=createSprite(displayWidth/2,displayHeight/2-200);
      over.addImage(gameOver);
      over.scale=1.5;
      over.visible=false;

           
    push();
    fill("yellow");
    stroke("black")
    textSize(20);
    textFont("Lucida Calligraphy")
    text("NOTE : Use up arrow to increase the runner size and earn rewards.",10,400)
    text("Use down arrow to decrease the runner size and escape from the aliens.",10,450)
    pop();

    }
    
  }
  play()
 {
    
     console.log(backg1.x)
     form.disappear(); 
    console.log(runner1.y,"height");
     textSize(40);
     text('Game Start!',120,100);
     backg1.velocityX=-12;
     backg1.visible=true;
     runner1.visible=true;
     invisibleground.x=runner1.x;
  
     if(score<120)
    {
    
      if(backg1.x<300)
      {
        backg1.x=backg1.width/2+400;
        backg1.scale=3.0;
      }
    }
     else if(score>100)
     {
       //backg1.velocityX=backg1.velocityX+10;
       backg1.addImage(bg2);
       if(backg1.x<500)
       {
         backg1.x=backg1.width/2-200;
         backg1.scale=3.0;
       }
     }else if(score>1000){
       backg1.addImage(bg3);

       if(backg1.x<900)
       {
         backg1.x=backg1.width/2;
         backg1.scale=3.0
       }

     }
   
  
    if(keyDown(UP_ARROW)&&runner1.y>=100&&runner1.y<600)
    {
      runner1.velocityY=-8; 
      runner1.scale=0.1;
    }
    else if(keyDown(DOWN_ARROW))
    {
      runner1.scale=0.7;
      // runner1.y=runner.y+5;
    }
    if(runner1.y>=100&&runner1.y<600)
    {
      runner1.velocityY=runner1.velocityY+0.8;
      runner1.bounceOff(invisibleground);
    }
    else if(runner1.y<=100)
    {
      runner1.velocityY=1;
    }else if (runner1.y>600){
     // gameState=2;
  runner1.y=displayHeight/2;
  
    }
      camera.y=250;
      camera.x=runner1.x+400;
    if(rewardGroup.isTouching(runner1)&& runner1.scale===0.7)
    {  
      score+=20;
      rewardGroup.destroyEach(); 
      pointSound.play();
     
    }
    if(obstacleGroup.isTouching(runner1)&&runner1.scale===0.7)
    {
      gameState=2;
      rewardGroup.destroyEach();
    
    }
 }
  Obstacles()
 {
  if(frameCount%155===0)
  {
    console.log(displayHeight/4,"hai");
    console.log(displayHeight/2,"hello");
      var randY=Math.round(random(displayHeight/4,displayHeight/2));
      // randX=Math.round(random(runner.x+200,runner.x+1000));
      obstacles=createSprite(runner1.x+1200,randY,20,20);
      obstacles.shapeColor="white";
      var rand=Math.round(random(1,2));
      switch(rand)
    {
      case 1:obstacles.addImage(obstacleImg1);
              break;
      case 2:obstacles.addImage(obstacleImg2);
              break;
      default:break;
    }
      obstacles.scale=0.45;
      obstacles.velocityX=-5
      obstacles.setCollider("rectangle",0,0,obstacles.width-300,obstacles.height-200)
      obstacles.lifetime=300;
       obstacleGroup.add(obstacles);
  }
 }

  Rewards()
 {
    if(frameCount%280===0)
   {
      // rex=Math.round(random(runner.x+200,runner.x+1000));
      var  rey=Math.round(random(displayHeight/3-200,displayHeight-400));
      reward=createSprite(runner1.x+1200,rey,30,30);
      var  rand=Math.round(random(1,2));
      switch(rand)
      {
        case 1:reward.addImage(foodImg);
              break;
        case 2:reward.addImage(jewelImg);
              break;
        case 2:reward.addImage(treasureImg);
              break;
        default:break;
      }
      reward.scale=0.3;
      reward.velocityX=-5
      reward.lifetime=300;
      //reward.debug=true;
      reward.setCollider("rectangle",10,10,reward.width-300,reward.height-100)
      rewardGroup.add(reward);
   }
 }
 end()
 {
      endSound.play();
      runner1.velocityY=0;
      backg1.velocityX=0;
      console.log("Game end");
      over.visible=true;
      runner1.changeAnimation("died",diedImg);
      obstacleGroup.setLifetimeEach(-1);
      rewardGroup.setLifetimeEach(-1);
      obstacleGroup.setVelocityXEach(0);
      rewardGroup.setVelocityXEach(0);
      
      if(keyDown(UP_ARROW)){
        runner1.scale=0.7
      }
  
 }



}