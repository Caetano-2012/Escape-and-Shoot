// Variáveis 

let player;
let enemy;
//let swords;
//let fireballs;
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
    player.setCollideWorldBounds(true);
    
    enemy = this.physics.add.sprite(100, 280, 'enemy');
    enemy.setScale(0.9);
    enemy.setCollideWorldBounds(true);
    enemy.setVelocityY(250);
    enemy.setBounce(1);

    this.swords = this.physics.add.group({
        defaultKey: "sword",
        maxSize: 3,
        //runChildUpdate: true
    })

    this.fireballs = this.physics.add.group({
        defaultKey: "fireball",
        maxSize: 5,
        //runChildUpdate: true
    })

    cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.on("keydown-SPACE", shoot, this);

    this.physics.add.overlap(this.swords, enemy, hitEnemy, null, this);
    scoreText = this.add.text(20,20,"Pontuação: 0", {fontSize: "24px", fill: "#fff"});
    enemyLivesText = this.add.text(20,50, "Enemy Lives: 5", {fontSize: "24px", fill: "#fff"});
    victoryText = this.add.text(600, 320, "", {fontSize: "48px", fill: "#0f0"});
}

function update() {

    if(cursors.up.isDown) {
        player.y -= 4;
    } else if (cursors.down.isDown) {
        player.y += 4;
    }
    if(enemy.active && enemy.body.velocity.y === 0 && !enemy.isInvulnerable) {
        enemy.setVelocityY(250);
    }
    this.swords.children.each(function(sword) {
        if(!sword.active && sword.x < 0) {
            sword.body.enable = true;
            sword.setPosition(player.x + 20, player.y)
        }
        if(sword.active && sword.x < 0) {
            sword.destroy();
        }
    }, this)
}

function shoot() {
    let sword = this.swords.get(player.x +20, player.y);

    if(sword) {
        sword.setActive(true).setVisible(true);
        sword.body.velocity.x = -400;
        sword.setScale(0.5);
    }
}

function hitEnemy(sword, enemy) {
    if(!sword.active || !enemy.active || enemy.isInvulnerable) return;

    //sword.setActive(false).setVisible(false);
    //sword.destroy;
    enemy.isInvulnerable = true;
    sword.setActive(false).setVisible(false);
    sword.body.enable = false;
    enemy.setTint(0xff0000);
    

    enemyLives = Math.max(0, enemyLives -1);
    score += 100;
    scoreText.setText("Pontuação: " +score);
    enemyLivesText.setText("Enemy Lives: " + enemyLives);
    
    if(enemyLives > 0) {
        this.time.delayedCall(200, () => {
            enemy.clearTint();
            enemy.isInvulnerable = false;
            if(enemy.body.velocity.y === 0) {
                const direction = Phaser.Math.Between(0, 1) === 0 ? -250 : 250;
                enemy.setVelocityY(direction);
            }
        }  , [], this);
        return;
    }
    enemy.setTint(0x555555);
    enemy.setVelocity(0);
    enemy.isInvulnerable = true;
    enemy.setActive(true);
    enemy.setVisible(true);
    victoryText.setText("Você venceu!");
}
// Inimigo desaparecendo após ataque.