var listAlunMedia = [];
var listNotas = [];
var listPesos = [];

var textoNotas = "";

function addNotas(){
    var rdMediaArit = document.getElementById("rdMediaArit");
    var rdMediaPond = document.getElementById("rdMediaPond");
    var rdSomaSimp = document.getElementById("rdSomaSimp");

    var mediaAritmetica = rdMediaArit.checked;
    var mediaPonderada = rdMediaPond.checked;
    var somaSimples = rdSomaSimp.checked;

    var outNotas = document.getElementById("outNotas");
    var inNota = document.getElementById("inNota");
    var inPeso = document.getElementById("inPeso");

    var nota = Number(inNota.value);
    var peso = Number(inPeso.value);


    if(!mediaAritmetica && !mediaPonderada && !somaSimples) {
        alert("Insira o tipo de média que será usada...");
        return;
    }


    if(nota < 0 || nota > 10 || isNaN(nota)){
        alert("Insira uma nota válida...");
        inNota.value = "";
        inNota.focus();
        return;
    } else {
        listNotas.push(nota);
        inNota.value = "";
        if (mediaAritmetica || somaSimples) {
            if (listNotas[1] == null) {
                textoNotas += nota.toFixed(2);
            } else {
                textoNotas += " + " + nota.toFixed(2) ;
            }
        }
    }
    if (mediaAritmetica){ 
        outNotas.textContent = "Média = " + textoNotas + " / " + listNotas.length;
    } else if (somaSimples){
        outNotas.textContent = "Média = " + textoNotas;
    } else {
        if(isNaN(peso) || peso > 99 || peso < 1){
            alert("Insira um peso válido...");
            return;
        } else {
            listPesos.push(peso);
            inPeso.value = "";
            textoMediaPond();
        }
    }
}
var btAddNota = document.getElementById("btAddNota");
btAddNota.addEventListener("click", addNotas);

function calcularMedia(){
    var inAluno = document.getElementById("inAluno");
    var rdMediaArit = document.getElementById("rdMediaArit");
    var rdMediaPond = document.getElementById("rdMediaPond");
    var rdSomaSimp = document.getElementById("rdSomaSimp");
    var outListAlunMedias = document.getElementById("outListAlunMedias");
    var outNotas = document.getElementById("outNotas");

    var aluno = inAluno.value;
    var somaSimples = rdSomaSimp.checked;
    var mediaAritmetica = rdMediaArit.checked;
    var mediaPonderada = rdMediaPond.checked;
    var media = 0;
    var texto = "";

    if (aluno == "") {
        alert("Insira um aluno a receber nota...");
        return;
    }

    var somaNotas = 0;
    if (mediaAritmetica){
        for (var x = 0; x < listNotas.length; x++) {
            somaNotas += listNotas[x];
        }
        media = somaNotas/listNotas.length;
    } else if (somaSimples){
        for (var x = 0; x < listNotas.length; x++){
            media += listNotas[x];
            if (media < 0 || media > 10) {
                alert("Aviso!! Não era suposto para a média ser algum valor que não entre 0 e 10!");
                return;
            }
        }
    } else if (mediaPonderada) {
        var somaPesos = 0;
        var calcPesos = 0;
        for (var x = 0; x < listPesos.length; x++){
            somaPesos += listPesos[x];
        }
        if (somaPesos == 100){
            for (var x = 0; x < listNotas.length; x++){
                calcPesos = listNotas[x] * listPesos[x] / 100;
                media += calcPesos;
            }
        } else {
            alert("A soma dos pesos não resulta em 100%...");
            return;
        }
    } else {
        alert("Selecione um dos tipos de média e tente novamente...");
        return;
    }
    if(isNaN(media)){
        alert("Insira notas para que haja o cálculo da média...");
        return;
    }
    listAlunMedia.push({aluno: aluno, media: media});
    listAlunMedia = listAlunMedia.sort(element => element.aluno == aluno);
    
    for (var y = 0; y < listAlunMedia.length; y++){
        texto += listAlunMedia[y].aluno + " - " + listAlunMedia[y].media.toFixed(2);
    }
    inAluno.value = "";
    outListAlunMedias.textContent = texto + " \n";
    outNotas.textContent = "Média = ";

    textoNotas = "";
    listNotas = [];
    listPesos = [];
}
var btCalcMedia = document.getElementById("btCalcMedia");
btCalcMedia.addEventListener("click", calcularMedia);

