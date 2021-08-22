/////////////////////////// VARIABLES ///////////////////////////
var caminho,menino;
var imgCaminho,imgMenino;

var dinheiro,diamantes,joias,espada;
var imgDinheiro,imgDiamantes,imgJoias,imgEspada;
var dinheiroG,diamantesG,joiasG,grupoEspada;

var colecaoTesouros = 0;

var fim;
var imgFim;

//estadoJogo
var JOGAR=1;
var ENCERRAR=0;
var estadoJogo=1;

////////////////////// FUNCTION PRELOAD //////////////////////
function preload(){
  imgCaminho = loadImage("Road.png");
  imgMenino = loadAnimation("Runner-1.png","Runner-2.png");
  
  imgDinheiro = loadImage("cash.png");
  imgDiamantes = loadImage("diamonds.png");
  imgJoias = loadImage("jwell.png");
  imgEspada = loadImage("sword.png");
  
  imgFim =loadAnimation("gameOver.png");
}

//////////////////////// FUNCTION SETUP ////////////////////////
function setup(){
 createCanvas(windowWidth, windowHeight);
  
 //movendo o plano de fundo
  caminho=createSprite(width/2,height/3);
  caminho.addImage(imgCaminho);

 //menino correndo
  menino = createSprite(width-330,580,20,20);
  menino.addAnimation("SahilRunning",imgMenino);
  menino.scale=0.08;
  
 //imagem do fim
  fim = createSprite(width/2,height/2-10,20,20);
  fim.addAnimation("gameover",imgFim);
  fim.scale=0.8;
  
 //grupos de tesouro
  dinheiroG = new Group();
  diamantesG = new Group();
  joiasG = new Group();
  grupoEspada = new Group();

}

///////////////////////// FUNCTION DRAW /////////////////////////
function draw() {
 background(0);
  
//////////// EstadoJogo JOGAR ////////////
 if(estadoJogo===JOGAR){
   
  //controle menino
   menino.x = World.mouseX;
  
  //edges
   edges= createEdgeSprites();
   menino.collide(edges);
  
  //plano de fundo
   caminho.velocityY = 4;
   if(caminho.y > 400 ){
    caminho.y = height/2;
   }
  
   //criar grupos
    criarDinheiro();
    criarDiamantes();
    criarJoias();
    criarEspadas();

   //if is.Touching tesouros
    if (dinheiroG.isTouching(menino)) {
     dinheiroG.destroyEach();
     colecaoTesouros=colecaoTesouros+50;
    }
    else if (diamantesG.isTouching(menino)) {
     diamantesG.destroyEach();
     colecaoTesouros=colecaoTesouros+150;
    }
    else if(joiasG.isTouching(menino)) {
     joiasG.destroyEach(); 
     colecaoTesouros=colecaoTesouros+100;
    }
    else if(grupoEspada.isTouching(menino)) {
     estadoJogo = ENCERRAR;
    }
   
   //fim visibilidade
    fim.visible = false;
    menino.visible = true;
   
 }
  
//////////// EstadoJogo ENCERRAR ////////////
 if(estadoJogo===ENCERRAR){

  //velocity each
   caminho.velocityY = 0;
   menino.velocityY = 0;
   dinheiroG.setVelocityYEach(0);
   diamantesG.setVelocityYEach(0);
   joiasG.setVelocityYEach(0);
   grupoEspada.setVelocityYEach(0);
   
  //destroy each
   dinheiroG.destroyEach();
   diamantesG.destroyEach();
   joiasG.destroyEach();
   grupoEspada.destroyEach();
   
  //imagens visibilidade
   fim.visible = true;
   menino.visible = false;
   
 //reniciar
  if(keyDown("R")){
   reniciar();
  }
 }
  
//////////////////////////////
 drawSprites();

 if(estadoJogo===ENCERRAR){
   
 //text reniciar
  textSize(20);
  fill(120);
  text("Aperte R para reniciar",width/2-90,height/2+30);
 }
  
 //tesouros pontos
  textSize(20);
  fill(255);
  text("Tesouros: "+ colecaoTesouros,10,30);
  
}

///////////////////// FUNCTION CRIAR GRUPOS /////////////////////
function reniciar(){
  estadoJogo = JOGAR;
  
  dinheiroG.destroyEach();
  diamantesG.destroyEach();
  joiasG.destroyEach();
  grupoEspada.destroyEach();
  
  colecaoTesouros = 0;
}
/////////////////////////
 function criarDinheiro() {
  if (World.frameCount % 200 == 0) {
   var dinheiro = createSprite(Math.round(random(width-150, width+50),40, 10, 10));
   dinheiro.addImage(imgDinheiro);
   dinheiro.scale=0.12;
   dinheiro.velocityY = 3;
   dinheiro.lifetime = height;
   dinheiroG.add(dinheiro);
  }
 }
/////////////////////////
 function criarDiamantes() {
  if (World.frameCount % 320 == 0) {
   var diamantes = createSprite(Math.round(random(width-150, width+50),40, 10, 10));
   diamantes.addImage(imgDiamantes);
   diamantes.scale=0.03;
   diamantes.velocityY = 3;
   diamantes.lifetime = height;
   diamantesG.add(diamantes);
  }
 }
/////////////////////////
 function criarJoias() {
  if (World.frameCount % 410 == 0) {
   var joias = createSprite(Math.round(random(width-150, width+50),40, 10, 10));
   joias.addImage(imgJoias);
   joias.scale=0.13;
   joias.velocityY = 3;
   joias.lifetime = height;
   joiasG.add(joias);
  }
 }
/////////////////////////
 function criarEspadas(){
  if (World.frameCount % 530 == 0) {
   var espada = createSprite(Math.round(random(width-150, width+50),40, 10, 10));
   espada.addImage(imgEspada);
   espada.scale=0.1;
   espada.velocityY = 3;
   espada.lifetime = height;
   grupoEspada.add(espada);
  }
 }
//////////////////////////////////////////////////////////////////