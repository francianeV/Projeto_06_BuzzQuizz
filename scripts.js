let listaQuizes = [];

listarQuiz()

function listarQuiz() {
    const promessa = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"); /*mudar para v6 depois*/
    promessa.then(carregarQuiz);
}

function carregarQuiz(response) {
    listaQuizes = response.data
    renderizarQuiz()
}

function renderizarQuiz () {
    const ulQuiz = document.querySelector(".quizzes"); //alterar ".quizes" se necessário. ".quizes" é classe da tag <ul>
    ulQuiz.innerHTML = ""
    //criar function acessarQuiz() em: img -> onclick="acessarQuiz()"
    for (let i=0; i<listaQuizes.length;i++) {
        ulQuiz.innerHTML += `
        <li class="quizz" onclick="acessarQuiz(this)">
            <img src="${listaQuizes[i].image}"> 
            <span>${listaQuizes[i].title}</span>
            <div class="quizz-id">${listaQuizes[i].id}</div>
        </li>
        `;
    }
}

function acessarQuiz(element) {

    let idQuizz = element.querySelector(".quizz-id").innerHTML;
    console.log(idQuizz);
  
    const ocultar = document.querySelector(".conteudo");
    ocultar.classList.add("oculto");

    const irQuiz = document.querySelector(".pagina-quiz");
    irQuiz.classList.remove("oculto");

    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idQuizz}`);
    
    promise.then(chamarQuiz);




}
/*
document.querySelectorAll(".quizz img").forEach( function(button) {
    
    button.addEventListener("click", function(event) {
    const el = event.target || event.srcElement;
    const numId = el.id;
    console.log(numId);

});
});
*/
function chamarQuiz(response){
    let idClicado = Number()

    document.querySelector(".pagina-quiz").innerHTML+=` 
    <header class="topo-quiz">
    <img src="${response.data.image}" alt="">
    <p>${response.data.title}</p>
    </header>`;

}

function criarQuizz(){
    const criar = document.querySelector(".conteudo");
    criar.classList.add("oculto");

    const telaCriar = document.querySelector(".montar-quizz");
    telaCriar.classList.remove("oculto");
}



