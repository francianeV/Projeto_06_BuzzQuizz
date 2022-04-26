//Armazenamento de Dados - tela 3.1
const tituloQuiz = []
const urlImgQuiz = []
//Armazenamento de Dados - tela 3.2
const questionsQuiz = []
//Armazenamento de Dados - tela 3.3
const levelsQuiz = []

//Tela 3.1 - Info básica do Quiz ---------------------------------------------------------------------------------------------------------
function prosseguirCriarPerguntas() {
    let contadorInvalidacao = 0
    const naoTemErro = 0
    // if (!(validaTitulo())) {
    //     alert("Título do quiz deve ter no mínimo 20 e no máximo 65 caracteres!")
    //     contadorInvalidacao++
    // }
    // if (!(validaUrl())) {
    //     alert("URL da Imagem deve ter formato de URL!")
    //     contadorInvalidacao++
    // }
    if (!(validaQtdPerguntas())) {
        alert("Quantidade de perguntas do quiz deve ser no mínimo 3!")
        contadorInvalidacao++
    }
    if (!(validaQtdNiveis())) {
        alert("Quantidade de níveis do quiz deve ser no mínimo 2!")
        contadorInvalidacao++
    }

    //Cria propriedades 'titulo' e 'image' do objeto QuizUsuario
    tituloQuiz.push(document.querySelector(".montar-quizz").querySelector(".titulo-quizz").value)
    urlImgQuiz.push(document.querySelector(".montar-quizz").querySelector(".url-imagem").value)
    console.log(tituloQuiz)
    console.log(urlImgQuiz)

    if (contadorInvalidacao === naoTemErro) {
        acessaTela3_2()
    }
}

//CHECK!
function validaTitulo() {
let valueTitulo = document.querySelector(".montar-quizz").querySelector(".titulo-quizz").value
    if (valueTitulo.length >= 20 && valueTitulo.length <= 65) {
        return true
    }
    else {
        return false
    } 
}

//CHECK!
function validaUrl() {
    let valueUrl = document.querySelector(".montar-quizz").querySelector(".url-imagem").value
    let sliceValueUrl = valueUrl.slice(0,8)
    if (sliceValueUrl==="https://") {
        return true
    }
    else {
        return false
    }
}

//CHECK!
function validaQtdPerguntas() {
    const limiteMinPerguntas = 3
    let valueQtdPerguntas = document.querySelector(".montar-quizz").querySelector(".num-perguntas").value
    //if (Number(valueQtdPerguntas) >= limiteMinPerguntas)  {
    if (Number(valueQtdPerguntas) >=1)  {
        return true
    }
    else {
        return false
    }
}

//CHECK!
function validaQtdNiveis() {
    const limiteMinNiveis = 2
    let valueQtdNiveis = document.querySelector(".montar-quizz").querySelector(".niveis-quizz").value
    if (Number(valueQtdNiveis) >= limiteMinNiveis)  {
        return true
    }
    else {
        return false
    }
}

//----------------------------------------------------------------------------------------------------------------------------------
//Tela 3.2 - Perguntas do Quiz -----------------------------------------------------------------------------------------------------
let QtdPerguntas = document.querySelector(".montar-quizz").querySelector(".num-perguntas").value

function acessaTela3_2() {
    const tela3_1 = document.querySelector(".montar-quizz");
    tela3_1.classList.add("oculto");
    const tela3_2 = document.querySelector(".tela3_2")
    tela3_2.classList.remove("oculto")
    console.log("acessou tela3.2")
    renderizaTela3_2()
}

