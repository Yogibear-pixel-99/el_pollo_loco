class Level {
    enemies;
    skyObjects;
    backgrounds;
    level_end_x;

    constructor(enemies, clouds, background, level_end_x){
        this.enemies = enemies;
        this.skyObjects = clouds;
        this.backgrounds = background;
        this.level_end_x = level_end_x;
    }
}