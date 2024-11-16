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
var cropState = 'seed'; // 作物の状態（'seed'、'growing'、'ready'）
var growthTime = 5000; // 成長にかかる時間（ミリ秒）
var growthProgress = 0; // 成長進行度

var game = new Phaser.Game(config);

function preload() {
    this.load.image('ground', 'https://examples.phaser.io/assets/sprites/platform.png');
    this.load.image('seed', 'https://examples.phaser.io/assets/sprites/dude.png');  // 作物の画像
    this.load.image('growing', 'https://examples.phaser.io/assets/sprites/alien.png');  // 成長中の画像
    this.load.image('ready', 'https://examples.phaser.io/assets/sprites/star.png');  // 収穫可能な画像
}

function create() {
    // 地面を作成
    this.add.image(400, 500, 'ground');

    // 初期の作物を作成
    crop = this.add.sprite(400, 300, 'seed');
    crop.setInteractive();

    // 作物をクリックした時に収穫する
    crop.on('pointerdown', harvestCrop);

    // 成長のタイマーを開始
    this.time.addEvent({
        delay: growthTime, // 5秒後に
        callback: growCrop,
        callbackScope: this,
        loop: true
    });
}

function update() {
    // ゲームのロジック（今は特に更新なし）
}

// 作物が育つ処理
function growCrop() {
    if (cropState === 'seed') {
        cropState = 'growing';
        crop.setTexture('growing'); // 成長中の画像に変更
    } else if (cropState === 'growing') {
        cropState = 'ready';
        crop.setTexture('ready'); // 収穫可能な画像に変更
    }
}

// 作物を収穫する処理
function harvestCrop() {
    if (cropState === 'ready') {
        console.log('作物を収穫しました！');
        cropState = 'seed'; // 作物を元に戻す
        crop.setTexture('seed'); // 初期状態に戻す
    } else {
        console.log('まだ収穫できません');
    }
}

var gold = 0;  // プレイヤーのゴールド（リソース）

// 収穫する処理
function harvestCrop() {
    if (cropState === 'ready') {
        console.log('作物を収穫しました！');
        cropState = 'seed'; // 作物を元に戻す
        crop.setTexture('seed'); // 初期状態に戻す
        gold += 10;  // 収穫した作物でゴールドを10加算
        console.log('ゴールド: ' + gold);
    } else {
        console.log('まだ収穫できません');
    }
}

var buildingUpgraded = false;  // 農場のアップグレード状態

// 農場をアップグレードする処理
function upgradeBuilding() {
    if (!buildingUpgraded && gold >= 50) {  // ゴールドが50以上の場合にアップグレード
        gold -= 50;  // アップグレードに50ゴールド使用
        buildingUpgraded = true;
        console.log('農場がアップグレードされました！');
    } else if (buildingUpgraded) {
        console.log('農場は既にアップグレードされています。');
    } else {
        console.log('ゴールドが足りません。');
    }
}
