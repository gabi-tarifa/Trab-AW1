var listAlunMedia = [];
var listNotas = [];
var listPesos = [];

var contador = 0;

function addNotas(){
    var rdMediaArit = document.getElementById("rdMediaArit");
    var rdMediaPond = document.getElementById("rdMediaPond");
    var rdSomaSimp = document.getElementById("rdSomaSimp");

    var mediaAritmetica = rdMediaArit.checked;
    var mediaPonderada = rdMediaPond.checked;
    var somaSimples = rdSomaSimp.checked;

    var outNotas = document.getElementById("outNotas");
    var inNota = document.getElementById("inNota");

    var texto = "";

    var nota = Number(inNota.value);

    if(!mediaAritmetica && !mediaPonderada && !somaSimples) {
        alert("Insira o tipo de média que será usada...");
        return;
    }


    if(nota < 0 || nota > 10 || isNaN(nota)){
        alert("Insira uma nota válida...");
        inNota.value = "";
        return;
    } else {
        listNotas.push(nota);
        inNota.value = "";
        if (mediaAritmetica || somaSimples) {
            if (listNotas[1] == null) {
                texto += nota.toFixed(2);
            } else {
                texto += " + " + nota.toFixed(2) ;
            }
        } else {
            if (listNotas.length == listPesos.length) {
                if (listNotas[1] == null && listPesos[1] == null) {
                    texto += nota.toFixed(2);
                } else {
                    texto += " + " + nota.toFixed(2) ;
                }
            }
        }
    }
    if (mediaAritmetica){ 
        outNotas.textContent = "Média = " + texto + " / " + listNotas.length;
    } else if (somaSimples){
        outNotas.textContent = "Média = " + texto;
    } else {
        textoMediaPond;
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

    var aluno = inAluno.value;
    var somaSimples = rdSomaSimp.checked;
    var mediaAritmetica = rdMediaArit.checked;
    var mediaPonderada = rdMediaPond.checked;
    var media = 0;
    var texto = "";

    var somaNotas = 0;
    if (mediaAritmetica){
        for (var x = 0; x < listNotas.length; x++) {
            somaNotas += listNotas[x];
        }
        media = somaNotas/listNotas.length;
    } else if (mediaPonderada){

    } else if (somaSimples){
        for (var x = 0; x < listNotas.length; x++){
            media += listNotas[x];
            if (media < 0 && media > 10) {
                alert("Aviso!! Não era suposto para a média ser algum valor que não entre 0 e 10!");
                return;
            }
        }
    } else {
        alert("Selecione um dos tipos de média e tente novamente...");
        return;
    }
    listAlunMedia.push({aluno: aluno, media: media});
    listAlunMedia.sort(element => element.nome === aluno);
    
    for (var y = 0; y < listAlunMedia.length; y++){
        texto += listAlunMedia[y].aluno + " - " + listAlunMedia[y].media.toFixed(2) + " \n";
    }
    inAluno.value = "";
    outListAlunMedias.textContent = "Aluno - Média \n" + texto;

    contador = 0;
}
var btCalcMedia = document.getElementById("btCalcMedia");
btCalcMedia.addEventListener("click", calcularMedia);

function removerAluno(){
    inAluno = document.getElementById("inAluno");
    
    aluno = inAluno.value;

    if(listAlunMedia.find(element => element.nome === aluno) == undefined) {
        alert("Não há um aluno com esse nome para remover nota. Tente outro nome...");
        inAluno.value = "";
        inAluno.focus();
        return;
    } else {
        listAlunMedia.splice(listAlunMedia.indexOf(aluno), 1);
        alert("Aluno removido com sucesso!!");
    }
}
var btRemovMedia = document.getElementById("btRemovMedia");
btRemovMedia.addEventListener("click", removerAluno);

function addPeso(){
    var inPeso = document.getElementById("inPeso");

    var peso = inPeso.value;

    listPesos.push(peso);
    inPeso.value = "";

    textoMediaPond();
}
var btAddPeso = document.getElementById("btAddPeso");
btAddPeso.addEventListener("click", addPeso);

function textoMediaPond(){
    outNotas = document.getElementById("outNotas");
    texto = "Média = ";

    for(var x = 0; x < listNotas.length; x++){
        if(listNotas.length == listPesos.length){
            if (x = 0 && listPesos[x] != null) {
                texto += listNotas[x].toFixed(2) + " * " + listPesos[x]/100;
            } else if (x = 0 && listPesos[x] == null){
                texto += listNotas[x].toFixed(2) + " * ___ ";
            } else if (x != 0 && listPesos[x] != null) {
                texto += listNotas[x].toFixed(2) + " * " + listPesos[x]/100;
            } else {
                texto += listNotas[x].toFixed(2) + " * ___";
            }
        } else {
        alert("A quantidade de pesos em relação à quantidade de nota não são iguais...");
        return;
        }
    } 
    outNotas.textContent = texto;
}

function checarRadio(){
    var rdMediaPond = document.getElementById("rdMediaPond");
    var btRemovPeso = document.getElementById("btRemovPeso");
    var btAddPeso = document.getElementById("btAddPeso");
    var inPeso = document.getElementById("inPeso");
    var textoPesos = document.getElementById("textoPesos");
    
    mediaPonderada = rdMediaPond.checked;

    if (mediaPonderada) {
        btRemovPeso.className = "exibe";
        btAddPeso.className = "exibe";
        inPeso.className = "exibe";
        textoPesos.className = "exibe";
    } else {
        btRemovPeso.className = "oculta";
        btAddPeso.className = "oculta";
        inPeso.className = "oculta";
        textoPesos.className = "oculta";
    }
}
setInterval(checarRadio, 1);