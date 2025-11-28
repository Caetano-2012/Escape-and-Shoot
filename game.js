// Variáveis 

let player;
let enemy;
//let swords;
let fireballs;
let cursors;
let score = 0;
let enemyLives = 5;
let playerLives = 3;
let scoreText;
let livesText;
let enemyLivesText;
let victoryText;
let playerInvulnerable = false;

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
        classType: Phaser.Physics.Arcade.Image, 
        defaultKey: "sword",
        maxSize: 3,
        runChildUpdate: false
    })

    fireballs = this.physics.add.group({
        //classType: Phaser.Physics.Arcade.Image,
        defaultKey: "fireball",
        maxSize: 50,
        //runChildUpdate: false
    })

    cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.on("keydown-SPACE", shoot, this);

    this.physics.add.overlap(this.swords, enemy, hitEnemy, null, this);
    this.physics.add.overlap(player, fireballs, hitPlayer, null, this);
    this.time.addEvent({
        delay: 2000,
        callback: () => enemyShoot.call(this), 
        loop: true
    })
    scoreText = this.add.text(20,20,"Pontuação: 0", {fontSize: "24px", fill: "#fff"});
    enemyLivesText = this.add.text(20,50, "Enemy Lives: 5", {fontSize: "24px", fill: "#fff"});
    livesText = this.add.text(1250, 20, "Player Lives: 3", {fontSize: "24px", fill: "#fff" })
    victoryText = this.add.text(600, 320, "", {fontSize: "48px", fill: "#0f0"});
    victoryText.setDepth(9999);
    this.enemyShootTimer = this.time.addEvent({
        delay: 2000,
        callback: () => enemyShoot.call(this),
        lopp: true
    })
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
    /*this.swords.children.each(function(sword) {
        if(!sword.active && sword.x < 0) {
            sword.body.enable = true;
            sword.setPosition(player.x + 20, player.y)
        }
        if(sword.active && sword.x < 0) {
            sword.destroy();
        }
    }, this)*/
    this.swords.getChildren().forEach(function(s) {
        if(s.active && s.x < -50) {
            s.disableBody(true, true);
            s.destroy();
        }
    }, this);
}

function shoot() {
    //let sword = this.swords.get(player.x +20, player.y);
    let sword = this.swords.get();

    /*if(sword) {
        sword.setActive(true).setVisible(true);
        sword.body.velocity.x = -400;
        sword.setScale(0.5);
    }*/
   if(!sword) return
   sword.enableBody(true, player.x +20, player.y, true, true);
   sword.setTexture("sword");
   sword.setActive(true);
   sword.setVisible(true);
   sword.setScale(0.5);
   sword.body.velocity.x = -400;
   sword.body.setAllowGravity(false);
}

/*function hitEnemy(sword, en) {
    console.log("hitEnemy chamando.", {swordActive: sword?.active, enemyActive: en?.active});
    //if(!sword.active || !enemy.active || enemy.isInvulnerable) return;

    //sword.setActive(false).setVisible(false);
    //sword.destroy();
    if(!sword || !en) return;
    if(!sword.active ||!en.active || en.isInvulnerable) return;
    if(sword.disableBody) {
        sword.disableBody(true, true);
    }
    if(sword.destroy) {
        sword.destroy()
    }
    en.isInvulnerable = true;
    en.setAlpha(0.5);
    

    enemyLives = Math.max(0, enemyLives -1);
    score += 100;
    scoreText.setText("Pontuação: " +score);
    enemyLivesText.setText("Enemy Lives: " + enemyLives);
    
    if(enemyLives > 0) {
        this.time.delayedCall(200, () => {
            /*enemy.clearTint();
            enemy.isInvulnerable = false;
            if(enemy.body.velocity.y === 0) {
                const direction = Phaser.Math.Between(0, 1) === 0 ? -250 : 250;
                enemy.setVelocityY(direction);
            }
           if(en && en.setAlpha) en.setAlpha(1);
           if(en) en.isInvulnerable = false;
           if(en && en.body && en.body.velocity.y === 0) {
            const direction = Phaser.Math.Between(0, 1) === 0 ? -250 : 250;
            en.setVelocityY(direction);
           }
        }  , [], this);
        return;
    }
    en.setTint(0x555555);
    en.setVelocity(0, 0);
    en.isInvulnerable = true;
    //enemy.setActive(true);
    //enemy.setVisible(true);
    victoryText.setText("Você venceu!");
}*/

