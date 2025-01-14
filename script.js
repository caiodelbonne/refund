// selecionar elementos  
const form = document.querySelector('form')

const amount = document.getElementById("amount") 
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//  elementos da lista 
const expenseList = document.querySelector("ul")

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

// captura evento do submit do forms
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
//  funcao que adc o item na LISTA
    expenseAdd(newExpense)
}

function expenseAdd (newExpense) { 
    try {
        // cria elemento para adc na lista 
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")


        // adc icone da categoria
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src",`img/${newExpense.category_id}.svg`) 
        expenseIcon.setAttribute("alt", newExpense.category_name)


        // adc o informacoes no item 
        expenseItem.append(expenseIcon)

        // adc o item na lista ********
        expenseList.append(expenseItem)


    }catch (error) {
        alert('Nao foi possivel cadastrar')
        console.log(error);
        
    }
}