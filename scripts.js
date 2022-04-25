let listaQuizes = [];
let quizzSelecionado = {};
let respostasCorretas = 0;
let perguntasRespondidas = 0;
const TEMPO2S = 2 * 1000;

listarQuiz()

function listarQuiz() {
    const promessa = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes"); /*mudar para v6 depois*/
    promessa.then(carregarQuiz);
}

function carregarQuiz(response) {
    listaQuizes = response.data
    renderizarQuiz()
}

function renderizarQuiz() {
    const ulQuiz = document.querySelector(".quizzes"); //alterar ".quizes" se necessário. ".quizes" é classe da tag <ul>
    ulQuiz.innerHTML = ""
    //criar function acessarQuiz() em: img -> onclick="acessarQuiz()"
    for (let i = 0; i < listaQuizes.length; i++) {
        ulQuiz.innerHTML += `
        <li class="quizz" onclick="acessarQuiz(this)">
            <img src="${listaQuizes[i].image}"> 
            <p class="id">${listaQuizes[i].title}</p>
            <div class="quizz-id">${listaQuizes[i].id}</div>
        </li>
        `;
    }
}


function acessarQuiz(element) {
    document.querySelector(".conteudo").classList.add("oculto");
    document.querySelector(".pagina-quiz").classList.remove("oculto");
    let quizzID = element.querySelector("p").innerHTML;
    console.log(quizzID);
    let index = listaQuizes.findIndex((element) => element.title === quizzID);
    console.log(index);
    quizzSelecionado = listaQuizes[index];
    console.log(quizzSelecionado);

    chamarQuiz();

}

function chamarQuiz() {
    document.querySelector(".pagina-quiz").innerHTML = `
              <header class="topo-quiz">
              <p>${quizzSelecionado.title}</p>
              <img src="${quizzSelecionado.image}" alt=""/>    
              </header>
      `;

    let perguntas = quizzSelecionado.questions;

    console.log(perguntas.length);

    for (let i = 0; i < perguntas.length; i++) {
        console.log(perguntas[i].answers.length);

        document.querySelector(".pagina-quiz").innerHTML += `<div class="respostas-quiz">       
        <div class="titulo-pergunta" style="background-color:${perguntas[i].color}">
        <h4>${perguntas[i].title}</h4>
        </div>
        <div class="quiz-respostas" id="pergunta${i}">
        </div>
        </div>
       `;

        let respostasDadas = [];
        let perguntasEmbaralhadas = [];

        for (let j = 0; j < perguntas[i].answers.length; j++) {
            console.log(j);
            respostasDadas.push(j);
            console.log(respostasDadas);
        }

        embaralha(respostasDadas);
        for (let k = 0; k < respostasDadas.length; k++) {
            perguntasEmbaralhadas.push(respostasDadas[k]);
        }
        console.log(perguntasEmbaralhadas);

        for (let k = 0; k < perguntasEmbaralhadas.length; k++) {
            let id = `pergunta${i}`;
            let resposta = perguntasEmbaralhadas[k];
            document.getElementById(id).innerHTML += `
                    <div class="pergunta-resposta ${perguntas[i].answers[resposta].isCorrectAnswer}" onclick="escolherResposta(this)">
                      <div class="oculto opacidade"></div>
                      <img src="${perguntas[i].answers[resposta].image}" alt=""/>
                      <span class="quizz-resposta">${perguntas[i].answers[resposta].text}</span>
                  </div>
              `;


        }
    }
    scrollParaTopo();
}

function escolherResposta(elemento) {
    let perguntas = quizzSelecionado.questions;
    let perguntaRespondida = elemento.parentNode;

    if (perguntaRespondida.classList.contains("respondido") === false) {
        let valor = elemento.classList.contains("true");

        if (valor === true) {
            console.log("resposta correta");
            perguntasRespondidas++;
            respostasCorretas++;
        } else {
            console.log("resposta errada");
            perguntasRespondidas++;
        }
        console.log(valor);

        perguntaRespondida.classList.add("respondido");
        let perguntaCompleta = perguntaRespondida.parentNode;
        perguntaCompleta.classList.add("respondido");
        let todasRespostas = perguntaRespondida.querySelectorAll(
            ".pergunta-resposta"
        );
        for (let i = 0; i < todasRespostas.length; i++) {
            let transparente = todasRespostas[i];
            if (
                transparente.classList.contains("false") &&
                transparente !== elemento
            ) {
                transparente.firstElementChild.classList.remove("oculto");
            } else if (
                transparente.classList.contains("true") &&
                transparente !== elemento
            ) {
                transparente.firstElementChild.classList.remove("oculto");
            }
        }

        if (perguntasRespondidas === perguntas.length) {
            console.log("acabou o quizz");
            console.log(`respostasCorretas ${respostasCorretas}`);
            console.log(`perguntasRespondidas ${perguntasRespondidas}`);
            nivel = (respostasCorretas / perguntasRespondidas) * 100;
            console.log(`nivel ${nivel}`);
            document.querySelector(".pagina-quiz").innerHTML += `
              <div class="quizz-finalizar"></div>
              `;
            finalizarQuizz();
        } else {
            console.log(todasRespostas);
            console.log(todasRespostas.length);
            scrollProxima(perguntaCompleta.nextElementSibling);
        }
    }
}

function embaralha(array) { //mudar nome dessa função
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function scrollProxima(elemento) {
    setTimeout(() => {
        elemento.scrollIntoView({ block: "center", behavior: "smooth" });
    }, TEMPO2S);
}

function scrollParaTopo() {
    elemento = document.querySelector(".topo-quiz");
    console.log(elemento);

    setTimeout(() => {
        elemento.scrollIntoView({ block: "center", behavior: "smooth" });
    }, 500);
}


/*

function acessarQuiz(element) {

    //let idQuizz = element.querySelector(".quizz-id").innerHTML;
    //console.log(idQuizz);
  
    const ocultar = document.querySelector(".conteudo");
    ocultar.classList.add("oculto");

    const irQuiz = document.querySelector(".pagina-quiz");
    irQuiz.classList.remove("oculto");

    //const promise = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${idQuizz}`);
    
    //promise.then(chamarQuiz);

function chamarQuiz(response){

    let perguntas = response.data.questions;

    let questoes = response.data.questions.answers;

    document.querySelector(".pagina-quiz").innerHTML+=`<header class="topo-quiz"> ;
    <img src="${response.data.image}" alt="">
    <p>${response.data.title}</p></header>
    `;

    for(let i=0; i < perguntas.length; i++){
        document.querySelector(".pagina-quiz").innerHTML += `<div class="respostas-quiz">
        <div class="titulo-pergunta" style="background-color:${perguntas[i].color}">
            <h4>${perguntas[i].title}</h4>
        </div>
        </div>
        <ul class="perguntas"></ul>
       `;
      
       }
    }   

    */

function criarQuizz() {
    const criar = document.querySelector(".conteudo");
    criar.classList.add("oculto");

    const telaCriar = document.querySelector(".montar-quizz");
    telaCriar.classList.remove("oculto");
}



