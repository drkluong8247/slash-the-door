/**
 * Created by Brannon on 4/2/2015.
 */

BasicGame.Game = function(game) {
    //player variables
    this.keys = null;
    this.notLeft = null;
    this.notUp = null;
    this.notRight = null;
    this.notDown = null;
    this.score = 0;
    this.finished = false;
    
    //object variables
    this.barrier = null;
    this.doorHealth = null;
    
    //sound
    this.fx = null;
    this.music = null;
    
    //end game text
    this.endText = "";
    
    //checks player 1 input
    this.checkKeys = function() {
        
        //player 1 input
        if(this.keys.left.isDown)
        {
            if(this.notLeft)
            {
                this.notLeft = false;
                this.doorHealth -= 1;
            }
        }
        else
        {
            this.notLeft = true;
        }
        
        
        if(this.keys.right.isDown)
        {
            if(this.notRight)
            {
                this.notRight = false;
                this.doorHealth -= 1;
            }
        }
        else
        {
            this.notRight = true;
        }
        
        
        if(this.keys.up.isDown)
        {
            if(this.notUp)
            {
                this.notUp = false;
                this.doorHealth -= 1;
            }
        }
        else
        {
            this.notUp = true;
        }
        
        
        if(this.keys.down.isDown)
        {
            if(this.notDown)
            {
                this.notDown = false;
                this.doorHealth -= 1;
            }
        }
        else
        {
            this.notDown = true;
        }
    };
    
    //initializes enemies
    this.createEnemies = function()
    {
        //modified from Invaders
        for(var y = 0; y < 10; y++)
        {
            //var enemy = this.enemies.create(0, this.game.rnd.integer() % 700 + 50, 'monster');
            //enemy.anchor.setTo(0.5, 0.5);
            //enemy.body.bounce.set(1);
            //enemy.body.velocity.x = game.rnd.integer() % 150 + 50;
            //enemy.body.velocity.y = game.rnd.integer() % 150 + 50;
            //enemy.body.collideWorldBounds = true;
           // enemy.health = 3;
        }
        
        this.enemies.x = 1100;
        this.enemies.y = 0;
    };
    
    this.checkDoor = function()
    {
        if(this.doorHealth <= 0)
        {
            this.doorHealth = 0;
            this.gameOver();
        }
    }
    
    //revives enemies as needed
    this.revive = function()
    {
        
    };
    
    //end game feedback
    this.gameOver = function()
    {
        this.score = parseInt((this.game.time.now - this.score) / 1000);
        var tempStyle = {font: "40px Arial", fill: "#ffffff", align: "left"}
        this.endText = this.game.add.text(600, 200, "Time: " + this.score, tempStyle);
        this.endText.anchor.setTo(0.5, 0.5);
        this.finished = true;
    }
};

BasicGame.Game.prototype = {
    create: create,
    update: update,
    render: render
};

function create() {
    //create background
    this.game.stage.backgroundColor = '#000000';
    
    //creates input for player 1
    this.keys = this.game.input.keyboard.createCursorKeys();
    this.notLeft = true;
    this.notUp = true;
    this.notRight = true;
    this.notDown = true;
    
    //score
    this.score = this.game.time.now;
    
    //create door
    this.barrier = this.game.add.sprite( this.game.world.centerX, 600, 'door');
    this.barrier.anchor.setTo(0.5,0.5);
    this.doorHealth = 300;
    
    //sound
    this.fx = this.game.add.audio('castSound');
    this.music = this.game.add.audio('backgroundMusic', 1, true);
    this.music.play('', 0, 1, true);
}

function update(){
    //check player input
    if(!(this.finished))
    {
        this.checkKeys();
        this.checkDoor();
    }
}

function render()
{
    this.game.debug.text("Health: " + this.doorHealth, 500, 350);
}