function hitEnemy(objA, objB) {
    // DEBUG: ver quem chegou
    console.log("hitEnemy called - keys:", objA?.texture?.key, objB?.texture?.key, 
                "active:", objA?.active, objB?.active);

    // tenta detectar qual dos dois é o projétil (sword)
    const aIsSword = objA && objA.texture && objA.texture.key === 'sword';
    const bIsSword = objB && objB.texture && objB.texture.key === 'sword';

    let projectile = null;
    let target = null;

    if (aIsSword && !bIsSword) {
        projectile = objA;
        target = objB;
    } else if (bIsSword && !aIsSword) {
        projectile = objB;
        target = objA;
    } else {
        // caso incomum: nenhum é sword ou ambos são swords -> aborta
        console.warn("hitEnemy: não foi possível identificar projétil/target.", {aIsSword, bIsSword});
        return;
    }

    // garante que o alvo é mesmo o inimigo da cena
    if (target !== enemy) {
        console.warn("hitEnemy: alvo não é o inimigo esperado.", target);
        return;
    }

    // validações de segurança
    if (!projectile || !target) return;
    if (!projectile.active || !target.active || target.isInvulnerable) return;

    // remove/desativa o projétil com segurança
    if (projectile.disableBody) projectile.disableBody(true, true);
    // não é estritamente necessário destruir, mas garante que não vire confusão no pool
    if (projectile.destroy) projectile.destroy();

    // aplica dano ao alvo usando 'target' (evita confundir com a global)
    target.isInvulnerable = true;
    target.setAlpha(0.5);

    enemyLives = Math.max(0, enemyLives - 1);
    score += 100;
    scoreText.setText("Pontuação: " + score);
    enemyLivesText.setText("Enemy Lives: " + enemyLives);

    if (enemyLives > 0) {
        this.time.delayedCall(200, () => {
            if (target && target.setAlpha) target.setAlpha(1);
            if (target) target.isInvulnerable = false;
            if (target && target.body && target.body.velocity.y === 0) {
                const direction = Phaser.Math.Between(0, 1) === 0 ? -250 : 250;
                target.setVelocityY(direction);
            }
        }, [], this);
        return;
    }

    // inimigo morreu (use 'target' para operar)
    target.setTint(0x555555);
    target.setVelocity(0, 0);
    target.isInvulnerable = true;
    victoryText.setText("Você venceu!");
}

function hitPlayer(player, fireball) {
    if(playerInvulnerable) return;
    if(!fireball.active || !fireball.body.enable) return;
    fireball.disableBody(true, true);
    fireball.active = false;
    fireball.visible = false;
    //fireball.setActive(false);
    //fireball.setVisible(false);
    //fireball.body.stop();
    fireballs.children.each(f => {
        if(f.active) {
            f.disableBody(true, true);
            f.active = false;
            f.visible = false;
        }
    })

    console.log("Player atingido por fireball.")

    playerLives = Math.max(0, playerLives - 1);
    score -= 50;
    scoreText.setText("Pontuação: " + score);
    livesText.setText("Player Lives: " + playerLives);

    playerInvulnerable = true;
    player.setAlpha(0.5);
    this.time.delayedCall(1000, () => {
        playerInvulnerable = false;
        player.setAlpha(1);
    })

    if(playerLives <= 0) {
        victoryText.setDepth(9999)
        victoryText.setText("Você perdeu!");
        endGame(this);
    }
}

function enemyShoot() {
    const fireball = fireballs.get(enemy.x, enemy.y);
    if(!fireball) return;
    fireball.enableBody(true, enemy.x, enemy.y, true, true);
    fireball.setScale(0.3)
    fireball.setActive(true);
    fireball.setVisible(true);
    fireball.body.setAllowGravity(false);
    const speed = 250;
    const angle = Phaser.Math.Angle.Between(enemy.x, enemy.y, player.x, player.y);
    fireball.body.velocity.x = Math.cos(angle) * speed;
    fireball.body.velocity.y = Math.sin(angle) * speed;
    fireball.rotation = angle;
    fireball.setCollideWorldBounds(false);
    fireball.body.onWorldBounds = true;
    /*fireball.body.world.on("worldbounds", function(body) {
        if(body.gameObject === fireball) {
            fireball.setActive(false);
            fireball.setVisible(false);
            fireball.body.stop();
        }
    })*/
}

function endGame(scene) {
    scene.physics.pause();
    player.setTint(0xff0000);
    player.setVelocity(0, 0);
    enemy.setVelocity(0, 0);
    if(scene.enemyShootTimer) {
        scene.enemyShootTimer.remove(false);
    }
}