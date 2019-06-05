function potencia(numero, potencia){
    let pot = numero;
    for (let i = 1; i < potencia; i++) 
        pot = pot * numero;  
    return pot
}

function factorial(numero){
    let fac = numero;
    let res = 1;
    while(fac > 0){
        res = res * fac;
        fac--
    }
    return res
}

function promedio(arreglo){
    let suma = 0
    for (let i = 0; i < arreglo.length; i++) 
        suma += arreglo[i]
    suma = suma / arreglo.length
    return suma
}

//mtx = [[1, 2], [-2, 3]]
//mtx = [[1, -1, 2], [-2, 0, 4], [0, -2, 7]] // Determinante = 2
//mtx = [[1, 0, -1], [5, 1, 0], [2, 4, 5]]
//mtx = [[1,4,4],[-1,3,-2],[-2,2,3]] // Determinante = 57
//mtx = [[1, 2, 1, -2], [3, -1, -1, 1], [2, -1, 2, -4], [4, -3, -2, 1]]
//mtx = [[1,2,2,1],[1,2,4,2],[2,7,5,2],[-1,4,-6,3]]
//mtx = [[0,4,-2,4],[-6,2,10,0],[5,8,-5,2],[0,-2,1,0]] // Determinante = 392
//mtx = [[1,0,3,1],[4,1,0,2],[2,1,1,1],[0,5,3,5]]
//mtx = [[-6,10,0],[5,-5,2],[0,1,0]] // Determinante = 12
//mtx = [[-6,2,0],[5,8,2],[0,-2,0]] // Determinante = -24
//mtx = [[-6,2,10],[5,8,-5],[0,-2,1]] // Determinante = -98
//mtx = [[2,1,5,-1,6],[1,4,0,3,7],[1,0,0,-7,9],[3,2,1,0,8],[1,1,0,3,4]] // Determinante = -1104
//mtx = [[1,-3,0,-2],[3,-12,-2,-6],[-2,10,2,5],[-1,6,1,3]]

//console.log("Matriz", mtx)
//console.log("Matriz Identidad", matrizIdentidad(mtx.length))
//console.log("Transpuesta", transpuesta(mtx))
//console.log("AdjA", matrizAdyacencia(mtx))
//console.log("Determinante", determinanteMatriz(mtx))
//console.log("Inversa", matrizInversa(mtx))

//m1 = [[1,2,0],[2,-1,-1],[3,2,3]]
//m2 = [[2,1,1],[-1,1,3],[1,2,4]]

//m1 = [[3,1,2],[0,4,2],[2,5,1]]
//v1 = [4,6,2]

//console.table(m1)
//console.table(v1)
//console.table(multiplicacionMatrizVector(m1, v1))


function transpuesta(matriz){
    let aux = crearMatrizCuadrada(matriz.length)
    for (let i = 0; i < matriz.length; i++)
        for (let j = 0; j < matriz.length; j++)
            aux[i][j] = matriz[j][i]
    return aux
}

function matrizIdentidad(tamano){
    let aux = crearMatrizCuadrada(tamano)
    for (let i = 0; i < tamano; i++)
        for (let j = 0; j < tamano; j++)
            aux[i][j] = (i == j) ? 1 : 0
    return aux
}

function restaMatrices(matriz1, matriz2){
    let aux = null;
    if(matriz1.length == matriz2.length){
        aux = crearMatrizCuadrada(matriz1.length)
        for (let i = 0; i < matriz1.length; i++)
            for (let j = 0; j < matriz1.length; j++)
                aux[i][j] = matriz1[i][j] - matriz2[i][j]
    } else
        console.log("Las matrices no son del mismo tamaño")
    return aux
}

function determinanteMatriz(matriz){
    let determinante = 0;
    if(matriz.length == 1)
        determinante = matriz[0][0]
    else if (matriz.length <= 3)
        determinante = determinanteSarrus(matriz)
    else if (matriz.length > 3)
        determinante = determinanteCofactores(matriz)
    return determinante;
}

function determinanteSarrus(matriz){
    let suma = 0, resta = 0, multiplicacion = 1, auxR = 0, auxC = 0
    let cantidadIteraciones = (matriz.length == 2) ? matriz.length - 1 : matriz.length

    for (let i = 0; i < cantidadIteraciones; i++) {
        multiplicacion = 1
        for (let j = 0; j < matriz.length; j++) 
            multiplicacion *= matriz[(j) % matriz.length][(j + i) % matriz.length]
        suma += multiplicacion
        //console.log(multiplicacion)
    }

    for (let i = 0; i < cantidadIteraciones; i++) {
        multiplicacion = 1
        auxC = matriz.length-1
        for (let j = matriz.length-1; j >= 0; j--) {
            auxR = ((matriz.length - 1) - j) % matriz.length
            auxC = ((j - i) < 0) ? ((matriz.length - 1) + ((j - i) + 1)) : j - i
            //console.log("[" + auxR + ", " + auxC + "] = " + matriz[auxR][auxC])
            multiplicacion *= matriz[auxR][auxC]
        }
        //console.log(multiplicacion)
        resta -= multiplicacion * (-1)
        //console.log(multiplicacion)
    }
    //console.log("Suma = " + suma)
    //console.log("Resta = " + resta)
    return (suma-resta)
}

