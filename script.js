
const apiUrl = 'https://economia.awesomeapi.com.br/json/last/';

const base = document.getElementById("moeda-base");
const conv = document.getElementById("moeda-conv");
const quantidade = document.getElementById("quantidade");


codMoedas.forEach((moeda)=>{
    const escolha = document.createElement("option");
    escolha.value = moeda;
    escolha.text = moeda;
    base.add(escolha);
})

codMoedas.forEach((moeda)=>{
    const escolha = document.createElement("option");
    escolha.value = moeda;
    escolha.text = moeda;
    conv.add(escolha);
})

async function converteMoeda(moeda, quantMBase) {
    try {
        const resposta = await fetch(apiUrl+moeda);
        //console.log(resposta);
        const dados = await resposta.json();
        console.log(dados);

        if(resposta.status!=200){
            throw resposta.status;
        }
        
        
        moeda = moeda.replace('-', '')
        const rate = dados[moeda].ask;
        const valor = quantMBase*rate;
        console.log(valor);

        

        console.log(valor);


    } catch (error){
        console.log('erro de conexao: '+error);
    }
    
}

function fazConversao(){
    const opcaoBase = base.value;
    let opcaoConv = conv.value;
    if(opcaoBase == opcaoConv){
        opcaoConv = 'USD';
    }

    const mandarApi = opcaoBase+"-"+opcaoConv;

    const quant = quantidade.value;

    converteMoeda(mandarApi, quant);
}





//converteMoeda(, 2)