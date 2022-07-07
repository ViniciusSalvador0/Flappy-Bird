console.log('Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const flappyBird = {
    SpriteX: 0,
    SpriteY: 0,
    Largura: 33,
    Altura: 24,
    X: 10,
    Y: 50,
    desenha() {
        contexto.drawImage(
            sprites, 
            flappyBird.SpriteX,
            flappyBird.SpriteY,
            flappyBird.Largura, 
            flappyBird.Altura,
            flappyBird.X,
            flappyBird.Y,
            flappyBird.Largura, 
            flappyBird.Altura,
        );
    }
}

function loop() {
    flappyBird.desenha();
    requestAnimationFrame(loop);
}

loop();