function generar(){
    var estaciones = 0
    var error = false
    var tabla = "", TSCTa = "", Final = ""

    document.getElementById("datos").innerHTML = ""

    if (document.getElementById("estaciones").value != "")
        estaciones = parseInt(document.getElementById("estaciones").value)
    else
        error = true
    error = (estaciones > 1) ? false : true

    tabla = '<label class="variable lead">P</label><table class="matriz">'
    for (let i = 1; i <= estaciones; i++) {
        tabla = tabla + '<tr>'
        for (let j = 1; j <= estaciones; j++) {
            tabla = tabla + '<td><input type="number" id="P' + i + j + '" class="campo campo-tabla" min=0 max=1 step=0.01></td>'
        }
        tabla = tabla + '</tr>'
    }
    tabla = tabla + '</table><br>'

    TSCTa = '<div class="row">'
    for (let i = 1; i <= estaciones; i++) 
        TSCTa = TSCTa + '<div class="col-sm-4"><label class="variable variableTSC lead">Ts<small class="sub">' + i + '</small></label><input type="number" id="Ts' + i + '" class="campo campoTSC"></div><div class="col-sm-4"><label class="variable variableTSC lead">C<small class="sub">' + i + '</small></label><input type="number" id="C' + i + '" class="campo campoTSC"></div><div class="col-sm-4"><label class="variable variableTSC lead">γ<small class="sub">' + i + '</small></label><input type="number" id="gama' + i + '" class="campo campoTSC"></div>'
    TSCTa = TSCTa + '</div><br>'

    Final = '<br><br><button class="btn lead" onclick="resolver()">Resolver</button>'

    if(!error){
        document.getElementById("datos").innerHTML = '<br><hr class="separador">' + tabla + '<hr class="separador">' + TSCTa + '<hr class="separador">' + Final
        document.getElementById("res").innerHTML = "Inserta los datos correspondientes en cada campo y despues da click en <strong><em>Resolver.</em></strong>"
    }else
        document.getElementById("res").innerHTML = "<strong>Error:</strong><br>El <Strong>[número de estaciones]</strong> es incorrecto."
}

