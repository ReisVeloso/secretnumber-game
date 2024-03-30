let listaSortNumSecreto = [];
let numLimite = 10;
let tentativa = 0;
let numSecreto = gerarNumeroSecreto();


function gerarNumeroSecreto() {
    let numAleatorio = parseInt(Math.random() * numLimite + 1);
    
    if(listaSortNumSecreto.length < 3){
        while(listaSortNumSecreto.includes(numAleatorio)){
            numAleatorio = parseInt(Math.random() * numLimite + 1);
        }
        listaSortNumSecreto.push(numAleatorio);
    }
    else{
        listaSortNumSecreto = [];
        numAleatorio = parseInt(Math.random() * numLimite + 1);
        listaSortNumSecreto.push(numAleatorio);
        alterarFront('p', 'New Game');
    }
    console.log(`Lista ${listaSortNumSecreto} e num ${numAleatorio}`);
    
    return numAleatorio;
}


function escolhaUmNumero(){
    resposta = document.querySelector( 'input').value;
    return resposta;
}

function alterarFront(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function limpaCampo(){
    let campoLimpar = document.querySelector( 'input');
    campoLimpar.value ='';
}

function verificacao(){
    let userNumber = escolhaUmNumero();
    //Vale a tentativa de ocultar os ifs e fazer pelo ternário para ver que legal OBS: Não tem contagem no ternário.
    // let resp = numSecreto == userNumber? alterarFront('p', 'Você venceu!!!') : numSecreto>userNumber?alterarFront('p', 'maior'):alterarFront('p', 'menor');
    if(userNumber > numSecreto){
        alterarFront('p', 'O número secreto é menor');
        limpaCampo();
        tentativa++;
    }
    else if(userNumber < numSecreto){
        alterarFront('p', 'O número secreto é maior');
        limpaCampo();
        tentativa++;
    }
    else{
        tentativa++;
        if(listaSortNumSecreto.length < numLimite){
            tentativa == 1? alterarFront('p', 'VOCÊ VENCEU DE PRIMEIRA'):alterarFront('p', `Você venceu com ${tentativa} tentativas`);
        }
        else{
            alterarFront('p', 'Você zerou o jogo!!!');
        }
        document.querySelector('#reiniciar').removeAttribute('disabled');//# pega o ID e . pega a class

        console.log(listaSortNumSecreto);
    }
}

function exibirMsgInicial(){
    alterarFront('h1', 'Jogo do número secreto');
    alterarFront('p', `Escolha um número entre 0 e ${numLimite}`);
}

function newGame(){
    exibirMsgInicial();
    limpaCampo();
    tentativa = 0;
    numSecreto = gerarNumeroSecreto();
    document.querySelector('#reiniciar').setAttribute('disabled', true);    
}


exibirMsgInicial();