function determinanteCofactores(matriz) {
    let aux = null
    let auxC = 0, auxR = 0, factor = 0, determinante = 0

    for(let h = 0; h < matriz.length; h++){
        aux = crearMatrizCuadrada(matriz.length - 1)
        for(let i = 0; i < matriz.length; i++){
            for(let j = 0; j < matriz.length; j++){
                if(i !== 0 && j !== h){
                    //console.log("i:" + i + ", j:" + j + " -> [" + auxR + ", " + auxC + "] = " + matriz[i][j])
                    aux[auxR][auxC] = matriz[i][j]
                    auxC++
                } 
                    //console.log("i:" + i + ", j:" + j )
            }
            if(i != 0) 
                auxR++
            auxC = 0
        }    
        auxR = 0
        //console.table(aux)
        //console.log("Factor " + (h+1) + " = " + matriz[0][h])
        //console.log("Determinante " + (h+1) + " = " + determinanteMatriz(aux))
        factor = (h % 2 == 0) ? matriz[0][h] : matriz[0][h] * (-1)
        //console.log("Determinante " + (h+1) + " = (" + determinanteMatriz(transpuesta(aux)) + ")(" + factor + ") = " + (determinanteMatriz(aux) * factor))
        determinante += determinanteMatriz(aux) * factor
    }
    return determinante;
}

function matrizAdyacencia(matriz){
    let AdjA = crearMatrizCuadrada(matriz.length)
    let auxC = 0, auxR = 0, factor = 0, determinante = 0

    for(let g = 0; g < matriz.length; g++){
        for(let h = 0; h < matriz.length; h++){
            aux = crearMatrizCuadrada(matriz.length - 1)
            for(let i = 0; i < matriz.length; i++){
                for(let j = 0; j < matriz.length; j++){
                    if(i !== g && j !== h){
                        //console.log("g:" + g + ", h:" + h + ", i:" + i + ", j:" + j + " -> [" + auxR + ", " + auxC + "] = " + matriz[i][j])
                        aux[auxR][auxC] = matriz[i][j]
                        auxC++
                    } //else console.log("g:" + g + ", h:" + h + ", i:" + i + ", j:" + j )
                }
                if(i != g) auxR++
                auxC = 0
            }    
            auxR = 0
            factor = potencia(-1, ((h+1)+(g+1)))
            //console.table(aux)
            AdjA[g][h]= determinanteMatriz(aux) * factor
            
            //console.log("Cofactor ["+g+", "+h+"] = (" + determinanteMatriz(aux) + ")(" + factor + ") = "+ AdjA[g][h] + "\n\n\n--------------------------------------------------")
        }
    }
    return AdjA;
}

function multiplicacionMatrices(matriz1, matriz2){
    let aux = crearMatrizCuadrada(matriz1.length)
    for(i = 0;i < matriz1.length; i++) 
        for(j = 0;j < matriz1.length; j++) {
            aux[i][j] = 0
            for(k = 0; k < matriz2.length; k++)
                aux[i][j] = aux[i][j] + matriz1[i][k] * matriz2[k][j]   
        }
    return aux
}

function multiplicacionMatrizVector(matriz, vector){
    let aux = new Array(matriz.length)
    let mult = 0
    for(i = 0;i < matriz.length; i++) {
        for(j = 0;j < matriz.length; j++) 
            mult += matriz[i][j] * vector[j]   
        aux[i] = mult
        mult = 0
    }
    return aux
}

function matrizInversa(matriz){
    return divisionMatrizEscalar(transpuesta(matrizAdyacencia(matriz)), determinanteMatriz(matriz))
}

function divisionMatrizEscalar(matriz1, escalar){
    let aux = crearMatrizCuadrada(matriz1.length)
    for (let i = 0; i < matriz1.length; i++)
        for (let j = 0; j < matriz1.length; j++)
            aux[i][j] = matriz1[i][j] / escalar
    return aux
}

function crearMatrizCuadrada(tamano){
    let aux = new Array(tamano)
    for (let i = 0; i < tamano; i++)
        aux[i] = new Array(tamano)
    return aux;
}