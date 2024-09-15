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

const { select } = require('@inquirer/prompts')

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
                    name: "Sair", 
                    value: "sair"
                }
            ]
        })
    

        switch (opcao) {
            case "cadastrar":
                console.log("Vamos Cadastrar")
                break
            case "listar":
                console.log("Vamos Listar")
                break
            case "sair":
                console.log("Até a próxima!")
                return
            
        }
    }
}
start()