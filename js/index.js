const ul            = document.querySelector(".lista")
const ulCarrinho    = document.querySelector(".lista-carrinho")
const divCarrinho   = document.querySelector(".carrinho-detalhes")


function listarProdutos(products){
    ul.innerHTML = ""

    for(let i = 0; i < products.length; i++){

        let produto = products[i]
        let secao   = criarCard(produto)

        ul.appendChild(secao)
    }
}
listarProdutos(produtos)

function criarCard(produto){
    
    let li              = document.createElement("li")
    let figure          = document.createElement("figure")
    let img             = document.createElement("img")
    let buttonCategoria = document.createElement("button")
    let div             = document.createElement("div")
    let h3              = document.createElement("h3")
    let pDescription    = document.createElement("p")
    let spanPreco       = document.createElement("span")
    let buttonCarrinho  = document.createElement("button")
                          
    img.src                     = produto.img
    buttonCategoria.innerText   = produto.tag
    h3.innerText                = produto.nameItem
    pDescription.innerText      = produto.description
    spanPreco.innerText         = `R$ ${produto.value}`.replaceAll(".", ",")
    buttonCarrinho.innerText    = produto.addCart
    buttonCarrinho.id           = produto.id

    li.className                = "list"
    figure.className            = "container-img"
    img.className               = "img"
    buttonCategoria.className   = "tipo"
    div.className               = "div"
    h3.className                = "title"
    pDescription.className      = "description"
    spanPreco.className         = "span"
    buttonCarrinho.className    = "button"

    div.append(h3, pDescription, spanPreco)
    figure.appendChild(img)
    li.append(figure, buttonCategoria, div, buttonCarrinho)
    
    return li
}

let inputBusca  = document.querySelector(".container-pesquisa input")
let btnBusca    = document.querySelector(".container-pesquisa button")

btnBusca.addEventListener("click", function(){

    let pesquisa            = inputBusca.value
    let resultadoPesquisa   = busca(pesquisa)

listarProdutos(resultadoPesquisa)
})

function busca(valorBusca){

    let resultBusca = []

    for(let i = 0; i < produtos.length; i++){
        
        if(valorBusca == produtos[i].nameItem){
            
            resultBusca.push(produtos[i])
        }
    }
    return resultBusca
}

const button = document.querySelectorAll(".button")

ul.addEventListener("click", adicionarCarrinho)

let carrinhoCompras = []

function adicionarCarrinho(event){
    
    let btnComprar = event.target
    
    if(btnComprar.tagName == "BUTTON"){
        
        let idProduto = btnComprar.id
        
        let produto = produtos.find(function(product){
            
            if(product.id == idProduto){
                return product
            }
        })
        carrinhoCompras.push(produto)
        listarCart(carrinhoCompras)
    }
}

function listarCart(carrinhoCompras){

    ulCarrinho.innerHTML = ""

    carrinhoCompras.forEach((produto, index)=>{

        const card2 = template(produto, index)

        ulCarrinho.append(card2)
    })       
    somaTotal(carrinhoCompras)
}

function template(produto, index){

    const li    = document.createElement("li")
    let figure  = document.createElement("figure") 
    let img     = document.createElement("img") 
    let div     = document.createElement("div") 
    let h3      = document.createElement("h3") 
    let span    = document.createElement("span") 
    let button  = document.createElement("button") 

    li.className        = "list-carrinho"
    figure.className    = "container"
    img.className       = "img-carrinho"
    div.className       = "div-text"
    h3.className        = "carrinho-title"
    span.className      = "span"
    button.className    = "x"
    button.id       = index
    
    img.src         = produto.img
    h3.innerText    = produto.nameItem
    span.innerText  = `R$ ${produto.value}`.replaceAll(".", ",")
    button.innerText= "X"

    figure.appendChild(img)
    div.append(h3, span)
    li.append(figure, div, button)

    return li
}

ulCarrinho.addEventListener("click", removerCarrinho)

function removerCarrinho(event){

    let btnRemover = event.target

    if(btnRemover.tagName == "BUTTON"){

        let index = btnRemover.id
        carrinhoCompras.splice(index, 1)
        listarCart(carrinhoCompras)
    }
}

let p1    = document.createElement("p")
let p2    = document.createElement("p")
let p3    = document.createElement("p")
let p4    = document.createElement("p")

p1.innerText   = "Qnt de produtos:"
p2.innerText   = 0
p3.innerText   = "Preço Total:"
p4.innerText   = 0
p1.className   = "paragraph-3"
p2.className   = "paragraph-2"
p3.className   = "paragraph-3"
p4.className   = "paragraph-4"

divCarrinho.append(p1, p2, p3 ,p4)

function somaTotal(carrinhoCompras){
    
    let precoProduto = 0
        
    for(let i = 0; i < carrinhoCompras.length; i++){

        p2.innerText = carrinhoCompras.length
        precoProduto += carrinhoCompras[i].value
        
    }
    return p4.innerText = precoProduto.toFixed(2)
}  
somaTotal(carrinhoCompras)