function renderizaTela3_2 () {
    const ulTela3_2 = document.querySelector(".tela3_2")
    ulTela3_2.innerHTML=""
    ulTela3_2.innerHTML += `
    <li>
        <h3 class="headersTela3">Crie suas perguntas</h3>
    </li>
    `
    for (let i = 1; i <= Number(document.querySelector(".montar-quizz").querySelector(".num-perguntas").value); i ++) {
        ulTela3_2.innerHTML += `
        <li>
            <div class="inputs">
                <h2>Pergunta ${i}</h2>
                <input class="texto-pergunta-P-${i}" placeholder="Texto da pergunta *   (obrigatório)">
                <input class="cor-fundo-pergunta-P-${i}" placeholder="Cor de fundo da pergunta *    (obrigatório)">
                <h2>Resposta correta</h2>
                <input class="resposta-correta-P-${i}" placeholder="Resposta correta *  (obrigatório)">
                <input class ="url-imagem-correta-P-${i}" placeholder="URL da imagem *  (obrigatório)">
                <h2>Respostas incorretas</h2>
                <input class="resposta-incorreta1-P-${i}" placeholder="Resposta incorreta 1 *   (obrigatório)">
                <input class ="url-imagem1-P-${i}" placeholder="URL da imagem 1 *    (obrigatório)">
                <div class="espacamento"></div>
                <input class="resposta-incorreta2-P-${i}" placeholder="Resposta incorreta 2    (opcional)">
                <input class ="url-imagem2-P-${i}" placeholder="URL da imagem 2     (opcional)">
                <div class="espacamento"></div>
                <input class="resposta-incorreta3-P-${i}" placeholder="Resposta incorreta 3     (opcional)">
                <input class ="url-imagem3-P-${i}" placeholder="URL da imagem 3     (opcional)">
                <div class="espacamento"></div>
            </div>
        </li>
        `;
    }
    ulTela3_2.innerHTML += `
    <li>
    <div class="botoesTela3_x" onclick="validaPerguntas()">Prosseguir pra criar níveis</div>
    </li>
    `
    console.log(document.querySelector(".tela3_2"))
    console.log("renderizou tela3.2")
}

function validaPerguntas() {
    let contadorInvalidacao = 0
    const naoTemErro = 0
    // if (!(validaTextoPergunta())) {
    //     alert("O texto da pergunta não pode estar em branco e deve ter no mínimo 20 caracteres!")
    //     contadorInvalidacao++
    // }
    // if (!(validaCorFundo())) {
    //     alert("O formato da cor não é valido!")
    //     contadorInvalidacao++
    // }
    // if (!(validaResposta())) {
    //     alert("O texto da Resposta Correta e da Resposta Incorreta 1 não podem estar em branco!")
    //     contadorInvalidacao++
    // }
    // if (!(validaUrlimgResposta())) {
    //     alert("URL da Imagem deve ter formato de URL!")
    //     contadorInvalidacao++
    // }

    //Cria a propriedade 'levels' do objeto QuizUsuario
    const numRespostasIncorretasQuestion = 3 
    const answers = []
    for (let i = 1; i <= Number(document.querySelector(".montar-quizz").querySelector(".num-perguntas").value); i ++) {
        const answersI = []
        let respostaCorretaI = {
            text: ulTela3_2.querySelector(`.resposta-correta-P-${i}`).value,
            image: ulTela3_2.querySelector(`.url-imagem-correta-P-${i}`).value,
            isCorrectAnswer: true
        }
        // answersI.push(respostaCorretaI)
        // for (let j = 1; j <= numRespostasIncorretasQuestion; i++) {
        //     let respostaIncorretaJ = {
        //         text: ulTela3_2.querySelector(`.resposta-incorreta${j}-P-${i}`).value,
        //         image: ulTela3_2.querySelector(`.url-imagem${j}-P-${i}`).value,
        //         isCorrectAnswer: false
        //     }
        //     answersI.push(respostaIncorretaJ)
        // }
        answers.push(answersI)

        const question = {
            title: ulTela3_2.querySelector(`.texto-pergunta-P-${i}`).value,
            color: ulTela3_2.querySelector(`.cor-fundo-pergunta-P-${i}`).value,
            answers: answers[i] 
        }
        questionsQuiz.push(question)
    }
    console.log(`answersI:${answers}`)
    console.log(`answers:${answers}`)
    console.log(questionsQuiz)

    if (contadorInvalidacao === naoTemErro) {
        acessaTela3_3()
    }
}

const ulTela3_2 = document.querySelector(".tela3_2")

