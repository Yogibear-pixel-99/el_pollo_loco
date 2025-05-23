class Level {
    coins;
    bottles;
    enemies;
    endboss;
    skyObjects;
    backgrounds;
    level_end_x;

    constructor(coins, bottles, enemies, endboss, clouds, backgrounds, level_end_x){
        this.coins = coins;
        this.bottles = bottles;
        this.enemies = enemies;
        this.endboss = endboss;
        this.skyObjects = clouds;
        this.backgrounds = backgrounds;
        this.level_end_x = level_end_x;
    }


    setBackgrounds(nr){
        
        for (let lvlIndex = 0; lvlIndex < nr; lvlIndex++) {
            this.backgrounds.push(
                 new BackgroundLayer("./img/5_background/layers/air.png", -719, -16),
    new BackgroundLayer("./img/5_background/layers/3_third_layer/2.png", -719, -4),
    new BackgroundLayer("./img/5_background/layers/2_second_layer/2.png", -719, -2),
    new BackgroundLayer("./img/5_background/layers/1_first_layer/2.png", -719, 0)
            )
        }
    }
}