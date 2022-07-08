console.log('Flappy Bird');

const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav';

const sprites = new Image();
sprites.src = './sprites.png';

let frames = 0;
const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

function Colisao (flappyBird, Chao) {
    const flappyBirdY = flappyBird.Y + flappyBird.Altura;
    const ChaoY = Chao.Y;

    if (flappyBirdY >= ChaoY) {
        return true;
    }

    return false;
}
//Passaro
function CriaFlappyBird() {
    const flappyBird = {
        SpriteX: 0,
        SpriteY: 0,
        Largura: 33,
        Altura: 24,
        X: 10,
        Y: 50,
        velocidade: 0,
        gravidade: 0.25,
        pulo: 4.6,
        pula() {
            flappyBird.velocidade = - flappyBird.pulo;
        },
        atualiza() {
            if(Colisao(flappyBird, globais.Chao)) {
                som_HIT.play();  

                setTimeout(() => {
                    mudaparaTela(Telas.INICIO);   
                }, 500); 

                return;
            }
    
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
            flappyBird.Y = flappyBird.Y + flappyBird.velocidade;
            console.log();
        },
        movimentos: [
            { SpriteX: 0, SpriteY: 0, },
            { SpriteX: 0, SpriteY: 26, },
            { SpriteX: 0, SpriteY: 52, },
        ],
        FrameAtual: 0,
        AtualizaFrame() {

            const IntervaloDeFrames = 10;
            const Intervalo = frames % IntervaloDeFrames === 0;
            console.log('intervalo', Intervalo);

            if (Intervalo) {
                const BaseDoIncremento = 1;
                const incremento = BaseDoIncremento + flappyBird.FrameAtual;
                const BaseRepeticao = flappyBird.movimentos.length;

                flappyBird.FrameAtual = incremento % BaseRepeticao;
            }
        },
        desenha() {
            flappyBird.AtualizaFrame();
            const { SpriteX, SpriteY } = flappyBird.movimentos[flappyBird.FrameAtual];

            contexto.drawImage(
                sprites, 
                SpriteX,
                SpriteY,
                flappyBird.Largura, 
                flappyBird.Altura,
                flappyBird.X,
                flappyBird.Y,
                flappyBird.Largura, 
                flappyBird.Altura,
            );
        },
    }
    return flappyBird;
}

//Chão
function CriaChao() {
    const Chao = {
        SpriteX: 0,
        SpriteY: 610,
        Largura: 224,
        Altura: 112,
        X: 0,
        Y: canvas.height - 112,
        atualiza() {
            const MovimentoChao = 1;
            const repete = Chao.Largura / 2;
            const Movimentacao = Chao.X - MovimentoChao;

            Chao.X = Movimentacao % repete
        },
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
    return Chao;
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

const MensagemGetReady = {
    SpriteX: 134,
    SpriteY: 0,
    Largura: 174,
    Altura: 152,
    X: (canvas.width / 2) - 174 / 2,
    Y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            MensagemGetReady.SpriteX,
            MensagemGetReady.SpriteY,
            MensagemGetReady.Largura,
            MensagemGetReady.Altura,
            MensagemGetReady.X,
            MensagemGetReady.Y,
            MensagemGetReady.Largura,
            MensagemGetReady.Altura,
        );
    },
}

//Telas
const globais = {};
let telaAtiva = {};

function mudaparaTela(NovaTela) {
    telaAtiva = NovaTela;

    if (telaAtiva.inicializa) {
        telaAtiva.inicializa();
    }
}

const Telas = {
    INICIO: {
        inicializa() {
            globais.flappyBird = CriaFlappyBird();
            globais.Chao = CriaChao();
        },
        desenha() {
            PlanoDeFundo.desenha();
            globais.Chao.desenha();
            globais.flappyBird.desenha();
            MensagemGetReady.desenha();
        },
        click() {
            mudaparaTela(Telas.JOGO);
        },
        atualiza() {
            globais.Chao.atualiza();
        },
    },

    JOGO: {
        desenha() {
            PlanoDeFundo.desenha();
            globais.Chao.desenha();
            globais.flappyBird.desenha();
        },
        click() {
            globais.flappyBird.pula()
        },
        atualiza() {
            globais.flappyBird.atualiza();
        }
    }
}

function loop() {

    telaAtiva.atualiza();
    telaAtiva.desenha();

    frames = frames +1;

    requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
    if(telaAtiva.click);
        telaAtiva.click();
})

mudaparaTela(Telas.INICIO);

loop();