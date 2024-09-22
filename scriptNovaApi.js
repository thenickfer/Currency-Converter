const url = `https://api.frankfurter.app/`;

const base = document.getElementById("moeda-base");
const conv = document.getElementById("moeda-conv");
const quantidade = document.getElementById("quantidade");
const conversao = document.getElementById("conversao");
const grafico = document.getElementById("grafico");

function dataHora(){
    const dataAtual = new Date();
    const dataFormatada = dataAtual.toLocaleDateString('pt-br');
    const horaFormatada = dataAtual.toLocaleTimeString('pt-br');

    document.getElementById("data").innerHTML= 'Data: '+dataFormatada;
    document.getElementById("horario").innerHTML = 'Horario: '+horaFormatada;
}

setInterval(dataHora, 1000);

async function montaGraf(){

    const moedab = base.value;
    const moeda2 = conv.value;
    const duracao = Number(document.getElementById("selectGraph").value);
    console.log(`${moedab};${moeda2};${duracao}`);

    const arr = new Array(duracao);
    const percent = 100/duracao;
    grafico.style.gridTemplateColumns = `repeat(${duracao}, ${percent.toFixed(4)-0.0001}%)`;

    if(duracao!=7&&duracao!=15){
        grafico.style.gridTemplateColumns = `repeat(${duracao}, ${percent.toFixed(4)-0.0001}%)`;
        grafico.style.gap = 0;
    } else {
        grafico.style.gridTemplateColumns = `repeat(${duracao}, ${(percent.toFixed(4)/3)*2}%)`;
        grafico.style.gap = `${percent.toFixed(4)/3}%`;
    }

//Adiciona gap entre as divs do grafico quando em 15 ou 7 dias;


    
    let maior = 0;

    try {
        const resposta = await fetch("https://economia.awesomeapi.com.br/json/daily/"+`${moedab}-${moeda2}/${duracao}`);
    
        const dados = await resposta.json();
        console.log(dados);
        
        
        if(resposta.status!=200){
            throw resposta.status;
        }
        let index = arr.length-1;
        dados.forEach((dia) => {
            const bid = dia.bid;
            if(bid>0){
                arr[index]=bid*100;
            }
            if(arr[index]>maior){
                maior = arr[index];
            }
            index--;
        })
        console.log(arr);
        
        grafico.innerHTML = '';
        for(i=0;i<arr.length;i++){
            arr[i] = (arr[i]*100)/maior;
        }
        for(i=0;i<arr.length;i++){
            
            const barra = document.createElement("div");
            barra.className = "barra";
            barra.style.height = `${arr[i]}%`;
            grafico.appendChild(barra);
        }

        console.log(arr);
       
    
    } catch (error){
        console.log('erro de conexao: '+error);
    }

}

function restrict(tis) {
  var prev = tis.getAttribute("data-prev");
  prev = (prev != '') ? prev : '';
  if (Math.round(tis.value*100)/100!=tis.value)
  tis.value=prev;
  tis.setAttribute("data-prev",tis.value)
}

moedas.forEach((moeda)=>{
    const escolha = document.createElement("option");
    escolha.value = moeda;
    escolha.innerHTML = moeda;
    base.add(escolha);
    base.value = 'BRL';
})

moedas.forEach((moeda)=>{
    const escolha = document.createElement("option");
    const band = moeda.substring(0, 2);
    escolha.value = moeda;
    escolha.innerHTML = moeda;
    conv.add(escolha);
    conv.value = 'USD';
})

//setInterval(countdown, 1000);


function changeF(inp){
    let string
    if(inp=='flaginp'){
        string = base.value;
    } else {
        string = conv.value;
    }
    
    const novaBand = string.substring(0, 2);

    if(novaBand=="EU"){
        const novoSrc = `./Images/Flag_of_Europe.svg.png`;
        document.getElementById(inp).src = novoSrc;
        document.getElementById(inp).style.height = "1.8rem";
    } else {
        const novoSrc = `https://flagsapi.com/${novaBand}/flat/64.png`
        document.getElementById(inp).src = novoSrc;
        document.getElementById(inp).style.height = "2.5rem";
    }
}
let counttimer = 30;

function countdown(){
    if(counttimer==0){
        converter();
        counttimer = 30;
    } else{

        counttimer -= 1;
    }

    document.getElementById('timer').innerHTML = `Taxas de conversão serão recarregadas em ${counttimer}s`;


}

async function teste(coin, coin2, quantia) {
    if(coin===coin2){
        const valor = Number(quantia);
        conversao.value = valor.toFixed(2);
        document.getElementById("rates").innerHTML = `1 ${coin} = 1 ${coin2}`
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
            
            document.getElementById("rates").innerHTML = `1 ${coin} = ${dados.rates[coin2]} ${coin2}`
        
        } catch (error){
            console.log('erro de conexao: '+error);
        }
    }
    
} 

function converter(){
    if(quantidade.value <0){
        quantidade.value = 0;
        //quantidade.value = truncar2pos(Number(quantidade.value));
    } else {
        //quantidade.value = truncar2pos(Number(quantidade.value));
    }
    
    const baseNum = base.value;
    const convNum = conv.value;
    const quant = quantidade.value;
    teste(baseNum, convNum, quant);
   

}

function truncar2pos(x){
    x = Math.floor(x * 100) / 100;
    return(x.toFixed(2));
}

function convInsta(){
    if(quantidade.value<0){
        quantidade.value = 0;
    } /* else if(truncar2pos(Number(quantidade.value))<Number(quantidade.value).toFixed(3)) {
        quantidade.value = truncar2pos(Number(quantidade.value));
    }  */

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


function troca(){
    let aux = base.value;
    base.value = conv.value;
    conv.value = aux;

    changeF("flaginp");
    changeF("flagresp");

    /* aux = document.getElementById('flaginp').src;
    document.getElementById('flaginp').src = document.getElementById('flagresp').src;
    document.getElementById('flagresp').src = aux; */

    converter();
}


