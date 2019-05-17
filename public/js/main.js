// IDEA: CREATE A "WARIO", VERSION OF MARIO IN WHICH THERE ARE AIRPLANES ATTACKING MARIO

import { loadLevel } from './loaders.js';
import { loadMarioSprite, loadBackgroundSprites } from './sprites.js';
import Compositor from './compositor.js';
import {createBackgroundLayer} from './layers.js';


const canvas = document.getElementById('screen');
const ctx = canvas.getContext("2d");


function createSpriteLayer(sprite, position) {
    return function drawSpriteLayer(ctx) {
        for(let i=0; i<20; i++) {
            sprite.draw('idle', ctx, position.x, position.y);
        }
    }
}

Promise.all([
    loadMarioSprite(),
    loadBackgroundSprites(),
    loadLevel('1-1')
]).then(([marioSprite, backgroundSprites, level]) => {

    const comp = new Compositor();

    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
    comp.layers.push(backgroundLayer);

    const pos = {
        x:0,
        y:0,
    }

    const spriteLayer = createSpriteLayer(marioSprite,pos)
    comp.layers.push(spriteLayer);

    function update() {
        comp.draw(ctx);        
        pos.x += 2;
        pos.y += 2;
        requestAnimationFrame(update);
    }

    update()

});