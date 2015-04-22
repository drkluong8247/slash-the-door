/**
 * Created by Brannon on 4/2/2015.
 */

BasicGame.Game = function(game) {
    //player variables
    this.keys = null;
    this.notHeld = null;
    this.score = 0;
    
    
    //sound
    this.fx = null;
    this.music = null;
    
    //end game text
    this.endText = "";
    
    //checks player 1 input
    this.checkKeys = function() {
        
        //player 1 movement
        if(this.keys.left.isDown)
        {
            if(this.notHeld)
            {
                this.notHeld = false;
            }
        }
        else if(this.keys.right.isDown)
        {
            if(this.notHeld)
            {
                this.notHeld = false;
            }
        }
        else if(this.keys.up.isDown)
        {
            if(this.notHeld)
            {
                this.notHeld = false;
            }
        }
        else if(this.keys.down.isDown)
        {
            if(this.notHeld)
            {
                this.notHeld = false;
            }
        }
        else
        {
            this.notHeld = true;
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
    
    //revives enemies as needed
    this.revive = function()
    {
        
    };
    
    //end game feedback
    this.gameOver = function()
    {
        var tempStyle = {font: "40px Arial", fill: "#ffffff", align: "left"}
        this.endText = this.game.add.text(600, 400, "", tempStyle);
        this.endText.anchor.setTo(0.5, 0.5);
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
    this.notHeld = true;
    
    //sound
    this.fx = this.game.add.audio('castSound');
    this.music = this.game.add.audio('backgroundMusic', 1, true);
    this.music.play('', 0, 1, true);
}

function update(){
    //check player input
    this.checkKeys();
}

function render()
{
}