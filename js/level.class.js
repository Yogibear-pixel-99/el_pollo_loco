class Level {
    coins;
    bottles;
    enemies;
    endboss;
    skyObjects;
    backgrounds;
    level_end_x;

    constructor(coins, bottles, enemies, endboss, clouds, backgrounds, level_end_x, level_size, parallaxFactor){
        this.coins = coins;
        this.bottles = bottles;
        this.enemies = enemies;
        this.endboss = endboss;
        this.skyObjects = clouds;
        this.backgrounds = backgrounds;
        // this.setBackgrounds(level_size, 1);
        this.level_end_x = level_end_x;
    }


    async setBackgrounds(level_size, parallaxFactor){
            await this.addAirLayers(level_size, "./img/5_background/layers/air.png", parallaxFactor);
            await this.addLayers(level_size, "./img/5_background/layers/3_third_layer/1.png", "./img/5_background/layers/3_third_layer/2.png", parallaxFactor);
            await this.addLayers(level_size, "./img/5_background/layers/2_second_layer/1.png", "./img/5_background/layers/2_second_layer/2.png", parallaxFactor);
            await this.addLayers(level_size, "./img/5_background/layers/1_first_layer/1.png", "./img/5_background/layers/1_first_layer/2.png", parallaxFactor);
    }

    async addLayers(level_size, firstLayer, secondLayer, parallaxFactor){
                for (let lvlIndex = -1; lvlIndex < level_size; lvlIndex++) {
            this.backgrounds.push(
                new BackgroundLayer(firstLayer, (canvasWidth - 1) * lvlIndex, parallaxFactor),
                new BackgroundLayer(secondLayer, (canvasWidth - 1) * lvlIndex, parallaxFactor)
            )
        }
    }

    async addAirLayers(level_size, layer, parallaxFactor){
        
                        for (let lvlIndex = 0; lvlIndex < level_size; lvlIndex++) {
            this.backgrounds.push(
                new BackgroundLayer(layer, (canvasWidth - 1) * lvlIndex, parallaxFactor)
            )
        }
    }


}


// PROBLEM WITH THE PUSH FUNCTION