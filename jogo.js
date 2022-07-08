console.log('Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

//Passaro
const flappyBird = {
    SpriteX: 0,
    SpriteY: 0,
    Largura: 33,
    Altura: 24,
    X: 10,
    Y: 50,
    velocidade: 0,
    gravidade: 0.25,
    atualiza() {
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
        flappyBird.Y = flappyBird.Y + flappyBird.velocidade;
        console.log();
    },
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

//Chão
const Chao = {
    SpriteX: 0,
    SpriteY: 610,
    Largura: 224,
    Altura: 112,
    X: 0,
    Y: canvas.height - 112,
    desenha() {
        contexto.drawImage(
            sprites,
            Chao.SpriteX,
            Chao.SpriteY,
            Chao.Largura,
            Chao.Altura,
            Chao.X,
            Chao.Y,
            Chao.Largura,
            Chao.Altura,
        );

        contexto.drawImage(
            sprites,
            Chao.SpriteX,
            Chao.SpriteY,
            Chao.Largura,
            Chao.Altura,
            (Chao.X + Chao.Largura),
            Chao.Y,
            Chao.Largura,
            Chao.Altura,
        );
    },
}

//Plano de Fundo
const PlanoDeFundo = {
    SpriteX: 390,
    SpriteY: 0,
    Largura: 275,
    Altura: 204,
    X: 0,
    Y: canvas.height - 204,
    desenha() {

        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0,0, canvas.width, canvas.height);

        contexto.drawImage(
            sprites,
            PlanoDeFundo.SpriteX,
            PlanoDeFundo.SpriteY,
            PlanoDeFundo.Largura,
            PlanoDeFundo.Altura,
            PlanoDeFundo.X,
            PlanoDeFundo.Y,
            PlanoDeFundo.Largura,
            PlanoDeFundo.Altura,
        );

        contexto.drawImage(
            sprites,
            PlanoDeFundo.SpriteX,
            PlanoDeFundo.SpriteY,
            PlanoDeFundo.Largura,
            PlanoDeFundo.Altura,
            (PlanoDeFundo.X + PlanoDeFundo.Largura),
            PlanoDeFundo.Y,
            PlanoDeFundo.Largura,
            PlanoDeFundo.Altura,
        );
    },
}

function loop() {

    flappyBird.atualiza();

    PlanoDeFundo.desenha();
    Chao.desenha();
    flappyBird.desenha();

    requestAnimationFrame(loop);
}

loop();