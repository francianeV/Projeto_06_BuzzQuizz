let listaQuizes = [];

listarQuiz()

function listarQuiz() {
    const promessa = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
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
        <li class="quizz">
            <img onclick="acessarQuiz()" src="${listaQuizes[i].image}"> 
            <span>${listaQuizes[i].title}</sapn>
        </li>
        `;
    }
}

function acessarQuiz() {
    //acessa quiz abrindo a tela 2
}

function criarQuizz(){
    const criar = document.querySelector(".conteudo");
    criar.classList.add("oculto");

    const telaCriar = document.querySelector(".montar-quizz");
    telaCriar.classList.remove("oculto");
}