function resolver(){
    let error = false
    let camposVacios = "", camposIncorrectos = "", errorMatematico = "", resLambda = "", resMi = "", resRo = "", resTCq = "", resTCs = "", resWIP = "", resTCglobal = ""
    let estaciones = 0, WIPglobal = 0, TCglobal = 0, gamaTotal = 0, aux = 0
    let mi = [], C = [], gama = [], lambda = [], ro = [], TCq = [], TCs = [], Ts = [], WIP = []
    const Cs = 1

    if (document.getElementById("estaciones").value != "")
        estaciones = parseInt(document.getElementById("estaciones").value);
    else
        error = true;

    let P = crearMatrizCuadrada(estaciones)

    for (let i = 1; i <= estaciones; i++) {
        for (let j = 1; j <= estaciones; j++) {
            if(document.getElementById("P" + i + j).value != ""){
                aux = parseFloat(document.getElementById("P" + i + j).value)
                if(aux >= 0 && aux <= 1)
                    P[i - 1][j - 1] = aux;
                else {
                    error = true;
                    camposIncorrectos = camposIncorrectos + '[P<small class="resultado-texto-sub">' + i + j + '</small>], '
                }
            } else {
                error = true;
                camposVacios = camposVacios + '[P<small class="resultado-texto-sub">' + i + j + '</small>], '
            }
        }
    }

    for (let i = 0; i < estaciones; i++) {
        aux = 0;
        for (let j = 0; j < estaciones; j++) {
            aux += P[i][j];
            if (aux > 1) {
                error = true
                camposIncorrectos += "[Suma de fila " + (i + 1) + " de la matriz > 1], "
            }
        }   
    }

    console.log("P")
    console.table(P)
    console.log("M. I.")
    console.table(matrizIdentidad(P.length))
    console.log("PT")
    console.table(transpuesta(P))
    console.log("M.I. - PT")
    console.table(restaMatrices(matrizIdentidad(P.length), transpuesta(P)))
    console.log("[M.I. - PT] ^ -1")
    console.table(matrizInversa(restaMatrices(matrizIdentidad(P.length), transpuesta(P))))


    for (let i = 1; i <= estaciones; i++) {
        if(document.getElementById("Ts" + i).value != ""){
            aux = parseFloat(document.getElementById("Ts" + i).value)
            mi[i - 1] = 1 / aux
            Ts[i - 1] = aux
        } else {
            error = true;
            camposVacios = camposVacios + '[Ts<small class="resultado-texto-sub">' + i + '</small>], '
        }
    }
    for (let i = 1; i <= mi.length; i++) 
        resMi += '<strong>μ</strong><small class="sub">' + i + '</small> = ' + mi[i - 1] + "<br>"
    
    for (let i = 1; i <= estaciones; i++) {
        if(document.getElementById("C" + i).value != ""){
            aux = parseFloat(document.getElementById("C" + i).value)
            if(aux > 0)
                C[i - 1] = aux
            else {
                error = true;
                camposIncorrectos = camposIncorrectos + '[C<small class="resultado-texto-sub">' + i + '</small>], '
            }
        } else {
            error = true;
            camposVacios = camposVacios + '[C<small class="resultado-texto-sub">' + i + '</small>], '
        }
    }

    for (let i = 1; i <= estaciones; i++) {
        if(document.getElementById("gama" + i).value != ""){
            aux = parseFloat(document.getElementById("gama" + i).value)
            if(aux >= 0)
                gama[i - 1] = aux;
            else {
                error = true;
                camposIncorrectos = camposIncorrectos + '[γ<small class="resultado-texto-sub">' + i + '</small>], '
            }
        } else {
            error = true;
            camposVacios = camposVacios + '[γ<small class="resultado-texto-sub">' + i + '</small>], '
        }
    }

    lambda = multiplicacionMatrizVector(matrizInversa(restaMatrices(matrizIdentidad(P.length), transpuesta(P))), gama)
    for (let i = 1; i <= lambda.length; i++) 
        resLambda += '<strong>λ</strong><small class="sub">' + i + '</small> = ' + lambda[i - 1] + "<br>"

    console.table(lambda)


    for (let i = 1; i <= estaciones; i++) {
        ro[i - 1] = (lambda[i - 1]) / (C[i - 1] * mi[i - 1])
        if(ro[i - 1] === 1){
            errorMatematico = '<strong>[ρ<small class="resultado-texto-sub">' + i + '</small>] = 1,</strong> (division entre 0), '
            error = true
        }
        resRo += '<strong>ρ</strong><small class="sub">' + i + '</small> = ' + ro[i - 1] + "<br>"
    }

    for(let i = 1; i <= estaciones; i++){
        TCq[i - 1] = ((potencia(Cs, 2) + potencia(Cs, 2)) / 2) * (ro[i - 1] / (1 - ro[i - 1])) * (ro[i - 1] / (1 + ro[i - 1])) * promedio(Ts)
        resTCq += '<strong>TC</strong><small class="sub">q' + i + '</small> = ' + TCq[i - 1] + "<br>"
    }

    for(let i = 1; i <= estaciones; i++){
        TCs[i - 1] = Ts[i - 1] + TCq[i - 1]
        resTCs += '<strong>TC</strong><small class="sub">s' + i + '</small> = ' + TCs[i - 1] + "<br>"
    }

    for(let i = 1; i <= estaciones; i++){
        WIP[i - 1] = lambda[i - 1] * TCs[i - 1]
        resWIP += '<strong>WIP</strong><small class="sub">' + i + '</small> = ' + WIP[i - 1] + "<br>"
    }

    for (let i = 0; i < WIP.length; i++)
        WIPglobal += WIP[i]
    resWIPglobal = '<strong>WIP</strong><small class="sub">global</small> = ' + WIPglobal

    for (let i = 0; i < gama.length; i++) 
        gamaTotal += gama[i]

    TCglobal = WIPglobal * gamaTotal
    resTCglobal = '<strong>TC</strong><small class="sub">global</small> = ' + TCglobal

    if(!error){
        document.getElementById("res").innerHTML = '<strong>Resultado:</strong><br><br><div class="row"><div class="col-sm-4 text-left">' + resMi + '</div><div class="col-sm-4 text-left">'  + resLambda + '</div><div class="col-sm-4 text-left">'+ resRo + '</div></div><hr><div class="row"><div class="col-sm-4 text-left">' + resTCq + '</div><div class="col-sm-4 text-left">' + resTCs + '</div><div class="col-sm-4 text-left">' + resWIP + '</div></div><hr><div class="row"><div class="col-sm-2 text-left"></div><div class="col-sm-4 text-left">' + resWIPglobal + '</div><div class="col-sm-4 text-left">' + resTCglobal + '</div><div class="col-sm-2 text-left"></div></div>';
    }else{
        let vacios = "", incorrectos = "", matematico = "", errores = ""
        for (let i = 0; i < camposVacios.length-2; i++) 
            vacios = vacios + camposVacios.charAt(i)
        for (let i = 0; i < camposIncorrectos.length-2; i++)
            incorrectos = incorrectos + camposIncorrectos.charAt(i)
        for (let i = 0; i < errorMatematico.length-2; i++)
            matematico = matematico + errorMatematico.charAt(i)

        if(vacios.length > 0) 
            errores += "<br>Campo/s <strong>" + vacios + "</strong> vacío/s."
        
        if(incorrectos.length > 0)
            errores += "<br>Campo/s <strong>" + incorrectos + "</strong> incorrectos/s."

        if(matematico.length > 0)
            errores += "<br>" + matematico + "."

        document.getElementById("res").innerHTML = "<strong>Error:</strong>" + errores
    }
}