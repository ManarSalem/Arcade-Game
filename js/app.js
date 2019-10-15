let win=1;
let hit =0;

// Enemies our player must avoid
//class enemy
var Enemy = function(x,y) {

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    //our enemy , the enemy move in the x axis only
    this.sprite = 'images/enemy-bug.png';
    this.x=x;
    this.y=y;
    //this.speed=speed;
    this.backUpX=x;
    this.backUpY=y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

   

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    for(let i=0; i<allEnemies.length; i++){
        allEnemies[i].speed=160*(win/2);}
        //reset the bug posotion
        if( this.x >= 500 ){
            this.reset();
        }

        

        //handling collision with the enemies
    if( player.x >= this.x -50 && player.x <=this.x + 50 ){
        if( player.y >= this.y -50 && player.y <=  this.y+50 ){
            player.x = 200;
            player.y = 400;
            hit++;
         
        }
    }
    
};

Enemy.prototype.reset = function(){
    this.x = this.backUpX;
    this.y = this.backUpY;
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let header=document.querySelector('.win-score');

header.innerHTML=`you win: ${0} times`;
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y){
    this.charecter =  'images/char-boy.png';
    this.x = x;
    this.y = y;
};
Player.prototype.update = function(dt){
    if( this.y < -10 ){
        this.reset(); 
      header.innerHTML=`you win: ${win} times`;
      win++; 
       }
      
    
      if(win==6)
      {
          this.charecter='images/char-cat-girl.png';
      }
      if(win==11)
      {
          this.charecter='images/char-horn-girl.png'
      }
        
};
Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.charecter), this.x, this.y);
};
Player.prototype.handleInput = function(keyCode){
    //here we just give the player speed of(40px) and make sure he/she not go outside the canvac
    if( keyCode === 'left' && this.x > 0 )  
        this.x = this.x - 55;
    else if( keyCode === 'right' && this.x< 390)
        this.x = this.x +55;
    else if( keyCode === 'up'  && this.y >-20)
        this.y = this.y -55;
    else if( keyCode === 'down' && this.y< 415)
        this.y = this.y + 55;

      
};
Player.prototype.reset = function(){
    //the initial position
    this.x = 200;
    this.y = 400;
};


// Now instantiate your objects.
let bug1 = new Enemy(100,60);
let bug2 = new Enemy(-600,60);
let bug3 = new Enemy(-165,140);
let bug4 = new Enemy(-500,140);



// Place all enemy objects in an array called allEnemies
let allEnemies = [bug1,bug2,bug3,bug4];

// Place the player object in a variable called player
let player =new Player(200,400);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});



