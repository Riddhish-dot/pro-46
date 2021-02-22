class Stone{
    constructor(x,y,width,height){
        var options = {
            isStatic:false,
            resistution:0,
            friction:1,
            density:1.2
        }
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.body = Bodies.rectangle(this.x,this.y,this.width,this.height,options)
    this.image = loadImage("stone.png")
    World.add(world,this.body)
    }
    display(){
        imageMode(CENTER)
        fill(255,255,255)
        image(this.image,this.body.position.x,this.body.position.y,this.width,this.height)
     }
 }