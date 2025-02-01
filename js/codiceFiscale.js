const stati = '/csv/listaStati.csv';
const comuni = '/csv/listaComuni.csv';
const province = '/csv/listaProvince.csv';

function datiCF() {
    let nome = document.forms["datiCF"]["inputNome"].value.toUpperCase();
    let cognome = document.forms["datiCF"]["inputCognome"].value.toUpperCase();
    let data = document.forms["datiCF"]["inputData"].value;
    let sesso = document.forms["datiCF"]["inputSesso"].value;
    let stato = document.forms["datiCF"]["inputStato"].value;
    let comune = document.forms["datiCF"]["inputComune"].value;

    var CF = puliziaNome(cognome) + puliziaNome(nome) + dataNascita(data, sesso) + stato;
    CF += controlloNumerico(CF);
    console.log(CF);
}

function puliziaNome(str) {

    var retVal = "";
    var cons = str.replace(/[AEIOU]/g, '');
    var voc = str.replace(/[^AEIOU]/g, '');

    retVal += cons + voc + "XXX";

    return retVal.slice(0, 3);
}

function dataNascita(data, sesso) {

    const mesi = ['A', 'B', 'C', 'D', 'E', 'H', 'L', 'M', 'P', 'R', 'S', 'T'];

    const campidata = data.split("-");
    const anno = campidata[0];
    const mese = parseInt(campidata[1], 10);
    let giorno = parseInt(campidata[2], 10);

    if (sesso === "F")
        giorno += 40;


    const retVal = anno.slice(2) + mesi[mese - 1] + giorno.toString().padStart(2, '0');

    return retVal;
}

function letturaCSV(str) {
    var retVal;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', str, false);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var csvContent = xhr.responseText;
            const rows = csvContent.split('\n');
            const data = rows.map(row => row.split(';'));
            console.log(data);
            retVal = data;
        }
    };

    xhr.send();
    return retVal;
}

function caricaStati()
{
    letturaCSV(stati).forEach(element => {
        if(element[0] == "Stato(S)/Territorio(T)")
            console.log("Caricamento stati...")
        else
            document.getElementById("inputStato").innerHTML += '<option value="'+ element[9] +'">'+element[6]+'</option>'
    });
}

function caricaComuni()
{
    letturaCSV(comuni).forEach(element => {
        if(element[0] == "Stato(S)/Territorio(T)")
            console.log("Caricamento comuni...")
        else
            document.getElementById("inputComune").innerHTML += '<option value="'+ element[0] +'">'+element[2]+'</option>'
    });
}

function caricaProvince()
{
    letturaCSV(province).forEach(element => {
        element[0] = element[0].replace(/\r/g, "")
        if(element == "Sigla Provincia")
            console.log("Caricamento province...")
        else
            document.getElementById("inputProvincia").innerHTML += '<option value="'+ element[0] +'">'+element[0]+'</option>'
    });
}

function controlloNumerico(codiceFiscale) {
    const valori = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const pesi = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1];
    
    let somma = 0;
    for (let i = 0; i < codiceFiscale.length; i++) {
      const carattere = codiceFiscale[i].toUpperCase();
      let valore;
  
      if ('0' <= carattere && carattere <= '9') {
        valore = parseInt(carattere, 10);
      } else {
        valore = carattere.charCodeAt(0) - 65 + 10;
      }
  
      somma += valore * pesi[i % pesi.length];
    }
    
    const resto = somma % 26;
    const cifraControllo = valori[resto];
    return cifraControllo;
  }