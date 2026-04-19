// game.js
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2c3e50',  // Тёмный фон
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var enemy;
var healthText;
var enemyHealthText;
var playerHealth = 100;
var enemyHealth = 100;

var game = new Phaser.Game(config);

// Функция загрузки ресурсов
function preload() {
    this.load.image('arena', 'assets/images/arena.png'); // Фон арены
    this.load.image('player', 'assets/images/player.png'); // Игрок
    this.load.image('enemy', 'assets/images/enemy.png');   // Противник
}

// Функция инициализации игры
function create() {
    // Фон арены
    this.add.image(400, 300, 'arena');
    
    // Игрок
    player = this.add.sprite(100, 300, 'player');
    
    // Противник
    enemy = this.add.sprite(700, 300, 'enemy');
    
    // Панель здоровья
    healthText = this.add.text(50, 50, 'Игрок: 100 HP', { font: '16px Arial', fill: '#fff' });
    enemyHealthText = this.add.text(650, 50, 'Противник: 100 HP', { font: '16px Arial', fill: '#fff' });

    // Панель действий
    var attackButton = this.add.text(50, 500, 'Атака', { font: '18px Arial', fill: '#fff' })
        .setInteractive()
        .on('pointerdown', () => { performAttack(); });
        
    var reloadButton = this.add.text(150, 500, 'Перезарядка', { font: '18px Arial', fill: '#fff' })
        .setInteractive()
        .on('pointerdown', () => { performReload(); });

    var abilityButton = this.add.text(300, 500, 'Способность', { font: '18px Arial', fill: '#fff' })
        .setInteractive()
        .on('pointerdown', () => { performAbility(); });
}

// Функция для выполнения атаки
function performAttack() {
    var damage = Phaser.Math.Between(10, 20); // Случайный урон от 10 до 20
    enemyHealth -= damage; // Уменьшаем здоровье противника
    enemyHealthText.setText('Противник: ' + enemyHealth + ' HP');
    console.log('Атака! Противник получил ' + damage + ' урона.');
}

// Функция для перезарядки
function performReload() {
    console.log('Перезарядка выполнена!');
}

// Функция для выполнения способности
function performAbility() {
    console.log('Способность использована!');
}

// Обновление игры
function update() {
    // Логика для обновлений будет добавлена позже
                                                        }
