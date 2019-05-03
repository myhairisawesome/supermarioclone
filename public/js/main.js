// IDEA: CREATE A "WARIO", VERSION OF MARIO IN WHICH THERE ARE AIRPLANES ATTACKING MARIO

function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}

class SpriteSheet {
    constructor(image,width,height) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles = new Map()
    }

    define(name,x,y) {
        const buffer = document.createElement('canvas');
        buffer.width = this.width;
        buffer.height = this.height;
        buffer
            .getContext("2d")
            .drawImage(
                this.image,
                x*this.width,
                y*this.width,
                this.width,
                this.height,
                0,
                0,
                this.width,
                this.height,
                this.tiles.set(name, buffer));
    }

    draw(name,context,x,y) {
        const buffer = this.tiles.get(name);
        context.drawImage(buffer,x,y);
    }
}

const canvas = document.getElementById('screen');
const ctx = canvas.getContext("2d");

ctx.fillStyle = "red";
ctx.fillRect(0,0,100,100);

loadImage('./img/tiles.png')
.then(image => {
    const sprites = new SpriteSheet(image,16,16);
    sprites.define('ground',0,0);
    sprites.draw('ground',ctx,45,62);
});