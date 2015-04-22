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
    
    //door variables
    this.barrier = null;
    this.doorHealth = null;
    
    //icon variables
    this.rightArrows = null;
    this.leftArrows = null;
    this.upArrows = null;
    this.downArrows = null;
    this.arrowCount = 0;
    
    //slashes variables
    this.slashes = null;
    
    //sound
    this.fx = null;
    this.music = null;
    this.miss = null;
    
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
                var arrow = this.leftArrows.getFirstAlive();
                this.damageDoor(arrow);
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
                var arrow = this.rightArrows.getFirstAlive();
                this.damageDoor(arrow);
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
                var arrow = this.upArrows.getFirstAlive();
                this.damageDoor(arrow);
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
                var arrow = this.downArrows.getFirstAlive();
                this.damageDoor(arrow);
            }
        }
        else
        {
            this.notDown = true;
        }
    };
    
    this.damageDoor = function(arrow)
    {
        if(arrow == null)
        {
            this.score -= 1000;
            this.miss.play();
        }
        else
        {
            this.doorHealth -= 1;
            arrow.kill();
            this.arrowCount -= 1;
            this.createAttack();
            this.fx.play();
        }
        
        if(this.arrowCount == 0)
        {
            this.createEnemies();
        }
    };
    
    this.createAttack = function()
    {
        var attack = this.slashes.getFirstExists(false);
        var tempX = this.game.rnd.integer() % 100 + 550;
        var tempY = this.game.rnd.integer() % 100 + 550;
        attack.reset(tempX, tempY);
        attack.lifespan = 200;
        attack.angle = this.game.rnd.integer() % 180;
    }
    
    //initializes enemies
    this.createEnemies = function()
    {
        var tempX = this.game.rnd.integer() % 1000 + 100;
        var tempY = this.game.rnd.integer() % 600 + 100;
        
        var numRight = this.game.rnd.integer() % 4 + 1;
        var numLeft = this.game.rnd.integer() % 4 + 1;
        var numUp = this.game.rnd.integer() % 4 + 1;
        var numDown = this.game.rnd.integer() % 4 + 1;
        
        for(var i = 0; i < numRight; i++)
        {
            var arrow = this.rightArrows.getFirstExists(false);
            arrow.reset(tempX, tempY);
            arrow.body.velocity.x = this.game.rnd.integer() % 500 - 250;
            arrow.body.velocity.y = this.game.rnd.integer() % 500 - 250;
        }
        for(var j = 0; j < numLeft; j++)
        {
            var arrow = this.leftArrows.getFirstExists(false);
            arrow.reset(tempX, tempY);
            arrow.body.velocity.x = this.game.rnd.integer() % 500 - 250;
            arrow.body.velocity.y = this.game.rnd.integer() % 500 - 250;
        }
        for(var k = 0; k < numUp; k++)
        {
            var arrow = this.upArrows.getFirstExists(false);
            arrow.reset(tempX, tempY);
            arrow.body.velocity.x = this.game.rnd.integer() % 500 - 250;
            arrow.body.velocity.y = this.game.rnd.integer() % 500 - 250;
        }
        for(var l = 0; l < numDown; l++)
        {
            var arrow = this.downArrows.getFirstExists(false);
            arrow.reset(tempX, tempY);
            arrow.body.velocity.x = this.game.rnd.integer() % 500 - 250;
            arrow.body.velocity.y = this.game.rnd.integer() % 500 - 250;
        }
        
        this.arrowCount = numRight+numLeft+numUp+numDown;
    };
    
    this.fillGroups = function()
    {
        for(var i = 0; i < 10; i++)
        {
            var arrow = this.rightArrows.create(0, 0, 'rightPoint');
            arrow.anchor.setTo(0.5, 0.5);
            arrow.body.bounce.set(1);
            arrow.body.collideWorldBounds = true;
            arrow.kill();
        }
        for(var j = 0; j < 10; j++)
        {
            var arrow = this.leftArrows.create(0, 0, 'leftPoint');
            arrow.anchor.setTo(0.5, 0.5);
            arrow.body.bounce.set(1);
            arrow.body.collideWorldBounds = true;
            arrow.kill();
        }
        for(var k = 0; k < 10; k++)
        {
            var arrow = this.upArrows.create(0, 0, 'upPoint');
            arrow.anchor.setTo(0.5, 0.5);
            arrow.body.bounce.set(1);
            arrow.body.collideWorldBounds = true;
            arrow.kill();
        }
        for(var l = 0; l < 10; l++)
        {
            var arrow = this.downArrows.create(0, 0, 'downPoint');
            arrow.anchor.setTo(0.5, 0.5);
            arrow.body.bounce.set(1);
            arrow.body.collideWorldBounds = true;
            arrow.kill();
        }
    }
    
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
    
    //creates icons
    this.rightArrows = this.game.add.group();
    this.rightArrows.enableBody = true;
    this.rightArrows.physicsBodyType = Phaser.Physics.ARCADE;
    
    this.leftArrows = this.game.add.group();
    this.leftArrows.enableBody = true;
    this.leftArrows.physicsBodyType = Phaser.Physics.ARCADE;
    
    this.upArrows = this.game.add.group();
    this.upArrows.enableBody = true;
    this.upArrows.physicsBodyType = Phaser.Physics.ARCADE;
    
    this.downArrows = this.game.add.group();
    this.downArrows.enableBody = true;
    this.downArrows.physicsBodyType = Phaser.Physics.ARCADE;
    
    this.slashes = this.game.add.group();
    this.slashes.enableBody = true;
    this.slashes.createMultiple(100, 'slash', 0, false);
    this.slashes.setAll('anchor.x', 0.5);
    this.slashes.setAll('anchor.y', 0.5);
    this.slashes.setAll('outOfBoundsKill', true);
    
    this.fillGroups();
    this.createEnemies();
    
    //sound
    this.fx = this.game.add.audio('slash');
    this.miss = this.game.add.audio('wrong');
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
    this.game.debug.text("Time: " + parseInt((this.game.time.now - this.score)/1000), 50, 750);
}