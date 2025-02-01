function controlloStato() {
    if ( document.getElementById("inputStato").value == "n.d.") {
        document.getElementById("CodiceProvincia").style.visibility = "visible";
        document.getElementById("CodiceProvincia").style.display = "block";

        document.getElementById("CodiceComune").style.visibility = "visible";
        document.getElementById("CodiceComune").style.display = "block";
    } else {
        document.getElementById("CodiceProvincia").style.visibility = "hidden";
        document.getElementById("CodiceProvincia").style.display = "none";

        document.getElementById("CodiceComune").style.visibility = "hidden";
        document.getElementById("CodiceComune").style.display = "none";
    }
}
