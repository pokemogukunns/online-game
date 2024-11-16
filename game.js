// ゲームの設定
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var crop;

var game = new Phaser.Game(config);

function preload() {
    this.load.image('ground', 'https://examples.phaser.io/assets/sprites/platform.png');
    this.load.image('crop', 'https://examples.phaser.io/assets/sprites/dude.png');  // 作物の画像
}

function create() {
    // 地面を作成
    this.add.image(400, 500, 'ground');

    // 作物を作成
    crop = this.add.sprite(400, 300, 'crop');

    // 作物がクリックされたら育つ
    crop.setInteractive();
    crop.on('pointerdown', function() {
        crop.setScale(1.5);  // クリックしたら作物が大きくなる
    });
}

function update() {
    // ゲームのロジック
}