//CHECK!
function validaTextoPergunta() {
    let retorno = []
    for (let i = 1; i <= Number(document.querySelector(".montar-quizz").querySelector(".num-perguntas").value); i ++) {
        let valueTextoPergunta = ulTela3_2.querySelector(`.texto-pergunta-P-${i}`).value
        console.log(Number(document.querySelector(".montar-quizz").querySelector(".num-perguntas").value))
        if (valueTextoPergunta.length >= 20) {
            retorno.push(true)
        }
        else {
            console.log(`.texto-pergunta-P-${i} INVALIDADO`)
            retorno.push(false)
        }
    }
    let contFalse = 0
    for (let i = 0; i < retorno.length; i++) {
        if (!(retorno[i])) {
          contFalse ++
        } 
    }
    if (contFalse!==0) {
        return false
      } else {
        return true
      }
    
}

//CHECK!
function validaCorFundo() {
    let retorno = []
    for (let i = 1; i <= Number(document.querySelector(".montar-quizz").querySelector(".num-perguntas").value); i ++) {
    let valueCorFundo = ulTela3_2.querySelector(`.cor-fundo-pergunta-P-${i}`).value
        let ultimos6Char = valueCorFundo.slice(1)
        let primeiroChar = valueCorFundo[0]
        if (ultimos6Char.length === 6 && primeiroChar === '#' && EhHexaDecimal(ultimos6Char)) {
            retorno.push(true)
        }   
        else {
            retorno.push(false)
        }
    }
    let contFalse = 0
    for (let i = 0; i < retorno.length; i++) {
        if (!(retorno[i])) {
          contFalse ++
        } 
    }
    if (contFalse!==0) {
        return false
      } else {
        return true
      }
}

//CHECK!
function EhHexaDecimal(string) {
    let contadorCharValida = 0
    for (let i = 0; i < string.length; i++) {
        if (string[i]==="A" || string[i]==="a" || string[i]==="B" || string[i]==="b" || string[i]==="C" || string[i]==="c" 
       || string[i]==="D" || string[i]==="d" || string[i]==="E" || string[i]==="e" || string[i]==="F" || string[i]==="f" 
       || string[i]==='1' || string[i]==='2' || string[i]==='3' || string[i]==='4' || string[i]==='5' || string[i]==='6' 
       || string[i]==='7' || string[i]==='8' || string[i]==='9') {
            contadorCharValida ++
        }  
    }
    if (contadorCharValida===string.length) {
        return true 
    }
    else {
        return false 
    }
}

//CHECK!
function validaResposta() {
    let retorno = []
    for (let i = 1; i <= Number(document.querySelector(".montar-quizz").querySelector(".num-perguntas").value); i ++) {
        let valueRespostaCorreta = ulTela3_2.querySelector(`.resposta-correta-P-${i}`).value
        let valueRespostaIncorreta1 = ulTela3_2.querySelector(`.resposta-incorreta1-P-${i}`).value
        if (valueRespostaCorreta !== '' && valueRespostaIncorreta1 !== '') {
            retorno.push(true)
        } else {
            retorno.push(false)
        }
    }
    let contFalse = 0
    for (let i = 0; i < retorno.length; i++) {
        if (!(retorno[i])) {
          contFalse ++
        } 
    }
    if (contFalse!==0) {
        return false
      } else {
        return true
      }
}

//CHECK!
function validaUrlimgResposta() {
    let retorno = []
    for (let i = 1; i <= Number(document.querySelector(".montar-quizz").querySelector(".num-perguntas").value); i ++) {
        let valueUrl = ulTela3_2.querySelector(`.url-imagem-correta-P-${i}`).value
        let valueUrl2 = ulTela3_2.querySelector(`.url-imagem1-P-${i}`).value
        let sliceValueUrl = valueUrl.slice(0,8)
        let sliceValueUrl2 = valueUrl2.slice(0,8)
        if (sliceValueUrl==="https://" && sliceValueUrl2==="https://") {
            retorno.push(true)
        }
        else {
            retorno.push(false)
        }
    }
    let contFalse = 0
    for (let i = 0; i < retorno.length; i++) {
        if (!(retorno[i])) {
          contFalse ++
        } 
    }
    if (contFalse!==0) {
        return false
      } else {
        return true
      }
}

//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//Tela 3.3 - Níveis do Quiz-----------------------------------------------------------------------------------------------------------
function acessaTela3_3() {
    const ulTela3_2 = document.querySelector(".tela3_2")
    ulTela3_2.innerHTML=""
    renderizaTela3_3()
}

