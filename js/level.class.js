class Level {
    coins;
    bottles;
    enemies;
    endboss;
    skyObjects;
    backgrounds;
    level_end_x;

    constructor(coins, bottles, enemies, endboss, clouds, background, level_end_x){
        this.coins = coins;
        this.bottles = bottles;
        this.enemies = enemies;
        this.endboss = endboss;
        this.skyObjects = clouds;
        this.backgrounds = background;
        this.level_end_x = level_end_x;
    }
}