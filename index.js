// Comentarios

// O comentário não é interpretado na linguagem de programação.

/*
console.log("Hello World!") //String
console.log(2 - 1)          //Number
console.log(7 > 4)          //Boolean
*/

// Variáveis
/*

Variáveil é um conteiner para um valor que pode ser mudado quando nescessário

let mensagem = "Hello World"  //Imprimindo a variável varias vezes ela continua com o mesmo valor atribuido e caso queria mudar o valor atribuido só seria nescessário mudar apenas na variável.
console.log(mensagem)
console.log(mensagem)
console.log(mensagem)

mensagem = "Olá, Mundo"
console.log(mensagem)
*/

//Constantes

/*
const nome = "Renato" //Constantes é usada para declarar uma variável constante(imutável).
console.log(nome)
*/
// Escopo de uma variável 

/*
const mensagem = "Olá Renato" //Variável global
{
    // Como a mudança da variável foi dentro dos {} quer dizer que ela está em um escopo especifico.
    const mensagem = "Olá Mundo!" //Variável local
    // Caso seja impresso a const mensagem desse escopo ela vai imprimir o que a const representa nesse casso especifico.
    console.log(mensagem)
}
console.log(mensagem)
*/

// Arrays
/*
let metas = ["Renato", "Alô"]
console.log(metas[1] +" "+ metas[0])
*/

//Objects
// Objetos são usados para armazenar coleções de dados e entidades mais complexas.

/*
let meta = {
    value: "Ler um livro por mês.",
    checked: false
}
console.log(meta.value)
*/

//function, arrow function

//Não importa como a função foi criada, uma função é um valor.

/*
function criarMeta() {}
*/

//Há outra sintáxe muito simples e concisa para criar uma função a arrow function que é, de maneira muito simploria, uma função que aceita argumentos.
/*
let meta = {
    value: "Correr uma hora por dia",
    checked: false,
    isChecked: (info) =>{
        console.log(info)
    }
}
meta.isChecked(meta.checked)

const criarMetas = () => {}
*/
/*
let meta = {
    value: "Pedalar 5 dias na semana",
    checked: true
}
let metas = [
    meta,
    {
        value: "Correr 3 dias na semana",
        checked: false
    }
]
console.log(metas[0].checked)
*/
/*
function start() {
    let count = 0
    while (count < 10){
        console.log(count)
        count++ // count = count + 1
    }
}
start()
*/
/*
const start = () =>{
    while(true){
        let opcao = "cadastrar"
        switch (opcao) {
            case "cadastrar":
                console.log("Vamos Cadastrar")
                break
            case "listar":
                console.log("Vamos Listar")
                break
            case "sair":
                return
            }
        }
}
start()
*/

//Importação de Módulos e Biblioteca 'inquirer'

const { select, input, checkbox } = require('@inquirer/prompts')
const fs = require("fs").promises

let mensagem = "Bem-vindo ao App de Metas"
let metas


const carregarMetas = async () => {
    try {
        const dados = await fs.readFile["metas.json", "utf-8"]
        metas = JSON.parse(dados)
    }
    catch(erro) {
        metas = []
    }
}
const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

const cadastrarMeta = async () => {
    const meta = await input ({ message: "Digite sua Meta: "})


    if(meta.length == 0) {
        mensagem = "A meta não pode ser vazia."
        return
    }

    metas.push(
        { value: meta, checked: false}
    )

     mensagem = "Meta cadastrada com sucesso."
    
}
const listarMetas = async () => {
    if(metas.length == 0) {
        mensagem = "Não existem metas!"
        return
    }
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, e espaço para marcar ou desmarcar e o Enter para finalizar essa etapa.",
        choices:[...metas],
        instructions: false,        
    })
    metas.forEach((m) =>{
        m.checked = false
    })

    if(respostas.length ==0 ) {
        mensagem = "Nenhuma meta selecionada!"
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true

    })
    //Quero mudar pra quando for mais de uma meta ir para o plural.
    mensagem = 'Meta(s) concluida(s)'
}

const metasRealizadas = async () => {
    if(metas.length == 0) {
        mensagem = "Não exitem metas!"
        return
    }
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0) {
        mensagem = "Não existem metas realizadas"
        return
    }

    await select({
        message: "Você tem: " + realizadas.length + " meta(s) realizada(s)",
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    if(metas.length == 0) {
        mensagem = "Não existem metas!"
        return
    }
    const aberta = metas.filter((meta) => {
        return meta.checked != true
    })
    if(aberta.length == 0) {
        mensagem = "Não exite meta aberta"
        return
    }


    await select ({
        message: "Você tem  " + aberta.length + " meta(s) aberta(s)",
        choices: [...aberta]
    })
}
const deletarMetas = async() => {
    if(metas.length == 0) {
        mensagem = "Não existem metas!"
        return
    }
    const metasDesmarcadas = metas.map((meta) => {
        return { value: meta.value, checked: false }
    })
    const itensDeletar = await checkbox({
        message: "Selecione o item para deletar",
        choices:[...metasDesmarcadas],
        instructions: false,
    })

    if(itensDeletar.length == 0){
        mensagem = "Nenhum item para ser deletado"
        return
    }
    itensDeletar.forEach((item) =>{
        metas = metas.filter((meta) =>{
            return meta.value != item
        })
    })
    mensagem = "Meta(s) deletada(s) com sucesso!"
}
const mostrarMensagem = () => {
    console.clear()
    if(mensagem != '') {
        console.log(mensagem)
        console.log('')
        mensagem = ''
    }

}

const start = async () => {

    while(true){
        mostrarMensagem()
        carregarMetas()

        const opcao = await select({
            message: "Menu principal >",
            choices: [
                {
                    name: "Cadastrar Meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar Metas",
                    value: "listar"
                },
                {
                    name: "Metas Realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas Abertas",
                    value: "aberta"
                },
                {
                    name: "Deletar Metas",
                    value: "deletar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]

        })
    

        switch (opcao) {
            case "cadastrar":
                await cadastrarMeta()
                console.log(metas)
                break

            case "listar":
                await listarMetas()
                break

            case "realizadas":
                await metasRealizadas()
                break

            case "aberta":
                await metasAbertas()
                break

            case "deletar":
                await deletarMetas()
                break

            case "sair":
                mensagem = ("Até a próxima!")
                return
            
        }
    }
}
start()