const QtdNiveis = document.querySelector(".montar-quizz").querySelector(".niveis-quizz").value

function renderizaTela3_3 () {
    const ulTela3_3 = document.querySelector(".tela3_3")
    ulTela3_3.innerHTML += `
    <li>
        <h3 class="headersTela3">Agora, decida os níveis</h3>
    </li>
    `
    for (let i = 1; i <= Number(document.querySelector(".montar-quizz").querySelector(".niveis-quizz").value); i ++) {
        ulTela3_3.innerHTML += `
        <li>
            <div class="inputs">
                <h2>Nível ${i}</h2>
                <input class="titulo-nivel-N${i}" placeholder="Título do nível *   (obrigatório)">
                <input class="PorcentagemAcertoMin-N${i}" placeholder="% de acerto mínima *   (obrigatório)">
                <input class="url-imagemNivel-N${i}" placeholder="URL da imagem do nível *   (obrigatório)">
                <input class="descricao-nivel-N${i}" placeholder="Descrição do nível *   (obrigatório)"> 
            </div>
        </li>
        `;
    }
    ulTela3_3.innerHTML += `
    <li>
    <div class="botoesTela3_x" onclick="validaNiveis()">Finalizar Quiz</div>
    </li>
    `
}

function validaNiveis() {
    let contadorInvalidacao = 0
    const naoTemErro = 0
    // if (!(validaTituloNivel())) {
    //     alert("O título do Nível deve ter pelo menos 10 caracteres!")
    //     contadorInvalidacao++
    // }
    // if (!(validaAcertoMin())) {
    //     alert("A porcentagem mínima de acerto deve ser um número entre 0 e 100!")
    //     contadorInvalidacao++
    // }
    // if (!(validaURLimgNivel())) {
    //     alert("URL da Imagem deve ter formato de URL!")
    //     contadorInvalidacao++
    // }
    // if (!(validaDescricaoNivel())) {
    //     alert("A descrição do nível deve ter no mínimo 30 caracteres!")
    //     contadorInvalidacao++
    // }
    // if (!(validaAcertoMinDeZero())) {
    //     alert("A porcentagem mínima de acerto deve ser zero em pelo menos um nível!")
    //     contadorInvalidacao++
    // }

    //Cria a propriedade 'levels' do objeto QuizUsuario
    for (let i = 1; i <= Number(document.querySelector(".montar-quizz").querySelector(".niveis-quizz").value); i ++) {
        const level = {
            title: ulTela3_3.querySelector(`.titulo-nivel-N${i}`).value,
            image: ulTela3_3.querySelector(`.url-imagemNivel-N${i}`).value,
            text: ulTela3_3.querySelector(`.descricao-nivel-N${i}`).value,
            minValue: ulTela3_3.querySelector(`.PorcentagemAcertoMin-N${i}`).value
        }
        levelsQuiz.push(level)
    }
    console.log(levelsQuiz)
    

    if (contadorInvalidacao === naoTemErro) {
        acessaTela3_4()
    }
}

const ulTela3_3 = document.querySelector(".tela3_3")

//CHECK!
function validaTituloNivel() {
    let retorno = []
    for (let i = 1; i <= Number(document.querySelector(".montar-quizz").querySelector(".niveis-quizz").value); i ++) {
        let valueTituloNivel = ulTela3_3.querySelector(`.titulo-nivel-N${i}`).value
        if (valueTituloNivel.length >= 10) {
            retorno.push(true)
        }
        else {
            retorno.push(false)
        }
    }
    let contFalse = 0
    for (let i = 0; i < retorno.length; i++) {
        if (!(retorno[i])) {
          contFalse ++
        } 
    }
    if (contFalse!==0) {
        return false
      } else {
        return true
      }
}

