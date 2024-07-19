var listAlunMedia = [];
var listNotas = [];
var listPesos = [];

var texto = "";

function addNotas(){
    var rdMediaArit = document.getElementById("rdMediaArit");
    var rdMediaPond = document.getElementById("rdMediaPond");
    var rdSomaSimp = document.getElementById("idSomaSimp");

    var mediaAritmetica = rdMediaArit.checked;
    var mediaPonderada = rdMediaPond.checked;
    var somaSimples = rdSomaSimp.checked;

    var outNotas = document.getElementById("outNotas");
    var inNota = document.getElementById("inNota");


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
                texto += nota;
            } else {
                texto += " + " + nota ;
            }
        }
}
    if (mediaAritmetica){ 
        outNotas.textContent = "Média = " + texto + " / " + listNotas.length;
    } else if (somaSimples){
        outNotas.textContent = "Média = " + texto;
    } else {
        outNotas.textContent = "Média = ";
    }
}
var btAddNota = document.getElementById("btAddNota");
btAddNota.addEventListener("click", addNotas);

function calcularMedia(){
    var inAluno = document.getElementById("inAluno");
    var rdMediaArit = document.getElementById("rdMediaArit");
    var rdMediaPond = document.getElementById("rdMediaPond");
    var rdSomaSimp = document.getElementById("rdSomaSimp");

    var aluno = inAluno.value;
    var somaSimples = rdSomaSimp.checked;
    var mediaAritmetica = rdMediaArit.checked;
    var mediaPonderada = rdMediaPond.checked;
    var media = 0;

    var somaNotas = 0;
    if (mediaAritmetica){
        for (var x = 0; x < listNotas.length; x++) {
            somaNotas += listNotas[x];
            if (x != listNotas.length-1)
                texto += listNotas[x] + " + ";
            else
                texto += listNotas[x];
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
    }
}
btRemovMedia = document.getElementById("btRemovMedia");
btRemovMedia.addEventListener("click", removerAluno);