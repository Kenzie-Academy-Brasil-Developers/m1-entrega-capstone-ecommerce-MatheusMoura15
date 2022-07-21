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
    spanPreco.innerText         = `R$ ${produto.value},99`
    buttonCarrinho.innerText    = produto.addCart
    let id                      = produto.id
    
    if(id != undefined){
        buttonCarrinho.id = id
    }

    li.className                = "list"
    figure.className            = "container-img"
    img.className               = "img"
    buttonCategoria.className   = "tipo"
    div.className               = "div-text"
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

ul.addEventListener("click", interceptandoProduto)

let carrinhoCompras = []

function interceptandoProduto(event){
    
    let btnComprar = event.target
    
    if(btnComprar.tagName == "BUTTON"){
        
        let idProduto = btnComprar.id
        
        let produto = produtos.find(function(product){
            
            if(product.id == idProduto){
                return product
                
            }
        })
        adicionarCarrinho(produto)
        //console.log(produto)
        
        let card = btnComprar.closest("li").cloneNode(true)
        let button = card.children[3]
        let div = card.children[2]
        let h3  = div.children[0]

        card.setAttribute("class", "list-carrinho")
        h3.setAttribute("class", "carrinho-title")
        
        button.innerText  = "X"
        button.className  = "x"
        
        ulCarrinho.appendChild(card)
        let i = ulCarrinho.childElementCount
    }
}

function adicionarCarrinho(produto){
    carrinhoCompras.push(produto)
    console.log(carrinhoCompras)
}

ulCarrinho.addEventListener("click", interceptandoProduto2)

function interceptandoProduto2(event){

    let btnRemover = event.target
    if(btnRemover.tagName == "BUTTON"){

        let idProduto = btnRemover.id
        removerCarrinho(idProduto, btnRemover)
        console.log(carrinhoCompras)
    }
}

function removerCarrinho(index, btnRemover){
   
   for(let i = 0; i < carrinhoCompras.length; i++){

        if(carrinhoCompras[i].id != btnRemover.id){

            carrinhoCompras[i].id = btnRemover.id  
            
        }
        carrinhoCompras.splice(index, 1)
        let list  = btnRemover.parentElement
        list.remove()
   }
}

let p1    = document.createElement("p")
let p2    = document.createElement("p")
let p3    = document.createElement("p")
let p4    = document.createElement("p")

p1.innerText   = "Qnt de produtos:"
p2.innerText   =  3
p3.innerText   = "Preço Total:"
p4.innerText   = `${somaTotal()}`

p1.className   = "paragraph-3"
p2.className   = "paragraph-2"
p3.className   = "paragraph-3"
p4.className   = "paragraph-4"

divCarrinho.append(p1, p2, p3 ,p4)
//console.log(divCarrinho)

function somaTotal(){
    
    let precoProduto = 0
    
    for(let i = 0; i < carrinhoCompras.length; i++){
        
        precoProduto += `${carrinhoCompras[2].value},99`
    }
    return precoProduto
}
somaTotal()



