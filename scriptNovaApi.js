const url = `https://api.frankfurter.app/`;

const base = document.getElementById("moeda-base");
const conv = document.getElementById("moeda-conv");
const quantidade = document.getElementById("quantidade");
const conversao = document.getElementById("conversao");

function dataHora(){
    const dataAtual = new Date();
    const dataFormatada = dataAtual.toLocaleDateString('pt-br');
    const horaFormatada = dataAtual.toLocaleTimeString('pt-br');
    const data = document.getElementById("data");
    const horario = document.getElementById("horario");

    data.innerHTML = 'Data: '+dataFormatada;
    horario.innerHTML = 'Horario: '+horaFormatada;
}

setInterval(dataHora, 1000);
dataHora();


moedas.forEach((moeda)=>{
    const escolha = document.createElement("option");
    escolha.value = moeda;
    escolha.text = moeda;
    base.add(escolha);
    base.value = 'BRL';
})

moedas.forEach((moeda)=>{
    const escolha = document.createElement("option");
    escolha.value = moeda;
    escolha.text = moeda;
    conv.add(escolha);
    conv.value = 'USD';
})

setInterval(countdown(), 1000);

function countdown(){

}

async function teste(coin, coin2, quantia) {
    if(coin===coin2){
        const valor = Number(quantia);
        conversao.value = valor.toFixed(2);
        document.getElementById("rates").innerHTML = `1${coin} = 1${coin2}`
    } else{
        try {
            const resposta = await fetch(url+`latest?from=${coin}&to=${coin2}`);
        
            const dados = await resposta.json();
            console.log(dados);
            
            
            if(resposta.status!=200){
                throw resposta.status;
            }
    
            const sum = (dados.rates[coin2])*quantia;
    
            console.log(sum);
            conversao.value = sum.toFixed(2);
            
            document.getElementById("rates").innerHTML = `1${coin} = ${dados.rates[coin2]}${coin2}`
        
        } catch (error){
            console.log('erro de conexao: '+error);
        }
    }
    
} 

function converter(){
    quantidade.value = Number(quantidade.value).toFixed(2);
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



