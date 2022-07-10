console.log('Flappy Bird');

const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav';

const sprites = new Image();
sprites.src = './sprites.png';

let frames = 0;
const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

function ColisaoChaoComFlappyBird (flappyBird, Chao) {
    const flappyBirdY = flappyBird.y + flappyBird.Altura;
    const ChaoY = Chao.y;

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
        x: 10,
        y: 50,
        velocidade: 0,
        gravidade: 0.25,
        pulo: 4.6,
        pula() {
            flappyBird.velocidade = - flappyBird.pulo;
        },
        atualiza() {
            if(ColisaoChaoComFlappyBird(flappyBird, globais.Chao)) {
                som_HIT.play();  

                mudaparaTela(Telas.GAME_OVER);   

                return;
            }
    
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
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
                flappyBird.x,
                flappyBird.y,
                flappyBird.Largura, 
                flappyBird.Altura,
            );
        },
    }
    return flappyBird;
}

function CriaCanos() {
    const Canos = {
        Largura: 52,
        Altura: 400,
        chao: {
            SpriteX: 0,
            SpriteY: 169,
        },
        ceu: {
            SpriteX: 52,
            SpriteY: 169,
        },
        espaco: 100,
        desenha() {

            Canos.pares.forEach(function(par){

                const RandomY = par.y;
                const EspacamentoCano = 90;

                const CanoCeuX = par.x;
                const CanoCeuY = RandomY;
                const CanoChaoX = par.x;
                const CanoChaoY = Canos.Altura + EspacamentoCano + RandomY;

                contexto.drawImage(
                    sprites,
                    Canos.ceu.SpriteX,
                    Canos.ceu.SpriteY,
                    Canos.Largura,
                    Canos.Altura,
                    CanoCeuX,
                    CanoCeuY,
                    Canos.Largura,
                    Canos.Altura
                )

                contexto.drawImage(
                    sprites,
                    Canos.chao.SpriteX,
                    Canos.chao.SpriteY,
                    Canos.Largura,
                    Canos.Altura,
                    CanoChaoX,
                    CanoChaoY,
                    Canos.Largura,
                    Canos.Altura
                )

                par.canoCeu = {
                    x: CanoCeuX,
                    y: Canos.Altura + CanoCeuY
                }

                par.canoChao = {
                    x: CanoChaoX,
                    y: CanoChaoY
                }
            })
        },
        ColisaoCanoComFlappyBird(par) {
            
            const CabecaFlappyBird = globais.flappyBird.y;
            const PeFlappyBird = globais.flappyBird.y + globais.flappyBird.Altura;

            if (globais.flappyBird.x + globais.flappyBird.Largura >= par.x) {

                if (CabecaFlappyBird <= par.canoCeu.y) {
                    return true;
                }

                if (PeFlappyBird >= par.canoChao.y) {
                    return true;
                }
            }
            return false;
        },
        pares: [], 
        atualiza() {

            if (frames % 100 === 0) {
                Canos.pares.push({
                    x: canvas.width, 
                    y: -150 * (Math.random() + 1),
                });
            }
            
            Canos.pares.forEach(function(par) {
                par.x = par.x - 2;


                if(Canos.ColisaoCanoComFlappyBird(par)) {
                    som_HIT.play();
                    mudaparaTela(Telas.GAME_OVER);
                }
                if (par.x + Canos.Largura <= 0) {
                    Canos.pares.shift();
                }
            })
        }
    }
    return Canos;
}

//Chão
function CriaChao() {
    const Chao = {
        SpriteX: 0,
        SpriteY: 610,
        Largura: 224,
        Altura: 112,
        x: 0,
        y: canvas.height - 112,
        atualiza() {
            const MovimentoChao = 1;
            const repete = Chao.Largura / 2;
            const Movimentacao = Chao.x - MovimentoChao;

            Chao.x = Movimentacao % repete
        },
        desenha() {
            contexto.drawImage(
                sprites,
                Chao.SpriteX,
                Chao.SpriteY,
                Chao.Largura,
                Chao.Altura,
                Chao.x,
                Chao.y,
                Chao.Largura,
                Chao.Altura,
            );
    
            contexto.drawImage(
                sprites,
                Chao.SpriteX,
                Chao.SpriteY,
                Chao.Largura,
                Chao.Altura,
                (Chao.x + Chao.Largura),
                Chao.y,
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
    x: 0,
    y: canvas.height - 204,
    desenha() {

        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0,0, canvas.width, canvas.height);

        contexto.drawImage(
            sprites,
            PlanoDeFundo.SpriteX,
            PlanoDeFundo.SpriteY,
            PlanoDeFundo.Largura,
            PlanoDeFundo.Altura,
            PlanoDeFundo.x,
            PlanoDeFundo.y,
            PlanoDeFundo.Largura,
            PlanoDeFundo.Altura,
        );

        contexto.drawImage(
            sprites,
            PlanoDeFundo.SpriteX,
            PlanoDeFundo.SpriteY,
            PlanoDeFundo.Largura,
            PlanoDeFundo.Altura,
            (PlanoDeFundo.x + PlanoDeFundo.Largura),
            PlanoDeFundo.y,
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
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            MensagemGetReady.SpriteX,
            MensagemGetReady.SpriteY,
            MensagemGetReady.Largura,
            MensagemGetReady.Altura,
            MensagemGetReady.x,
            MensagemGetReady.y,
            MensagemGetReady.Largura,
            MensagemGetReady.Altura,
        );
    },
}

//Game Over
const MensagemGameOver = {
    SpriteX: 134,
    SpriteY: 153,
    Largura: 226,
    Altura: 200,
    x: (canvas.width / 2) - 226 / 2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            MensagemGameOver.SpriteX,
            MensagemGameOver.SpriteY,
            MensagemGameOver.Largura,
            MensagemGameOver.Altura,
            MensagemGameOver.x,
            MensagemGameOver.y,
            MensagemGameOver.Largura,
            MensagemGameOver.Altura,
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
            globais.Canos = CriaCanos();
        },
        desenha() {
            PlanoDeFundo.desenha();
            globais.flappyBird.desenha();
            MensagemGetReady.desenha();
            globais.Chao.desenha();
        },
        click() {
            mudaparaTela(Telas.JOGO);
        },
        atualiza() {
            globais.Chao.atualiza();
        },
    },

    JOGO: {
        inicializa() {
            globais.placar = criaPlacar();
        },
        desenha() {
            PlanoDeFundo.desenha();
            globais.Canos.desenha();
            globais.Chao.desenha();
            globais.flappyBird.desenha();
            globais.placar.desenha();
        },
        click() {
            globais.flappyBird.pula()
        },
        atualiza() {
            globais.flappyBird.atualiza();
            globais.Canos.atualiza();
            globais.Chao.atualiza();
            globais.placar.atualiza();
        }
    }
}

Telas.GAME_OVER = {
    desenha() {
        MensagemGameOver.desenha();
    },
    atualiza() {

    },
    click() {
        mudaparaTela(Telas.INICIO);
    }
}

function criaPlacar() {
    const placar = {
        pontuacao: 0,
        desenha() {
            contexto.font = '50px VT323';
            contexto.fillStyle = 'white';
            contexto.textAlign = 'right';
            contexto.fillText(`${placar.pontuacao}`, canvas.width - 10, 35)
        },
        atualiza() {
            const IntervaloDeFrames = 10;
            const Intervalo = frames % IntervaloDeFrames == 0;

            if (Intervalo) {
                placar.pontuacao = placar.pontuacao + 1;
            }
        }
    }
    return placar;
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