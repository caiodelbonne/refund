// selecionar elementos
const form = document.querySelector("form");

const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

//  elementos da lista
const expenseList = document.querySelector("ul");
const expenseQuantity = document.querySelector("aside header p span")


amount.oninput = () => {
  // capt entrada e tirando as letras do input com regex
  let value = amount.value.replace(/\D/g, ""); // aceita o valor atual sem letras
  // transformar em centavos
  value = Number(value) / 100;

  // variavel recebe o valor chama funçao recebendo o valor transformando em real
  amount.value = formatCurrencyBRL(value);
};

function formatCurrencyBRL(value) {
  // formata no padrao brl
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return value;
}

// captura evento do submit do forms
form.onsubmit = (event) => {
  event.preventDefault();
  //  nova dispesa
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text, //seleciona a oopcao selecionada
    amount: amount.value,
    created_at: new Date(),
  };
  //  funcao que adc o item na LISTA
  expenseAdd(newExpense);
};

// adiciona item na lista 
function expenseAdd(newExpense) {
  try {
    // cria elemento para adc na lista
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    // adc icone da categoria
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    // adicionar o informacao da despesa
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    // cria o nome da despesa
    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense; // revebe da variavel do forms

    // cria cat3goria da despesa
    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    // adiciona name e cate. na div das informacoes
    expenseInfo.append(expenseName, expenseCategory);

    // cria o icone de remover 
    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute("src","img/remove.svg")
    removeIcon.setAttribute("alt","remover")



    // adiciona valor da despesa
    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML= `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$","")}` 

    
    // adc o informacoes no item
    expenseItem.append(expenseIcon, expenseInfo,expenseAmount,removeIcon);



    // adc o item na lista ********
    expenseList.append(expenseItem);
    // atualizar os totais 
    updateTotal()

  } catch (error) {
    alert("Nao foi possivel cadastrar");
    console.log(error);
  }
}


// atualizar totais
function updateTotal () {

    try {

        // recupera todos os li  da lista 
        const items = expenseList.children 
        // atualiza a quantidade da lista 
        expenseQuantity.textContent = `${items.length} ${items.length >1 ? "despesas" : "despesa"}`
        
    }catch (error) {

        alert(" erro ao atualizar")
    }
}