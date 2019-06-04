function potencia(numero, potencia){
    var pot = numero;
    for (let i = 1; i < potencia; i++) 
        pot = pot * numero;  
    return pot;
}

function factorial(numero){
    var fac = numero;
    var res = 1;
    while(fac > 0){
        res = res * fac;
        fac--;
    }
    return res;
}

function promedio(arreglo){
    var arr = arreglo;
    var suma = 0

    for (let i = 0; i < arr.length; i++) 
        suma += arr[i]

    suma = suma / arr.length

    return suma;
}