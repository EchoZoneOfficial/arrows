var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#111",
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

// ================== PLAYER ==================
let playerHealth = 100;
let playerLevel = 1;
let playerExp = 0;

let playerWeapon = {
    damage: 15,
    accuracy: 75
};

// ================== ENEMY ==================
let enemyHealth = 100;
let enemyLevel = 1;

let enemyWeapon = {
    damage: 12,
    accuracy: 70
};

// ================== UI ==================
let playerText;
let enemyText;
let logText;

// ================== LOAD ==================
function preload() {
    this.load.image("arena", "assets/images/arena.png");
    this.load.image("player", "assets/images/player.png");
    this.load.image("enemy", "assets/images/enemy.png");
}

// ================== CREATE ==================
function create() {

    this.add.image(400, 300, "arena").setScale(1.2);

    this.add.image(150, 300, "player").setScale(0.5);
    this.add.image(650, 300, "enemy").setScale(0.5);

    // UI
    playerText = this.add.text(20, 20, "", { font: "18px Arial", fill: "#fff" });
    enemyText = this.add.text(520, 20, "", { font: "18px Arial", fill: "#fff" });

    logText = this.add.text(20, 520, "Бой начался!", { font: "16px Arial", fill: "#fff" });

    // КНОПКИ
    let attackBtn = this.add.text(20, 450, "АТАКА", { font: "20px Arial", fill: "#00ff00" })
        .setInteractive()
        .on("pointerdown", attack);

    let healBtn = this.add.text(120, 450, "ЩИТ", { font: "20px Arial", fill: "#00ffff" })
        .setInteractive()
        .on("pointerdown", shield);
}

// ================== UPDATE ==================
function update() {

    playerText.setText(
        "Игрок HP: " + playerHealth +
        "\nLvl: " + playerLevel +
        "\nDMG: " + playerWeapon.damage
    );

    enemyText.setText(
        "Враг HP: " + enemyHealth +
        "\nLvl: " + enemyLevel
    );
}

// ================== FIGHT SYSTEM ==================
function attack() {

    let hitChance = Phaser.Math.Between(0, 100);

    if (hitChance <= playerWeapon.accuracy) {

        let damage = Phaser.Math.Between(playerWeapon.damage - 3, playerWeapon.damage + 5);
        enemyHealth -= damage;

        log("Ты нанёс " + damage + " урона!");

    } else {
        log("Промах!");
    }

    enemyTurn();
    checkBattle();
}

function enemyTurn() {

    let hitChance = Phaser.Math.Between(0, 100);

    if (hitChance <= enemyWeapon.accuracy) {

        let damage = Phaser.Math.Between(enemyWeapon.damage - 3, enemyWeapon.damage + 4);
        playerHealth -= damage;

        log("Враг нанёс " + damage + " урона!");
    } else {
        log("Враг промахнулся!");
    }
}

// ================== ABILITY ==================
function shield() {
    let block = Phaser.Math.Between(5, 15);
    playerHealth += block;

    log("Ты получил щит +" + block);

    enemyTurn();
    checkBattle();
}

// ================== LEVEL SYSTEM ==================
function addExp(amount) {

    playerExp += amount;

    if (playerExp >= 100) {
        playerLevel++;
        playerExp = 0;

        playerWeapon.damage += 3;
        playerWeapon.accuracy += 2;

        playerHealth += 20;

        log("⬆ УРОВЕНЬ ПОВЫШЕН!");
    }
}

// ================== CHECK ==================
function checkBattle() {

    if (enemyHealth <= 0) {
        log("ПОБЕДА!");
        addExp(50);
        resetBattle();
    }

    if (playerHealth <= 0) {
        log("ПОРАЖЕНИЕ!");
        resetBattle();
    }
}

// ================== RESET ==================
function resetBattle() {

    enemyHealth = 100 + enemyLevel * 20;
    playerHealth = 100;
}

// ================== LOG ==================
function log(text) {
    logText.setText(text);
}
