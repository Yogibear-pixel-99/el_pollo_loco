class Level {
    coins;
    enemies;
    skyObjects;
    backgrounds;
    level_end_x;
    canvasWidth = 720;
    canvasHeight = 480;
    coinHeight = 100;
    coinOffset = {
        
    }

    constructor(coins, enemies, clouds, background, level_end_x){
        this.coins = coins;
        this.enemies = enemies;
        this.skyObjects = clouds;
        this.backgrounds = background;
        this.level_end_x = level_end_x;
    }
}