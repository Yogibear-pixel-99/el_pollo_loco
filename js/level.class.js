class Level {
    coins;
    bottles;
    thrownBottles
    enemies;
    skyObjects;
    backgrounds;
    level_end_x;

    constructor(coins, bottles, thrownBottles, enemies, clouds, background, level_end_x){
        this.coins = coins;
        this.bottles = bottles;
        this.thrownBottles = thrownBottles;
        this.enemies = enemies;
        this.skyObjects = clouds;
        this.backgrounds = background;
        this.level_end_x = level_end_x;
    }
}