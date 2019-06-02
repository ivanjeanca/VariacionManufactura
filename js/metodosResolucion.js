function tiempoDeCiclo(){
    var ro = 0, c = 0, p0 = 0;
    var error = false;
    var campos = "";

    if(document.getElementById("ro").value != "")
        ro = parseInt(document.getElementById("ro").value);
    else {
        error = true;
        campos = campos + "[ρ], "
    }
    
    if(document.getElementById("c").value != "")
        c = parseInt(document.getElementById("c").value);
    else {
        error = true;
        campos = campos + "[c], "
    }
    
    if(document.getElementById("p0").value != "")
        p0 = parseInt(document.getElementById("p0").value);
    else {
        error = true;
        campos = campos + "[P<small class=\"resultado-texto-sub\">0</small>], "
    }

    var resultado = ((potencia(ro, (c + 1))) / ((factorial(c - 1)) * (potencia((c - ro), 2)))) * p0;

    if(!error)
        document.getElementById("res").innerHTML = "<strong>Resultado:<br>" + resultado + "</strong>";
    else{
        var errtxt = "";
        for (let i = 0; i < campos.length-2; i++) 
            errtxt = errtxt + campos.charAt(i);
        document.getElementById("res").innerHTML = "<strong>Error:</strong><br>Campo/s <strong>" + errtxt + ",</strong> vacío/s.";
    }
}