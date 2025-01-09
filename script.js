// selecionar elementos  
const amount = document.getElementById("amount") 


amount.oninput = () => { // capt entrada e tirando as letras do input com regex
    let value = amount.value.replace(/\D/g,"") // aceita o valor atual sem letras
    // transformar em centavos

    value = Number(value) / 100

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