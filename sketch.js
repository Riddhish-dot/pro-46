const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var boy,boyImage
var rock
var string
var stone3
var stoneImage
var land
var land2
var enemies,enemyImage
var obstacle,obstacleImage
var stoneCount = 0
var rockGroup,enemyGroup
var stone10
var count = 0
function preload(){
    boyImage = loadImage("boy.png")
    stoneImage = loadImage("stone.png")
    enemyImage = loadAnimation("bird1-removebg-preview.png","bird2-removebg-preview.png","bird3-removebg-preview.png")
    obstacleImage = loadImage("arrow.webp")
}
function setup(){
    createCanvas(1275,600)
    engine = Engine.create();
    world = engine.world;
    land = new Ground(width/2,height-40,width+200,20)
    rock = new Stone(250,430,60,40)
    string = new Rope(rock.body,{x:250,y:430})
    Engine.run(engine);
    land2 = createSprite(land.x,land.y,land.width,land.height)
    land2.velocityX = -10
    boy = createSprite(300,485,1,1)
	boy.addImage("a",boyImage)
	boy.scale = 0.1  
    rockGroup = new Group()
    enemyGroup = new Group()
}
function draw(){
    background("blue")
    if (land2.x<width/2){
       land2.x = land2.width/2
    }
    if (keyDown("space")&&count > 0){
    stone10 = createSprite(boy.x-50,boy.y-35,0,0)
    stone10.addImage("a",stoneImage)
    stone10.scale = 0.1
    stone10.lifetime = 1
    stoneCount = 0
    }
    if (boy.isTouching(land2)&& count > 1){
        stoneCount = count
    }
    if (count == 1&&stoneCount > 1){
        count = stoneCount
    }
    boy.collide(land2)
    if(boy.isTouching(rockGroup)){
rockGroup.destroyEach()
stoneCount = stoneCount+1
count = count+1
//Matter.Body.setPosition(rock.body,{x:250,y:430})
string.attach(rock.body)
    }
    boy.velocityY = boy.velocityY+0.5
    if (keyDown("space")&&boy.y>450){
    boy.velocityY = -11
    }
    if (rock.x>500){
        //stoneCount = stoneCount-1
        //count = count-1
    //    Matter.Body.setPosition(rock.body,{x:250,y:430})
    }
    rocks()
    enemy()
    land.display()
    drawSprites()
    if (stoneCount > 0){
        rock.x = boy.y
    rock.display()
    string.display()
    }
}
function enemy(){
    if (frameCount % 500 == 0){
 enemies = createSprite(width+30,height/2,0,0)
 enemies.addAnimation("a",enemyImage)
 enemies.velocityX = -17
 enemies.scale = 0.5
    }
    if (frameCount % 100 == 0){
    obstacle = createSprite(width+30,500,0,0)
    obstacle.addImage("a",obstacleImage)
    obstacle.velocityX = -15
    obstacle.scale = 0.25
    }
}
function rocks(){
    if (frameCount % 200 == 0){
      stone3 = createSprite(width+30,land2.y-30,0,0)
      stone3.addImage("a",stoneImage)
      stone3.scale = 0.1
      stone3.velocityX = -7.5
      rockGroup.add(stone3)
    }
}
function mouseDragged(){
    Matter.Body.setPosition(rock.body,{x:mouseX,y:mouseY})
}
function mouseReleased(){
    string.fly()
    //stoneCount = stoneCount-1
    //count = count-1
    if (count = 1){
        count = 0
        stoneCount = 1
    }
}