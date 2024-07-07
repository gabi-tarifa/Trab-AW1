listAlunMedia = [];
listNotas = [];

function addNotas(){
    inNota = document.getElementById("inNota");
    nota = Number(inNota.value);
    if(nota < 0 || nota > 10 || isNaN(nota)){
        alert("Insira uma nota válida...");
        inNota.value = "";
        return;
    } else {
        listNotas.push(nota);
        inNota.value = "";
    }
    alert(listNotas);
}
var btAddNota = document.getElementById("btAddNota");
btAddNota.addEventListener("click", addNotas);

function calcularMedia(){
    
}