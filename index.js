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
//Sempre que uma função assíncrona for criada temos obrigatoriamente na frente do uso dela um "await"

let meta = {
    value: "Tomar 3 litros de água por dia.",
    checked: false
}

let metas = [ meta ]


const cadastrarMeta = async () => {
    const meta = await input ({ message: "Digite sua Meta:"})

    if(meta.length == 0) {
        console.log("A meta não pode ser vazia.")
        return
    }

    metas.push({
        value: meta,
        checked: false
     })
    
}
const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, e espaço para marcar ou desmarcar e o Enter para finalizar essa etapa.",
        choices:[...metas],
        instructions: false,
    })
    if(respostas.length ==0 ) {
        console.log("Nenhuma meta selecionada!")
        return
    }
    
    metas.forEach((m) =>{
        m.checked = false
    })

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true

    })
    //Quero mudar pra quando for mais de uma meta ir para o plural.
    console.log('Meta(s) concluida(s)')
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0) {
        console.log("Não existem metas realizadas")
        return
    }

    await select({
        message: "Metas Realizadas",
        choices: [...realizadas]
    })
}
const start = async () => {

    while(true){

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
                    value: "abetas"
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
            case "sair":
                console.log("Até a próxima!")
                return
            
        }
    }
}
start()