const url = `https://api.frankfurter.app/`;

const base = document.getElementById("moeda-base");
const conv = document.getElementById("moeda-conv");
const quantidade = document.getElementById("quantidade");
const conversao = document.getElementById("conversao");

moedas.forEach((moeda)=>{
    const escolha = document.createElement("option");
    escolha.value = moeda;
    escolha.text = moeda;
    base.add(escolha);
})

moedas.forEach((moeda)=>{
    const escolha = document.createElement("option");
    escolha.value = moeda;
    escolha.text = moeda;
    conv.add(escolha);
})

async function teste(coin, coin2, quantia) {
    try {
        const resposta = await fetch(url+`latest?from=${coin}&to=${coin2}`);
    
        const dados = await resposta.json();
        console.log(dados);
        
        
        if(resposta.status!=200){
            throw resposta.status;
        }

        const sum = (dados.rates[coin2])*quantia;

        console.log(sum);
        conversao.value = sum;
        
        
    
    } catch (error){
        console.log('erro de conexao: '+error);
    }
    
} 

function converter(){
    const baseNum = base.value;
    const convNum = conv.value;
    const quant = quantidade.value;
    teste(baseNum, convNum, quant);

}





fetch(url+"currencies")
    .then(response => response.json())
    .then((data) => {
        console.log(data);
    });