//CHECK!
function validaAcertoMin() {
    let retorno = []
    for (let i = 1; i <= Number(document.querySelector(".montar-quizz").querySelector(".niveis-quizz").value); i ++) {
        let valuePorcentagem = ulTela3_3.querySelector(`.PorcentagemAcertoMin-N${i}`).value
        if (Number(valuePorcentagem) >= 0 && Number(valuePorcentagem) <= 100 && valuePorcentagem!=="") {
            retorno.push(true)
        }
        else {
            retorno.push(false)
        }
    }
    let contFalse = 0
    for (let i = 0; i < retorno.length; i++) {
        if (!(retorno[i])) {
          contFalse ++
        } 
    }
    if (contFalse!==0) {
        return false
      } else {
        return true
      }
}

//CHECK!
function validaURLimgNivel() {
    let retorno = []
    for (let i = 1; i <= Number(document.querySelector(".montar-quizz").querySelector(".niveis-quizz").value); i ++) {
        let valueUrl = ulTela3_3.querySelector(`.url-imagemNivel-N${i}`).value
        let sliceValueUrl = valueUrl.slice(0,8)
        if (sliceValueUrl==="https://") {
            retorno.push(true)
        }
        else {
            retorno.push(false)
        }
    }
    let contFalse = 0
    for (let i = 0; i < retorno.length; i++) {
        if (!(retorno[i])) {
          contFalse ++
        } 
    }
    if (contFalse!==0) {
        return false
      } else {
        return true
      }
}

//CHECK!
function validaDescricaoNivel() {
    let retorno = []
    for (let i = 1; i <= Number(document.querySelector(".montar-quizz").querySelector(".niveis-quizz").value); i ++) {
        let valueDescricaoNivel = ulTela3_3.querySelector(`.descricao-nivel-N${i}`).value
        if (valueDescricaoNivel.length >= 30) {
            retorno.push(true)
        }
        else {
            retorno.push(false)
        }
    }
    let contFalse = 0
    for (let i = 0; i < retorno.length; i++) {
        if (!(retorno[i])) {
          contFalse ++
        } 
    }
    if (contFalse!==0) {
        return false
      } else {
        return true
      }
}

//CHECK!
function validaAcertoMinDeZero() {
    let retorno = []
    for (let i = 1; i <= Number(document.querySelector(".montar-quizz").querySelector(".niveis-quizz").value); i ++) {
        let valueAcertoMinDeZero = ulTela3_3.querySelector(`.PorcentagemAcertoMin-N${i}`).value
        console.log(valueAcertoMinDeZero)
        if (valueAcertoMinDeZero == 0) {
            retorno.push(true)
        }
        else {
            retorno.push(false)
        }
    }
    console.log(retorno)
    let contTrue = 0
    for (let i = 0; i < retorno.length; i++) {
        if (retorno[i]) {
          contTrue ++
        } 
    }
    if (contTrue > 0) {
        return true
      } else {
        return false
      }
}

//-----------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------
//Tela 3.4 - Sucesso do Quiz --------------------------------------------------------------------------------------------------------------
function acessaTela3_4() {
    const ulTela3_3 = document.querySelector(".tela3_3")
    ulTela3_3.innerHTML=""
    renderizaTela3_4()
}

function renderizaTela3_4 () {
    const ulTela3_4 = document.querySelector(".tela3_4")
    ulTela3_4.innerHTML += `
    <li>
        <h3 class="headersTela3">Seu quizz está pronto!</h3>
    
    //adicionar imagem do quiz pegando do objeto QuizUsuário

    <div class="botoesTela3_x" onclick="acessarQuiz()">Acessar Quizz</div>
    <div class="voltarHome" onclick="voltarHome()">Voltar pra Home</div>
    </li>
    `
}

function voltarHome() {
    const ulTela3_4 = document.querySelector(".tela3_4")
    ulTela3_4.innerHTML = ''
    const home = document.querySelector(".conteudo");
    home.classList.remove("oculto");
    //adicionar função pra adicionar o quiz que acabou de ser criado na tela inicial como opção de escolha
}


//-----------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------
// Montando o objeto QuizUsuário para enviar para a api
//-----------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------- 
function montaQuizUsuario() {
    let idQuiz = 0
    const QuizUsuario = {
        id: idQuiz,
        title: tituloQuiz[0],
        image: urlImgQuiz[0],
        questions: questionsQuiz,
        levels: levelsQuiz
    }    
    console.log(QuizUsuario)
}

//criar função pra adicionar quiz que acabou de ser criado nesta linha




