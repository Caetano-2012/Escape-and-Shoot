// Variáveis 

let player;
let enemy;
let swords;
let fireballs;
let cursors;
let score = 0;
let enemyLives = 5;
let playerLives = 3;
let scoreText;
let livesText;
let enemyLivesText;
let victoryText;

const config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 680,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            debug: false
        }

        
    },

    scene: {
            preload: preload,
            create: create,
            update: update
        }
}

const game = new Phaser.Game(config);

function preload() {
    this.load.image('player', 'warrior.png');
    this.load.image('enemy', 'skull-witch.png');
    this.load.image('sword', 'sword.png');
    this.load.image('fireball', 'fireball.png');
};

function create() {
    player = this.physics.add.sprite(1400, 300, 'player');
    player.setScale(0.5);

    enemy = this.physics.add.sprite(100, 280, 'enemy');
    enemy.setScale(0.9);

    swords = this.physics.add.group({
        defaultKey: "sword",
        maxSize: 3,
        runChildUpdate: true
    })

    fireballs = this.physics.add.group({
        defaultKey: "fireball",
        maxSize: 5,
        runChildUpdate: true
    })

    player.setCollideWorldBounds(true);

    enemy.setCollideWorldBounds(true);
    enemy.setVelocityY(250);
    enemy.setBounce(1);
    
    cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.on("keydown-SPACE", shoot, this);
}

function update() {

    if(cursors.up.isDown) {
        player.y -= 4;
    } else if (cursors.down.isDown) {
        player.y += 4;
    }
    
    this.swords.children.each(function(sword) {
        if(sword.active && sword.x < 0) {
            sword.destroy();
        }
    }, this)
}

function shoot() {
    let sword = swords.get(player.x +20, player.y);

    if(sword) {
        sword.setActive(true).setVisible(true);
        sword.body.velocity.x = -400;
        sword.setScale(0.5);
    }
}

/*
Paramos na parte de destruir o projétil após sair da tela
Deu erro de reconhecimento do comando "children"
Linha 83*/