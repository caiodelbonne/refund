// selecionar elementos
const form = document.querySelector("form");

const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

//  elementos da lista
const expenseList = document.querySelector("ul");
const expenseTotal = document.querySelector("aside header h2");
const expenseQuantity = document.querySelector("aside header p span");

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
    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    // adiciona name e cate. na div das informacoes
    expenseInfo.append(expenseName, expenseCategory);

    // cria o icone de remover
    const removeIcon = document.createElement("img");
    removeIcon.classList.add("remove-icon");
    removeIcon.setAttribute("src", "img/remove.svg");
    removeIcon.setAttribute("alt", "remover");

    // adiciona valor da despesa
    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
      .toUpperCase()
      .replace("R$", "")}`;

    // adc o informacoes no item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);

    // adc o item na lista ********
    expenseList.append(expenseItem);

    // limpa o form
    formClear();

    // atualizar os totais
    updateTotal();
  } catch (error) {
    alert("Nao foi possivel cadastrar");
  }
}

// atualizar totais
function updateTotal() {
  try {
    // recupera todos os li  da lista
    const items = expenseList.children;
    // atualiza a quantidade da lista
    expenseQuantity.textContent = `${items.length} ${
      items.length > 1 ? "despesas" : "despesa"
    }`;

    // variavel do total de despesas
    let total = 0;
    for (let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector(".expense-amount");

      //   remover caract n numericos e substitui virgula para PONTO
      let value = itemAmount.textContent
        .replace(/[^\d,]/g, "")
        .replace(",", ".");

      value = parseFloat(value);
      //   verifica se e um numero valido
      if (isNaN(value)) {
        return alert("nao e possivel calular o total");
      }

      total += Number(value);
    }

    // criar span para adc R$ formatado
    const sybolBRL = document.createElement("small");
    sybolBRL.textContent = "R$";

    // formata o valor e remove o R$ que sera exbido pela small com estilo
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "");
    // limpa o conteudo
    expenseTotal.innerHTML = "";
    // adiciona o simbolo BRL e o total formatado
    expenseTotal.append(sybolBRL, total);
  } catch (error) {
    alert(" erro ao atualizar");
  }
}

// evento que cap click de remover na lista

expenseList.addEventListener("click", function (event) {
  event.preventDefault();

  if (event.target.classList.contains("remove-icon")) {
    // obtem a L I  pai do item clicado
    const item = event.target.closest(".expense");

    // remove o elemento clicado
    item.remove();
  }
  updateTotal();
});

// limpar o formulario
function formClear() {
    // limpa elemento e retorna para o input 
  expense.value = "";
  category.value = "";
  amount.value = "";

  expense.focus()
}