function removerNota(){
    var rdMediaArit = document.getElementById("rdMediaArit");
    var rdMediaPond = document.getElementById("rdMediaPond");
    var rdSomaSimp = document.getElementById("rdSomaSimp");
    var outNotas = document.getElementById("outNotas");

    var mediaAritmetica = rdMediaArit.checked;
    var mediaPonderada = rdMediaPond.checked;
    var somaSimples = rdSomaSimp.checked;
    textoNotas = "";

    if(listNotas == "") {
        alert("Não há notas para serem retiradas...");
        return;
    }
    if(mediaAritmetica || somaSimples) {
        listNotas.pop();
        alert("Nota removida com sucesso!!");
    } else if(mediaPonderada) {
        listNotas.pop();
        listPesos.pop();
        alert("Nota e peso removidos com sucesso!!");
    }
    for(x = 0; x < listNotas.length; x++){
        if (mediaAritmetica || somaSimples) {
            if (x == 0) {
                textoNotas += listNotas[x].toFixed(2);
            } else {
                textoNotas += " + " + listNotas[x].toFixed(2) ;
            }
        } else {
            break;
        }
    }
    if (mediaAritmetica){ 
        outNotas.textContent = "Média = " + textoNotas + " / " + listNotas.length;
    } else if (somaSimples){
        outNotas.textContent = "Média = " + textoNotas;
    } else {
        if(isNaN(peso) || peso > 99 || peso < 1){
            alert("Insira um peso válido...");
            return;
        } else {
            textoMediaPond();
        }
    }
}
var btRemovNota = document.getElementById("btRemovNota");
btRemovNota.addEventListener("click", removerNota);

function removerAluno(){
    var inAluno = document.getElementById("inAluno");
    var outListAlunMedias = document.getElementById("outListAlunMedias");
    
    var texto = "";
    var aluno = inAluno.value;

    if(listAlunMedia.find(element => element.aluno === aluno) == undefined) {
        alert("Não há um aluno com esse nome para remover nota. Tente outro nome...");
        inAluno.value = "";
        inAluno.focus();
        return;
    } else {
        listAlunMedia.splice(listAlunMedia.findIndex(element => element.aluno === aluno), 1);
        alert("Aluno removido com sucesso!!");
    }

    for (var x = 0; x < listAlunMedia.length; x++){
        texto += listAlunMedia[x].aluno + " - " + listAlunMedia[x].media.toFixed(2) + " \n";
    }
    inAluno.value = "";
    outListAlunMedias.textContent = texto;

    textoNotas = "";
    listNotas = [];
    listPesos = [];
}
var btRemovMedia = document.getElementById("btRemovMedia");
btRemovMedia.addEventListener("click", removerAluno);

function textoMediaPond(){
    outNotas = document.getElementById("outNotas");
    
    var texto = ""

    for (var x = 0; x < listNotas.length; x++) {
        if (x == 0) {
            texto += listNotas[x].toFixed(2) + " * " + (listPesos[x]/100);
        } else {
            texto +=" + " + listNotas[x].toFixed(2) + " * " + (listPesos[x]/100);
        }
    }
    outNotas.textContent = "Média = " + texto;
}

function checarRadio(){
    var rdMediaPond = document.getElementById("rdMediaPond");
    var inPeso = document.getElementById("inPeso");
    var textoPesos = document.getElementById("textoPesos");
    
    mediaPonderada = rdMediaPond.checked;

    if (mediaPonderada) {
        inPeso.className = "exibe";
        textoPesos.className = "exibe";
    } else {
        inPeso.className = "oculta";
        textoPesos.className = "oculta";
    }
}
setInterval(checarRadio, 1);