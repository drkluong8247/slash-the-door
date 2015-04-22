/**
 * Created by Brannon on 4/2/2015.
 */

BasicGame.Preloader = function(game) {
    this.background = null;
    this.preloadBar = null;

    this.ready = false;
};

BasicGame.Preloader.prototype = {
    preload: preload,
    create: create,
    update: update
};

function preload() {
    console.log("%cStarting game state Preloader", "color:white; background:green");
    this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, "icon");
    this.preloadBar.anchor.setTo(0.5, 0.5);

    this.load.setPreloadSprite(this.preloadBar);
    

//======================= load all in game assets ============================================
    // Loads images
    this.game.load.image( 'door', 'assets/images/HugeDoor.png');
    this.game.load.image( 'enter', 'assets/images/Button.png');
    this.game.load.image( 'rightPoint', 'assets/images/RightArrow.png');
    this.game.load.image( 'leftPoint', 'assets/images/LeftArrow.png');
    this.game.load.image( 'upPoint', 'assets/images/UpArrow.png');
    this.game.load.image( 'downPoint', 'assets/images/DownArrow.png');
    
    // loads sound
    this.game.load.audio( 'castSound', 'assets/audio/magicshot.mp3');
    this.game.load.audio( 'backgroundMusic', 'assets/audio/AnimalCrossing-TownHall.ogg');
    this.game.load.audio( 'ding', 'assets/audio/coincollect.ogg');
    
}

function create() {
    this.preloadBar.cropEnabled = false;
}

function update()
{
    this.preloadBar.angle += 1;
    if(this.cache.isSoundDecoded('backgroundMusic') && this.ready === false) {
        this.ready = true;
        this.state.start("Menu");
    }
}