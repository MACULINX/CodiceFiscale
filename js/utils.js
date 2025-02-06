function controlloStato() {
    if (document.getElementById("inputStato").value == "n.d.") {
        mostraHTML("CodiceProvincia");
        caricaProvince();
    } else {
        nascondiHTML("CodiceProvincia");
        nascondiHTML("CodiceComune");
    }
}

function controllaProvincia() {
    if (document.getElementById("CodiceProvincia").value != "null") {
        document.getElementById("inputComune").innerHTML = '<option selected disabled value="none">Scegliere il comune di nascita</option>'

        mostraHTML("CodiceComune");
        caricaComuni();
    } else
        nascondiHTML("CodiceComune");
}

function controlloData() {
    let oggi = new Date();
    let giornoIns = new Date(document.forms[form]["inputData"].value)

    if (giornoIns > oggi)
        document.forms[form]["inputData"].value = oggi.toISOString().split("T")[0];
}

function nascondiHTML(s) {
    document.getElementById(s).style.visibility = "hidden";
    document.getElementById(s).style.display = "none";
}

function mostraHTML(s) {
    document.getElementById(s).style.visibility = "visible";
    document.getElementById(s).style.display = "block";
}

function mostraRis(s, val) {
    const modal = new bootstrap.Modal(s);

    document.getElementById("labelResult").innerText = "Risultato dell'operazione";
    document.getElementById("result").innerHTML = 'Il codice fiscale richiesto è: ' + val;

    modal.show();
}

function mostraErrore(s) {
    const modal = new bootstrap.Modal(s);

    document.getElementById("labelResult").innerText = "Errore!";
    document.getElementById("result").innerHTML = "Si prega di inserire tutti i dati richiesti";

    modal.show();
}

function cambiaTema(value) {
    if (value) {
        document.body.setAttribute('data-bs-theme', 'dark');
        document.getElementById("brightness-icon").className = "bi-moon";
    }
    else {
        document.body.setAttribute('data-bs-theme', 'light');
        document.getElementById("brightness-icon").className = "bi-sun";
    }
}