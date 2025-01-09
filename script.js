// selecionar elementos  
const amount = document.getElementById("amount") 


amount.oninput = () => { // capt entrada e tirando as letras do input com regex
    let value = amount.value.replace(/\D/g,"") // aceita o valor atual sem letras
    
    amount.value = value

} 