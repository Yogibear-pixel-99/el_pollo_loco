class Level {
    coins;
    bottles;
    enemies;
    endboss;
    skyObjects;
    backgrounds;
    level_end_x;

    constructor(coins, bottles, enemies, endboss, clouds, backgrounds, level_end_x, level_size){
        this.coins = coins;
        this.bottles = bottles;
        this.enemies = enemies;
        this.endboss = endboss;
        this.skyObjects = clouds;
        this.backgrounds = backgrounds;
        this.setBackgrounds(level_size);
        this.level_end_x = level_end_x;
    }

    


      setBackgrounds(level_size){
          this.addAirLayers(level_size, "./img/5_background/layers/air.png", 0);
          this.addClouds(level_size, "./img/5_background/layers/4_clouds/1.png", "./img/5_background/layers/4_clouds/2.png", 0);
            this.addLayers(level_size, "./img/5_background/layers/3_third_layer/1.png", "./img/5_background/layers/3_third_layer/2.png", -3);
            this.addLayers(level_size, "./img/5_background/layers/2_second_layer/1.png", "./img/5_background/layers/2_second_layer/2.png", -1.5);
            this.addLayers(level_size, "./img/5_background/layers/1_first_layer/1.png", "./img/5_background/layers/1_first_layer/2.png", 0);
        }
    





      addClouds(level_size, firstLayer, secondLayer){

        for (let lvlIndex = 0; lvlIndex < level_size; lvlIndex++) {
            this.backgrounds.push(
                new Clouds(firstLayer, 0.1, (lvlIndex * 2 - 1) * (canvasWidth - 1)),
                new Clouds(secondLayer, 0.2, (lvlIndex * 2) * (canvasWidth - 1))
                    );
        }
    }

      addLayers(level_size, firstLayer, secondLayer, parallaxFactor){
        for (let lvlIndex = 0; lvlIndex < level_size; lvlIndex++) {
            this.backgrounds.push(
                new BackgroundLayer(firstLayer, (lvlIndex * 2 - 1) * (canvasWidth - 1), parallaxFactor),
                new BackgroundLayer(secondLayer, (lvlIndex * 2) * (canvasWidth -1), parallaxFactor)
                 );
                }
    }

      addAirLayers(level_size, layer, parallaxFactor){
        for (let lvlIndex = 0; lvlIndex < level_size; lvlIndex++) {
                this.backgrounds.push(
                    new BackgroundLayer(layer, (lvlIndex * 2 - 1) * (canvasWidth - 1), parallaxFactor),
                    new BackgroundLayer(layer, (lvlIndex * 2) * (canvasWidth - 1), parallaxFactor)
                );
}
}
}
// PROBLEM WITH THE PUSH FUNCTION