// ゲーム設定
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// ゲーム開始
const game = new Phaser.Game(config);

// リソース変数
let gold = 100;
let food = 50;

// UI要素
let goldText, foodText;

// アセットの読み込み（今回はなし）
function preload() {}

// ゲーム初期化
function create() {
    // ゴールドと食料の表示
    goldText = this.add.text(10, 10, `Gold: ${gold}`, { fontSize: '16px', fill: '#fff' });
    foodText = this.add.text(10, 30, `Food: ${food}`, { fontSize: '16px', fill: '#fff' });

    // 一定間隔でリソースを増やす
    this.time.addEvent({
        delay: 2000, // 2秒ごと
        callback: generateResources,
        loop: true
    });
}

// リソース自動生成の処理
function generateResources() {
    gold += 10; // ゴールドを増加
    food += 5;  // 食料を増加
    updateUI();
}

// UIの更新
function updateUI() {
    goldText.setText(`Gold: ${gold}`);
    foodText.setText(`Food: ${food}`);
}

// 毎フレームの処理（今回は空）
function update() {}
