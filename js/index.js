const ul         = document.querySelector(".lista")
const ulCarrinho = document.querySelector(".lista-carrinho")

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
    }
}

function adicionarCarrinho(produto){
    carrinhoCompras.push(produto)
    console.log(carrinhoCompras)
}
let carrinhoCompras = []

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
    carrinhoCompras.splice(index, 1)
    let list  = btnRemover.parentElement
    list.remove()
}




//function criarCardCarrinho(card1){
//
//    card1.innerHTML = ""
//
//    let li              = document.createElement("li")
//    let img             = document.createElement("img")
//    let div             = document.createElement("div")
//    let h4              = document.createElement("h4")
//    let p               = document.createElement("p")
//    let buttonCarrinho  = document.createElement("button")
//                          
//    img.src                     = produto.img
//    h4.innerText                = produto.nameItem
//    p.innerText                 = produto.description
//    buttonCarrinho.innerText    = "X"
//
//    li.className                = "list-carrinho"
//    img.id                      = "img-carrinho"
//    div.className               = "div"
//    h4.className                = "carrinho-title"
//    p.className                 = "carrinho-preco"
//    buttonCarrinho.className    = "x"
//
//    div.appendChild(h4, p)
//    li.append(img, div, button)
//
//    return li
//}
//