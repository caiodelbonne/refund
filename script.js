// selecionar elementos  
const form = document.querySelector('form')

const amount = document.getElementById("amount") 
const expense = document.getElementById("expense")
const category = document.getElementById("category")

amount.oninput = () => { // capt entrada e tirando as letras do input com regex
    let value = amount.value.replace(/\D/g,"") // aceita o valor atual sem letras
    // transformar em centavos
    value = Number(value) / 100

    // variavel recebe o valor chama funçao recebendo o valor transformando em real 
    amount.value = formatCurrencyBRL(value)

} 

function formatCurrencyBRL(value) {
    // formata no padrao brl
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency:"BRL",
    })

    return value
}

form.onsubmit= (event) =>{
    event.preventDefault()
//  nova dispesa
    const newExpense = { 
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name:category.options[category.selectedIndex].text , //seleciona a oopcao selecionada 
        amount: amount.value,
        created_at: new Date() ,
    }

    console.log(newExpense)
}